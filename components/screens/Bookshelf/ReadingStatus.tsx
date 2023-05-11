import React from "react";
import { Book } from "../../../types/bookTypes";
import { Text, View } from "react-native";
import styled from "styled-components/native";

interface Props {
  book: Book;
}

const DateWrapper = styled.View`
  flex-direction: row;
  margin: 5px 0 8px;
`;

const DateText = styled.Text`
  color: #87ceeb;
`;

const Date = styled.Text`
  margin-left: 4px;
  color: #797979;
`;

const ProgressLabel = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const PercentageText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #87ceeb;
`;
const PagesText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #797979;
`;

const ReadingProgress: React.FC<Props> = ({ book }) => (
  <View>
    <DateWrapper>
      <DateText>Started date</DateText>
      <Date>{book.startDate}</Date>
    </DateWrapper>
    <ProgressLabel>
      <PercentageText>{`${
        (book.currentPage / book.totalPages) * 100
      }%`}</PercentageText>
      <PagesText>{`${book.currentPage}/${book.totalPages}`}</PagesText>
    </ProgressLabel>
  </View>
);

export default ReadingProgress;
