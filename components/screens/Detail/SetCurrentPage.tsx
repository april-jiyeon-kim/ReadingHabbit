import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import { PageType, ReadingStatus } from "../../../types/bookTypes";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "../../../styles/layout";
import RadioButton from "../../common/RadioButton";
import { translateReadingStatus } from "../../../utils";
import InputWithLabel from "../Bookshelf/InputWithLabel";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { DARK_BLUE, DARK_GREY } from "../../../styles/colors";

interface Props {
  currentPage: number;
  onSave: (page: number) => void;
}

const SetCurrentPage: React.FC<Props> = ({ currentPage, onSave }) => {
  const [page, setPage] = useState(currentPage.toString());

  return (
    <Wrapper>
      <Title>What page are you on?</Title>
      <PageWrapper>
        <InputWithLabel
          label={"Please enter a number between 0 and 300"}
          value={page}
          editable
          onChangeText={(page: string) => setPage(page)}
          inputType="number"
        />
      </PageWrapper>
      <SaveBtn onPress={() => onSave(parseInt(page))}>
        <Ionicons name="checkmark-sharp" size={24} color={"white"} />
      </SaveBtn>
    </Wrapper>
  );
};

export default SetCurrentPage;

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
  color: ${DARK_GREY};
`;

const SaveBtn = styled.TouchableOpacity`
  width: 100%;
  height: 37px;
  background: ${DARK_BLUE};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
`;

const PageWrapper = styled(Row)`
  justify-content: space-between;
`;
