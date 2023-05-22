import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, Text, View, Alert } from "react-native";
import { Book, NoteType, ReadingStatus } from "../types/bookTypes";
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
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import SetStatus from "../components/screens/Detail/SetStatus";
import { translateReadingStatus } from "../utils";
import SetPage from "../components/screens/WriteNote/SetPage";
import SetCurrentPage from "../components/screens/Detail/SetCurrentPage";
import firestore from "@react-native-firebase/firestore";

type RootStackParamList = {
  Detail: Book;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;
type BottomSheetType = "Status" | "Page" | "Action";

const mockData = [
  {
    id: 1,
    noteType: NoteType.QUOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 2,
    noteType: NoteType.QUOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120", "130"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 3,
    noteType: NoteType.NOTES,
    title: "Book Title1",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 4,
    noteType: NoteType.NOTES,
    title: "Book Title2",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 5,
    noteType: NoteType.NOTES,
    title: "Book Title3",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 6,
    noteType: NoteType.NOTES,
    title: "Book Title4",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 7,
    noteType: NoteType.NOTES,
    title: "Book Title5",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 8,
    noteType: NoteType.NOTES,
    title: "Book Title6",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 9,
    noteType: NoteType.NOTES,
    title: "Book Tidtle7",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
];

const Detail: React.FC<DetailScreenProps> = ({
  navigation,
  route: { params: book },
}) => {
  const [tab, setTab] = useState(NoteType.QUOTES);
  const [readingStatus, setReadingStatus] = useState(book.reading.status);
  const [currentPage, setCurrentPage] = useState(book.reading.currentPage || 0);
  const [selectedBottomSheet, setSelectedBottomSheet] =
    useState<BottomSheetType>("Status");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "20%", "32%"], []);
  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  const data = useMemo(() => {
    return mockData.filter((it) => it.noteType === tab);
  }, [tab]);

  const handlePresentModalPress = (selected: BottomSheetType) => {
    setSelectedBottomSheet(selected);
    bottomSheetRef.current?.expand();
  };

  const handleHideModalPress = () => {
    bottomSheetRef.current?.close();
  };

  const handleStatusChange = (status: ReadingStatus) => {
    handleHideModalPress();
    setReadingStatus(status);
  };

  const handleCurrentPageChange = (page: number) => {
    handleHideModalPress();
    setCurrentPage(page);
  };

  const renderBackdrop = useCallback(
    (props: any) => (
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
      await booksCollection
        .doc(`${book.id}`)
        .delete()
        .then(() => {
          console.log("Book deleted!");
        });
      navigation.goBack();
    } catch (error) {
      console.error("Error delete book:", error);
    }
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
              <Status label={translateReadingStatus(readingStatus)} />
            </StatusBtn>

            <TouchableOpacity onPress={() => handlePresentModalPress("Page")}>
              <ProgressWrapper>
                <ReadingProgress book={book} />
              </ProgressWrapper>
            </TouchableOpacity>
          </BookInfo>
        </BookInfoContainer>
      </BookContainer>
      <NotesContainer>
        <ToggleTab activeTab={tab} onChangeTab={handleTabChange} />
        <FlatList
          data={data}
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
        {selectedBottomSheet === "Status" && (
          <SetStatus onSave={handleStatusChange} />
        )}
        {selectedBottomSheet === "Page" && (
          <SetCurrentPage
            currentPage={currentPage}
            onSave={handleCurrentPageChange}
          />
        )}
      </BottomSheet>
    </BottomSheetModalProvider>
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
  justify-content: space-between;
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
`;
