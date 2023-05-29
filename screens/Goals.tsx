import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { Container, Row } from "../styles/layout";
import { HeaderText } from "../styles/text";
import { DARK_BLUE, LIGHT_GREY } from "../styles/colors";
import { firebase } from "@react-native-firebase/auth";
import { Book, Goal, ReadingStatus } from "../types/bookTypes";
import firestore from "@react-native-firebase/firestore";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BookCover from "../components/screens/Bookshelf/BookCover";
import { useFocusEffect } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export function getFinishedBook(books: Book[]) {
  return books.filter((book) => book.reading.status === ReadingStatus.READ)
    .length;
}

const Goals: React.FC<NativeStackScreenProps<any, "Goal">> = ({
  navigation: { navigate },
}) => {
  const user = firebase.auth().currentUser;
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const onChangeText = (text: string) => {
    setNewGoal(text);
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = firestore()
        .collection("goals")
        .where("uid", "==", auth().currentUser?.uid)
        .onSnapshot((snapshot) => {
          const goalsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Goal[];
          setGoals(goalsArray);
          setLoading(false);
        });

      return () => unsubscribe();
    }, [])
  );

  const handleAddGoal = useCallback(async () => {
    if (!user) return;
    try {
      const goalData = {
        title: newGoal,
        uid: user.uid,
      };
      const booksCollection = firestore().collection("goals");
      await booksCollection.add(goalData).then(() => {
        console.log("Goal added!");
        setNewGoal("");
      });
    } catch (error) {
      console.error("Error registering goal:", error);
    }
  }, [newGoal]);

  const goalKeyExtractor = (item: Goal) => item.id;
  const bookKeyExtractor = (item: Book) => item.isbn;
  const renderBooks: ListRenderItem<Book> = ({ item }) => (
    <TouchableWithoutFeedback>
      <View>
        <BookCover image={item.image} />
      </View>
    </TouchableWithoutFeedback>
  );
  const renderGoals: ListRenderItem<Goal> = ({ item }) => (
    <GoalsWrapper>
      <GoalTitleText>
        {item.title}{" "}
        {item?.books
          ? `${getFinishedBook(item.books)}/${item.books.length}`
          : 0}
      </GoalTitleText>
      {item.books ? (
        <FlatList
          data={item.books}
          keyExtractor={bookKeyExtractor}
          horizontal
          ItemSeparatorComponent={Seperator}
          contentContainerStyle={{ paddingRight: 24, paddingTop: 14 }}
          renderItem={renderBooks}
        />
      ) : (
        <EmptyBook></EmptyBook>
      )}
    </GoalsWrapper>
  );

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Wrapper>
      <AddText>Add Goal</AddText>
      <InputWrapper>
        <InputText
          value={newGoal}
          onChangeText={onChangeText}
          placeholder={"Please enter a tag"}
          editable
          maxLength={24}
        />
        <AddBtn onPress={handleAddGoal}>
          <AddBtnText>ADD</AddBtnText>
        </AddBtn>
      </InputWrapper>
      <FlatList
        data={goals}
        keyExtractor={goalKeyExtractor}
        ItemSeparatorComponent={Seperator}
        contentContainerStyle={{ paddingRight: 24 }}
        renderItem={renderGoals}
      />
    </Wrapper>
  );
};
export default Goals;

const Wrapper = styled(Container)`
  margin: 24px 16px;
`;
const AddText = styled.Text``;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 14px;
`;

const AddBtn = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  background-color: ${DARK_BLUE};
  padding: 2px 8px;
  border-radius: 8px;
`;

const AddBtnText = styled.Text`
  color: white;
`;

const InputWrapper = styled.View``;

const InputText = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: black;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const GoalsWrapper = styled.View`
  margin-top: 12px;
`;

const GoalTitleText = styled.Text``;

const Seperator = styled.View`
  width: 10px;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyBook = styled.View`
  width: 60px;
  height: 88px;
  border: 2px solid ${LIGHT_GREY};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;
