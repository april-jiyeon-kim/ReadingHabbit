import React from "react";
import styled from "styled-components/native";
import { Book } from "../../../types/bookTypes";
import { LIGHT_GREY } from "../../../styles/colors";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Row } from "../../../styles/layout";
import Tag from "../../common/Tag";
import ReadingProgress from "./ReadingStatus";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  DETAIL_SCREEN,
  WRITE_NOTE_SCREEN,
} from "../../../constants/screenName";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: DETAIL_SCREEN,
      params: { bookId: book.id },
    });
  };

  const goToWriteNote = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: WRITE_NOTE_SCREEN,
      params: { book },
    });
  };

  return (
    <Container>
      <Wrapper>
        <BookTitle>
          {book.title.slice(0, 28)}
          {book.title.length > 28 ? "..." : null}
        </BookTitle>
        <Row>
          <TouchableWithoutFeedback onPress={goToDetail}>
            <CoverImg source={{ uri: book.image }} />
          </TouchableWithoutFeedback>
          <BookDetail>
            <TagsWrapper>
              {book.tags &&
                book.tags.map((genre) => (
                  <Tag key={genre} label={genre} selected />
                ))}
            </TagsWrapper>
            <ButtonWrapper onPress={goToWriteNote}>
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
};
export default BookCard;

const Container = styled.View`
  width: ${SCREEN_WIDTH - 48}px;
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
  position: relative;
`;

const ButtonWrapper = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 8px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const TagsWrapper = styled(Row)`
  flex-direction: row;
  flex-wrap: wrap;
`;
