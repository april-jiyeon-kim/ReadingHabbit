import React from "react";
import BookCover from "./BookCover";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { REGISTER_SCREEN } from "../../../constants/screenName";
interface Props {
  book: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SearchBookCard: React.FC<Props> = ({ book }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: REGISTER_SCREEN,
      params: { ...book },
    });
  };
  return (
    <Wrapper>
      <Card>
        <TouchableWithoutFeedback onPress={goToDetail}>
          <View>
            <BookCover image={book.image} />
          </View>
        </TouchableWithoutFeedback>
        <BookInfo>
          <BookTitle>
            {book.title.slice(0, 30)}
            {book.title.length > 30 ? "..." : null}
          </BookTitle>
          <View>
            <BottomText>{book.author}</BottomText>
            <BottomText>{book.publisher}</BottomText>
          </View>
        </BookInfo>
      </Card>
    </Wrapper>
  );
};
export default SearchBookCard;

const BookTitle = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  width: 100%;
  line-height: 17px;
`;

const Wrapper = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: ${SCREEN_WIDTH}px;
`;

const Card = styled.View`
  width: 90%;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 8px 11px;
  flex-direction: row;
`;

const BookInfo = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`;

const BottomText = styled.Text`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: #797979;
`;
