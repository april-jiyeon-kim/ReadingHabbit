import React, { useMemo, useState } from "react";
import { View, Text, Dimensions, FlatList, ListRenderItem } from "react-native";
import { SectionTitle } from "../components/screens/Bookshelf/SectionTitle";
import styled from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { VictoryPie, VictoryLegend } from "victory-native";
import { Container } from "../styles/layout";
import { LIGHT_BLACK } from "../styles/colors";
import ProgressBar from "../components/common/ProgressBar";
import { useFocusEffect } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GOALS_SCREEN } from "../constants/screenName";
import { useNavigation } from "@react-navigation/native";
import { Book, Goal } from "../types/bookTypes";
import { getFinishedBook } from "./Goals";
import { TouchableOpacity } from "react-native-gesture-handler";

type UserTag = {
  name: string;
  y: number;
};

const Home = () => {
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const tagsObject: { [tag: string]: number } = {};
      let amount = 0;
      const booksUnsubscribe = firestore()
        .collection("books")
        .where("uid", "==", auth().currentUser?.uid)
        .onSnapshot((snapshot) => {
          const books = snapshot.docs;
          books.forEach((doc) => {
            const bookData = doc.data();
            if (bookData.tags) {
              bookData.tags.forEach((tag: string) => {
                if (tagsObject[tag]) {
                  tagsObject[tag] += 1; // Increment count if the tag already exists
                } else {
                  tagsObject[tag] = 1; // Initialize count if the tag is encountered for the first time
                }
                amount += 1;
              });
            }
          });
          const tagsArray = Object.entries(tagsObject).map(([name, count]) => ({
            name,
            y: count,
          }));
          setUserTags(tagsArray);
          setTotalAmount(amount);
        });

      const goalsUnsubscribe = firestore()
        .collection("goals")
        .where("uid", "==", auth().currentUser?.uid)
        .onSnapshot((snapshot) => {
          const goalsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Goal[];
          setGoals(goalsArray);
          fetchBooksData(goalsArray);
        });

      return () => {
        booksUnsubscribe();
        goalsUnsubscribe();
      };
    }, [])
  );

  const fetchBooksData = async (goalsData: Goal[]) => {
    console.log("fetch books data");
    const goalIds = goalsData.map((goal) => goal.id);
    const booksQuerySnapshot = await firestore()
      .collection("books")
      .where("goalId", "in", goalIds)
      .get();

    const booksData: Record<string, Book[]> = {};

    booksQuerySnapshot.forEach((bookDoc) => {
      const bookData = {
        id: bookDoc.id,
        ...bookDoc.data(),
      } as Book;

      const goalId = bookData.goalId;
      if (!goalId) return;
      if (!booksData[goalId]) {
        booksData[goalId] = [];
      }

      booksData[goalId].push(bookData);
    });

    const updatedGoals = goalsData.map((goal) => ({
      ...goal,
      books: booksData[goal.id] || [],
    }));

    setGoals(updatedGoals);
  };
  const goToGoalsScreen = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: GOALS_SCREEN,
    });
  };

  const renderGoals: ListRenderItem<Goal> = ({ item }) => (
    <GoalWrapper>
      <Text>{item.title}</Text>
      <ProgressBar
        value={
          item?.books && item.books.length > 0
            ? (getFinishedBook(item.books) / item.books.length) * 100
            : 0
        }
        maxValue={100}
        label={
          item.books
            ? `${getFinishedBook(item.books)}/${item.books.length} books`
            : "no book"
        }
      />
    </GoalWrapper>
  );
  const goalKeyExtractor = (item: Goal) => item.id;
  return (
    <Container>
      <Title>Genre bias</Title>
      {userTags.length === 0 ? (
        <NoDataText>You haven't read set any tags yet.</NoDataText>
      ) : (
        <BiasContainer>
          <PieWrapper>
            <VictoryPie
              colorScale={"qualitative"}
              data={userTags}
              innerRadius={100}
              labelRadius={70}
              width={200}
              height={200}
              labels={({ datum }) =>
                `${Math.floor((datum.y / totalAmount) * 100)}%`
              }
              style={{
                labels: { fill: "white", fontSize: 14 },
              }}
            />
          </PieWrapper>
          <LegendWrapper>
            <VictoryLegend
              orientation="vertical"
              colorScale={"qualitative"}
              data={userTags}
              x={50}
            />
          </LegendWrapper>
        </BiasContainer>
      )}

      <GoalsWrapper>
        <TouchableOpacity onPress={goToGoalsScreen}>
          <Title>Goals</Title>
        </TouchableOpacity>
        {goals.length === 0 ? (
          <NoDataText>
            You haven't set any goals yet.
            {"\n"}
            Try setting a reading goal!
          </NoDataText>
        ) : (
          <SectionContainer>
            <FlatList
              data={goals}
              renderItem={renderGoals}
              contentContainerStyle={{ paddingTop: 14, paddingBottom: 52 }}
              keyExtractor={goalKeyExtractor}
              ItemSeparatorComponent={Seperator}
            />
          </SectionContainer>
        )}
      </GoalsWrapper>
    </Container>
  );
};
export default Home;

const BiasContainer = styled.View`
  margin: 40px 16px 0;
  align-items: center;
  flex-direction: row;
`;
const PieWrapper = styled.View`
  margin-left: 20px;
`;
const LegendWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
const SectionContainer = styled.View`
  margin: 0 16px;
`;

export const Title = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  margin-left: 16px;
  color: ${LIGHT_BLACK};
`;

const GoalsWrapper = styled.View`
  flex: 1;
`;
const GoalWrapper = styled.View`
  margin-bottom: 10px;
`;

const Seperator = styled.View`
  height: 10px;
`;

const NoDataText = styled.Text`
  margin: 16px;
`;
