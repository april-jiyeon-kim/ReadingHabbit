import React from "react";
import styled from "styled-components/native";
import { Book } from "../../../types/bookTypes";
import { LIGHT_GREY } from "../../../styles/colors";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Row } from "../../../styles/layout";
import Tag from "../../common/Tag";
import ReadingProgress from "./ReadingStatus";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => (
  <Container>
    <Wrapper>
      <BookTitle>
        {book.title.slice(0, 28)}
        {book.title.length > 28 ? "..." : null}
      </BookTitle>
      <Row>
        <TouchableOpacity>
          <CoverImg source={{ uri: book.image }} />
        </TouchableOpacity>
        <BookDetail>
          <Row>
            {book.genres.map((genre) => (
              <Tag key={genre} label={genre} />
            ))}
          </Row>
          <ReadingProgress book={book} />
          <ButtonWrapper>
            <MaterialCommunityIcons
              name="note-plus-outline"
              size={32}
              color="black"
            />
          </ButtonWrapper>
        </BookDetail>
      </Row>
    </Wrapper>
  </Container>
);

export default BookCard;

const Container = styled.View`
  width: ${SCREEN_WIDTH}px;
  padding: 24px 24px 0 24px;
`;

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  border: 1px solid ${LIGHT_GREY};
  border-radius: 20px;
  margin: 21px 0px;
  min-height: 200px;
  padding: 0 24px;
`;

const BookTitle = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  line-height: 17px;
`;

const CoverImg = styled.Image`
  width: 93px;
  height: 136px;
  border-radius: 5px;
`;

const BookDetail = styled.View`
  width: 65%;
  margin-left: 17px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 8px;
`;
