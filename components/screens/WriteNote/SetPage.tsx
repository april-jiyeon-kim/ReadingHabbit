import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { PageType } from "../../../types/bookTypes";
import ToggleTab from "./ToggleTab";
import { Ionicons } from "@expo/vector-icons";
import InputWithLabel from "../Bookshelf/InputWithLabel";
import { Row } from "../../../styles/layout";

interface Props {}

const SetPage: React.FC<Props> = ({}) => {
  const [tab, setTab] = useState(PageType.SINGLE);
  const [page, setPage] = useState("");
  const handleTabChange = (newTab: PageType) => {
    setTab(newTab);
  };

  return (
    <Wrapper>
      <Title>What page is this note for?</Title>
      <ToggleTab activeTab={tab} onChangeTab={handleTabChange} />
      {tab === PageType.SINGLE && (
        <InputWithLabel label={"Page"} value={""} editable />
      )}
      {tab === PageType.RANGE && (
        <PagesRangeWrapper>
          <InputWithLabel label={"From"} value={""} size="small" editable />
          <InputWithLabel label={"To"} value={""} size="small" editable />
        </PagesRangeWrapper>
      )}

      <SaveBtn>
        <Ionicons name="checkmark-sharp" size={24} color={"white"} />
      </SaveBtn>
    </Wrapper>
  );
};

export default SetPage;

const Wrapper = styled.View`
  align-items: center;
  position: relative;
  height: 100%;
  margin: 0 44px;
`;

const Title = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #797979;
`;

const SaveBtn = styled.TouchableOpacity`
  width: 292px;
  height: 37px;
  background: #1e90ff;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
`;

const PagesRangeWrapper = styled(Row)`
  justify-content: space-between;
`;
