import React, { useEffect } from "react";
import { Book } from "../../../types/bookTypes";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import ProgressBar from "../../common/ProgressBar";

interface Props {
  book: Book;
}

const ReadingProgress: React.FC<Props> = ({ book }) => {
  const currentPage = book.reading.currentPage || 0;
  const pages = `${currentPage}/${book.pageCount}`;
  const percentage =
    (currentPage && book.pageCount && (currentPage / book.pageCount) * 100) ||
    0;
  return (
    <Wrapper>
      <DateWrapper>
        <DateText>Started date</DateText>
        <Date>{book.reading.startDate}</Date>
      </DateWrapper>
      <ProgressBar
        value={percentage}
        maxValue={100}
        size="small"
        label={pages}
      />
    </Wrapper>
  );
};

export default ReadingProgress;

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

const Wrapper = styled.View`
  position: relative;
`;
