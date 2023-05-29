import React, { useMemo, useState } from "react";
import { View, Text, Dimensions } from "react-native";
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

type UserTag = {
  name: string;
  y: number;
};

const Home = () => {
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const tagsObject: { [tag: string]: number } = {};
      let amount = 0;
      const unsubscribe = firestore()
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

      return () => unsubscribe();
    }, [])
  );
  const goToGoalsScreen = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: GOALS_SCREEN,
    });
  };

  return (
    <View>
      <Title>Genre bias</Title>
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
      <GoalsWrapper onPress={goToGoalsScreen}>
        <Title>Goals</Title>
        <SectionContainer>
          <ProgressBar value={75} maxValue={100} label={"17/21 books"} />
        </SectionContainer>
      </GoalsWrapper>
    </View>
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

const GoalsWrapper = styled.TouchableOpacity``;
