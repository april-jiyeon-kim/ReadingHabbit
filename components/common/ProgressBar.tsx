import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import { DARK_GREY, LIGHT_GREY, MEDIUM_BLUE } from "../../styles/colors";

interface ProgressBarProps {
  value: number;
  maxValue: number;
  label?: string;
  size?: "small" | "medium" | "large";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue,
  label,
  size = "medium",
}) => {
  const progressWidth = (value / maxValue) * 100;
  const percentage = Math.round((value / maxValue) * 100);

  let height = 38;
  if (size === "small") {
    height = 13;
  }

  return (
    <>
      <Container>
        <Bar progressWidth={progressWidth} height={height} />
      </Container>
      <PercentageLabel>{`${percentage}%`}</PercentageLabel>
      {label && <CustomLabel>{label}</CustomLabel>}
    </>
  );
};

export default ProgressBar;

const Container = styled.View`
  width: 100%;
  background-color: ${LIGHT_GREY};
  border-radius: 20px;
  position: relative;
  margin-top: 8px;
`;

const Bar = styled.View<{ progressWidth: number; height: number }>`
  height: ${({ height }) => `${height}px`};
  background-color: ${MEDIUM_BLUE};
  border-radius: 20px;
  width: ${({ progressWidth }) => `${progressWidth}%`};
`;

const PercentageLabel = styled.Text`
  position: absolute;
  left: 5px;
  bottom: -20px;
  color: ${MEDIUM_BLUE};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;
const CustomLabel = styled.Text`
  position: absolute;
  right: 5px;
  bottom: -20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: ${DARK_GREY};
`;
