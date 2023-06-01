import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Text, View, Alert, StyleSheet } from "react-native";
import { Book, Goal, Note, NoteType, ReadingStatus } from "../types/bookTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderText } from "../styles/text";
import { Row } from "../styles/layout";
import styled from "styled-components/native";
import RadioButton from "../components/common/RadioButton";
import ReadingProgress from "../components/screens/Bookshelf/ReadingStatus";
import Status from "../components/common/Status";
import ToggleTab from "../components/common/ToggleTab";
import NotesQuotesTab from "../components/screens/Notes/NotesQuotesTab";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import SetStatus from "../components/screens/Detail/SetStatus";
import { translateReadingStatus } from "../utils";
import SetPage from "../components/screens/WriteNote/SetPage";
import SetCurrentPage from "../components/screens/Detail/SetCurrentPage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { getActionFromState, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LIGHT_GREY } from "../styles/colors";
import { EDIT_TAGS_SCREEN, WRITE_NOTE_SCREEN } from "../constants/screenName";
import Tag from "../components/common/Tag";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

type RootStackParamList = {
  Detail: { bookId: string };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
type BottomSheetType = "Status" | "Page" | "Action";

const Detail: React.FC<DetailScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const { bookId } = params;
  const [tab, setTab] = useState(NoteType.QUOTES);
  useFirestoreConnect([
    { collection: "books", doc: bookId },
    {
      collection: "notes",
      where: [
        ["uid", "==", auth().currentUser?.uid],
        ["bookId", "==", bookId],
        ["noteType", "==", tab],
      ],
    },
    {
      collection: "goals",
      where: [["uid", "==", auth().currentUser?.uid]],
    },
  ]);

  const book = useSelector(
    (state: RootState) =>
      state.firestore.data.books && state.firestore.data.books[bookId]
  ) as Book;

  const notes = useSelector(
    (state: RootState) => state.firestore.ordered.notes || []
  ) as Note[];

  const goals = useSelector(
    (state: RootState) => state.firestore.ordered.goals || []
  ) as Goal[];

  const [readingStatus, setReadingStatus] = useState<ReadingStatus | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (book) {
      setReadingStatus(book.reading?.status);
      setCurrentPage(book.reading?.currentPage || 0);
    }
  }, [book]);

  const [selectedBottomSheet, setSelectedBottomSheet] =
    useState<BottomSheetType>("Status");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "20%", "32%"], []);
  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  const handlePresentModalPress = (selected: BottomSheetType) => {
    setSelectedBottomSheet(selected);
    bottomSheetRef.current?.expand();
  };

  const handleHideModalPress = () => {
    bottomSheetRef.current?.close();
  };

  const handleStatusChange = (status: ReadingStatus) => {
    handleHideModalPress();
    updateStatus(status);
  };

  const handleCurrentPageChange = (page: number) => {
    handleHideModalPress();
    setCurrentPage(page);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  const onDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this book?", [
      { text: "Cancel", onPress: () => {} },
      { text: "Delete", onPress: handleDelete },
    ]);
  };

  const handleDelete = async () => {
    try {
      const booksCollection = firestore().collection("books");
      const goalsCollection = firestore().collection("goals");
      const notesCollection = firestore().collection("notes");

      // Delete the book document from the "books" collection
      await booksCollection.doc(book.id).delete();

      // Remove the book from the "books" array in the "goals" collection
      const goalDoc = await goalsCollection.doc(book.goalId).get();

      if (goalDoc.exists) {
        const goalRef = goalsCollection.doc(book.goalId);
        const goalData = goalDoc.data();

        if (goalData && goalData.books) {
          // Remove the book from the "books" array in the goal document
          const updatedBooks = goalData.books.filter(
            (bookItem: Book) => bookItem.id !== book.id
          );
          // Update the "books" array in the goal document
          await goalRef.update({ books: updatedBooks });

          console.log("Book removed from goals collection!");
        } else {
          console.log("Invalid goal data or books array not found!");
        }
      } else {
        console.log("Goal document not found!");
      }

      // Delete the associated notes from the "notes" collection
      const notesQuerySnapshot = await notesCollection
        .where("bookId", "==", book.id)
        .get();
      const batch = firestore().batch();

      notesQuerySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch write operation
      await batch.commit();

      console.log("Book, goals, and notes deleted!");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const updateGoal = async (goalId: string) => {
    try {
      const batch = firestore().batch();

      // Update the goal document in the "goals" collection
      const goalDocRef = firestore().collection("goals").doc(goalId);
      batch.update(goalDocRef, {
        books: firestore.FieldValue.arrayUnion(book),
      });
      // Update the book document in the "books" collection
      const bookDocRef = firestore().collection("books").doc(book.id);
      batch.update(bookDocRef, {
        goalId: goalId,
      });

      await batch.commit();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };
  const updateStatus = async (status: ReadingStatus) => {
    try {
      const bookCollection = firestore().collection("books");
      await bookCollection
        .doc(book.id)
        .update({
          "reading.status": status,
        })
        .then(() => {
          setReadingStatus(status);
          console.log("Status updated!");
        });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const goToEditTags = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: EDIT_TAGS_SCREEN,
      params: { book },
    });
  };
  const goToWriteNote = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: WRITE_NOTE_SCREEN,
      params: { book },
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontSize: 14 },
      headerTitle: "",
      headerRight: () => (
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, readingStatus]);
  return (
    book && (
      <BottomSheetModalProvider>
        <BookContainer>
          <HeaderText>
            {book.title.slice(0, 28)} {book.title.length > 28 ? "..." : null}
          </HeaderText>
          <BookInfoContainer>
            <CoverImg source={{ uri: book.image }} />
            <BookInfo>
              <View>
                <BottomText>{book.author}</BottomText>
                <BottomText>{book.publisher}</BottomText>
              </View>
              <StatusBtn onPress={() => handlePresentModalPress("Status")}>
                <Status
                  label={
                    readingStatus ? translateReadingStatus(readingStatus) : ""
                  }
                />
              </StatusBtn>
              <GoalWrapper>
                <GoalText>GOAL</GoalText>
                <Picker
                  selectedValue={goals.find((it) => it.id === book.goalId)?.id}
                  onValueChange={updateGoal}
                  style={{
                    width: 180,
                    height: 22,
                    backgroundColor: "#FCFDFE",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    borderRadius: 6,
                  }}
                >
                  {goals.map((it) => (
                    <Picker.Item
                      label={it.title}
                      value={it.id}
                      style={{ fontSize: 12 }}
                    />
                  ))}
                </Picker>
              </GoalWrapper>
              <ButtonWrapper onPress={goToWriteNote}>
                <MaterialCommunityIcons
                  name="note-plus-outline"
                  size={32}
                  color="black"
                />
              </ButtonWrapper>
            </BookInfo>
          </BookInfoContainer>
          <TagsWrapper>
            {book.tags && book.tags.map((it) => <Tag label={it} selected />)}
            <TagsBtn onPress={goToEditTags}>
              <AntDesign name="tagso" size={24} color="#797979" />
              <TagsText>{book.tags ? "Edit tags" : "Add tags"}</TagsText>
            </TagsBtn>
          </TagsWrapper>
        </BookContainer>
        <NotesContainer>
          <CustomToggleTab activeTab={tab} onChangeTab={handleTabChange} />
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <NotesQuotesTab note={item} showBookInfo={false} />
            )}
            ItemSeparatorComponent={Seperator}
          />
        </NotesContainer>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          {selectedBottomSheet === "Status" && readingStatus && (
            <SetStatus status={readingStatus} onSave={handleStatusChange} />
          )}
          {selectedBottomSheet === "Page" && (
            <SetCurrentPage
              currentPage={currentPage}
              onSave={handleCurrentPageChange}
            />
          )}
        </BottomSheet>
      </BottomSheetModalProvider>
    )
  );
};

export default Detail;

const ProgressWrapper = styled.View`
  height: 100%;
`;
const BookInfoContainer = styled(Row)`
  margin: 24px 0 0;
  width: 100%;
`;
const CoverImg = styled.Image`
  width: 93px;
  height: 136px;
  border-radius: 5px;
  margin-bottom: 24px;
`;

const BookInfo = styled.View`
  margin-left: 10px;
  height: 136px;
  flex: 1;
`;

const BottomText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #797979;
`;

const BookContainer = styled.View`
  margin: 26px 24px 0;
`;

const NotesContainer = styled.View`
  margin: 0 26px 0;
  flex: 1;
`;

const Seperator = styled.View`
  height: 10px;
`;

const StatusBtn = styled.TouchableOpacity`
  width: 135px;
  margin-top: 20px;
`;

const TagsBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const TagsText = styled.Text`
  padding-left: 4px;
  color: "#797979";
`;

const TagsWrapper = styled(Row)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const GoalWrapper = styled.View`
  margin: 13px 0 32px;
  flex-direction: row;
  align-items: center;
`;
const GoalText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #797979;
  margin-right: 7px;
`;

const CustomToggleTab = styled(ToggleTab)`
  margin: 10px 0 17px 0;
`;
