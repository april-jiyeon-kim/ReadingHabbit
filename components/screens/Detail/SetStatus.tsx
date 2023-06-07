import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { PageType, ReadingStatus } from "../../../types/bookTypes";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "../../../styles/layout";
import RadioButton from "../../common/RadioButton";
import { translateReadingStatus } from "../../../utils";
import { DARK_BLUE, DARK_GREY } from "../../../styles/colors";

interface Props {
  status: ReadingStatus;
  onSave: (status: ReadingStatus) => void;
}

const SetStatus: React.FC<Props> = ({ status, onSave }) => {
  const [readingStatus, setReadingStatus] = useState(status);

  const handleStatusChange = (status: ReadingStatus) => {
    setReadingStatus(status);
  };

  return (
    <Wrapper>
      <Title>Reading Status</Title>
      <StatusWrapper>
        {Object.values(ReadingStatus).map((status) => (
          <RadioButton
            key={status}
            label={translateReadingStatus(status)}
            selected={readingStatus === status}
            onPress={() => handleStatusChange(status)}
          />
        ))}
      </StatusWrapper>
      <SaveBtn onPress={() => onSave(readingStatus)}>
        <Ionicons name="checkmark-sharp" size={24} color={"white"} />
      </SaveBtn>
    </Wrapper>
  );
};

export default SetStatus;

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

const StatusWrapper = styled(Row)`
  justify-content: center;
  margin-top: 20px;
`;
