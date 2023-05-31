import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { PageRange, PageType } from "../../../types/bookTypes";
import ToggleTab from "./ToggleTab";
import { Ionicons } from "@expo/vector-icons";
import InputWithLabel from "../Bookshelf/InputWithLabel";
import { Row } from "../../../styles/layout";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (pageType: PageType, value: PageRange) => void;
  pageRange?: PageRange;
  currentPageType?: PageType;
}

const SetPage: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
  pageRange = { from: 0 },
  currentPageType = PageType.SINGLE,
}) => {
  const [tab, setTab] = useState(currentPageType);
  const [page, setPage] = useState<PageRange>(pageRange);
  const handleTabChange = (newTab: PageType) => {
    setTab(newTab);
  };
  const handlePageFromChange = (text: string) => {
    setPage({ ...page, from: Number(text) });
  };

  const handlePageToChange = (text: string) => {
    setPage({ ...page, to: Number(text) });
  };

  const handleSubmit = () => {
    if (!page.from) {
      Alert.alert("Please enter page ra1nge");
      return;
    }
    if (tab === PageType.RANGE) {
      if (!page.to) {
        Alert.alert("Please enter page range");
        return;
      }
      if (page.to < page.from) {
        Alert.alert("Please enter valid page range");
        return;
      }
    }
    onSubmit(tab, page);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <Wrapper>
        <Title>What page is this note for?</Title>
        <ToggleTab activeTab={tab} onChangeTab={handleTabChange} />
        {tab === PageType.SINGLE && (
          <InputWithLabel
            label={"Page"}
            value={page.from.toString()}
            editable
            onChangeText={handlePageFromChange}
            inputType="number"
          />
        )}
        {tab === PageType.RANGE && (
          <PagesRangeWrapper>
            <InputWithLabel
              label={"From"}
              value={page.from.toString()}
              size="small"
              editable
              onChangeText={handlePageFromChange}
            />
            <InputWithLabel
              label={"To"}
              value={page.to ? page.to.toString() : ""}
              size="small"
              editable
              onChangeText={handlePageToChange}
            />
          </PagesRangeWrapper>
        )}

        <SaveBtn onPress={handleSubmit}>
          <Ionicons name="checkmark-sharp" size={24} color={"white"} />
        </SaveBtn>
      </Wrapper>
    </Modal>
  );
};

export default SetPage;

const Wrapper = styled.View`
  align-items: center;
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
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
`;

const PagesRangeWrapper = styled(Row)`
  justify-content: space-between;
`;
