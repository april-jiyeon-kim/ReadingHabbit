import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import styled from "styled-components/native";
import { PageType } from "../../../types/bookTypes";
import { Row } from "../../../styles/layout";
import { DARK_BLUE, LIGHT_GREY } from "../../../styles/colors";

interface ToggleTabProps {
  activeTab: PageType;
  onChangeTab: (tab: PageType) => void;
}

const ToggleTab: React.FC<ToggleTabProps> = ({ activeTab, onChangeTab }) => {
  return (
    <Wrapper>
      <Tab selected={activeTab === PageType.SINGLE}>
        <TabText
          selected={activeTab === PageType.SINGLE}
          onPress={() => onChangeTab(PageType.SINGLE)}
        >
          {PageType.SINGLE}
        </TabText>
      </Tab>
      <Tab selected={activeTab === PageType.RANGE}>
        <TabText
          selected={activeTab === PageType.RANGE}
          onPress={() => onChangeTab(PageType.RANGE)}
        >
          {PageType.RANGE}
        </TabText>
      </Tab>
    </Wrapper>
  );
};

export default ToggleTab;

const Wrapper = styled(Row)`
  height: 46px;
  width: 100%;
  border-radius: 20px;
  background-color: #f6f6f6;
  padding: 2px;
  margin: 10px 0 17px 0;
`;

const Tab = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "white" : "#F6F6F6")};
  height: 100%;
  border-radius: 20px;
`;

const TabText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? DARK_BLUE : LIGHT_GREY)};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;
