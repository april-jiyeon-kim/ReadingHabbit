import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { DARK_BLUE } from "../../../styles/colors";
import React from "react";

interface Props {
  label: string;
  value: string;
  size?: "small" | "medium" | "large";
  editable?: boolean;
}

const InputWithLabel: React.FC<Props> = ({
  label,
  value,
  size = "medium",
  editable = false,
}) => {
  return (
    <Wrapper size={size}>
      <Label>{label}</Label>
      <InputText value={value} editable={editable} />
    </Wrapper>
  );
};

const Wrapper = styled.View<{ size: string }>`
  margin: 10px 0;
  width: ${({ size }) => (size === "small" ? "45%" : "100%")};
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
