import React from "react";
import { TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { DARK_BLUE, LIGHT_BLUE } from "../../styles/colors";
import { ReadingStatus } from "../../types/bookTypes";

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton = ({ label, selected, onPress }: RadioButtonProps) => {
  return (
    <Container selected={selected} onPress={onPress} activeOpacity={1}>
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.TouchableOpacity<{ selected: boolean }>`
  border-radius: 14px;
  padding: 2px 6px;
  height: 24px;
  margin-right: 5px;
  min-width: 90px;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => (selected ? DARK_BLUE : LIGHT_BLUE)};
`;

const Label = styled.Text`
  color: white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
`;

export default RadioButton;
