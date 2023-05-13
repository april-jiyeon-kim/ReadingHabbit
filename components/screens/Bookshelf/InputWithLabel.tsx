import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { DARK_BLUE } from "../../../styles/colors";
import React from "react";

interface Props {
  label: string;
  value: string;
}

const InputWithLabel: React.FC<Props> = ({ label, value }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <InputText value={value} editable={false} />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.Text`
  color: ${DARK_BLUE};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const InputText = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: black;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

export default InputWithLabel;
