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
import { DETAIL_SCREEN, REGISTER_SCREEN } from "../../../constants/screenName";
import firestore from "@react-native-firebase/firestore";
import { Book } from "../../../types/bookTypes";
import { DARK_GREY, LIGHT_GREY } from "../../../styles/colors";
import auth from "@react-native-firebase/auth";
interface Props {
  book: Book;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SearchBookCard: React.FC<Props> = ({ book }) => {
  const navigation = useNavigation();

  const checkIfBookExists = async () => {
    try {
      const booksRef = firestore().collection("books");
      await booksRef
        .where("isbn", "==", book.isbn)
        .where("uid", "==", auth().currentUser?.uid)
        .get()
        .then((querySnapshot) => {
          const bookData = querySnapshot.docs;
          bookData.length === 0 ? goToRegister() : goToDetail(bookData[0].id);
        });
    } catch (error) {
      console.error("Error checking if book exists:", error);
      return false;
    }
  };
  const goToRegister = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: REGISTER_SCREEN,
      params: { ...book },
    });
  };
  const goToDetail = (bookId: string) => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: DETAIL_SCREEN,
      params: { bookId },
    });
  };
  return (
    <Wrapper>
      <Card>
        <TouchableWithoutFeedback onPress={checkIfBookExists}>
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
  border: 1px solid ${LIGHT_GREY};
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
  color: ${DARK_GREY};
`;
