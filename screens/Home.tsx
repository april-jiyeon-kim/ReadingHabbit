import React, { useMemo, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { SectionTitle } from "../components/screens/Bookshelf/SectionTitle";
import styled from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import { VictoryPie, VictoryLegend } from "victory-native";
import { Container } from "../styles/layout";
import { LIGHT_BLACK } from "../styles/colors";
import ProgressBar from "../components/common/ProgressBar";

const mockData = [
  { name: "History", y: 1 },
  { name: "Novel", y: 2 },
  { name: "Economics", y: 3 },
  { name: "Entertain", y: 1 },
  { name: "Real Estate", y: 7 },
  { name: "Real Estate", y: 5 },
  { name: "Real Estate", y: 6 },
];
const colorScale = ["tomato", "orange", "gold", "cyan", "navy"];
const Home = () => {
  // const [data, setData] = useState(null);
  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <Title>Genre bias</Title>
      <BiasContainer>
        <VictoryPie
          colorScale={"qualitative"}
          data={mockData}
          innerRadius={120}
          labelRadius={90}
          width={250}
          height={250}
          labels={({ datum }) => `${Math.floor((datum.y / 25) * 100)}%`}
          style={{
            labels: { fill: "white", fontSize: 14 },
          }}
        />
        <VictoryLegend
          orientation="horizontal"
          gutter={20}
          itemsPerRow={3}
          colorScale={"qualitative"}
          data={mockData}
          height={100}
          x={50}
        />
      </BiasContainer>
      <Title>Goals</Title>
      <SectionContainer>
        <ProgressBar value={75} maxValue={100} label={"17/21 books"} />
      </SectionContainer>
    </View>
  );
};
export default Home;

const BiasContainer = styled.View`
  margin: 40px 16px 0;
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
