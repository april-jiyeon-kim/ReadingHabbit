import React, { useCallback, useMemo, useState } from "react";
import { Text, View, Linking, TextInput, FlatList } from "react-native";
import { Book, ReadingStatus } from "../types/bookTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import { googleApi } from "../api";
import Loader from "../components/common/Loader";
import styled from "styled-components/native";
import { HeaderText } from "../styles/text";
import { Container, Row } from "../styles/layout";
import InputWithLabel from "../components/screens/Bookshelf/InputWithLabel";
import Status from "../components/common/Status";
import { translateReadingStatus } from "../utils";
import RadioButton from "../components/common/RadioButton";
import { SectionTitle } from "../components/screens/Bookshelf/SectionTitle";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DARK_BLUE } from "../styles/colors";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { HOME_SCREEN } from "../constants/screenName";
import { BOOKSHELF_SCREEN } from "../constants/screenName";

type RootStackParamList = {
  Register: Book;
};

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const Register: React.FC<RegisterScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const user = firebase.auth().currentUser;
  const [book, setBook] = useState(params);
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(
    ReadingStatus.READING
  );
  // Find the book on google api
  const { data: volumeData } = useQuery(
    ["search", params.isbn],
    googleApi.search
  );
  const id = (volumeData?.totalItems > 0 && volumeData?.items[0]?.id) || null;
  const { isLoading, data: volumeDetail } = useQuery(
    ["detail", id],
    googleApi.detail,
    {
      enabled: !!id,
      onSuccess: (data) => {
        const { pageCount } = data?.volumeInfo;
        setBook({ ...book, pageCount });
      },
    }
  );

  const openLink = async () => {
    await Linking.openURL(book.link);
  };

  const bookKeyExtractor = (item: Book) => item.isbn;

  const handleStatusChange = useCallback((status: ReadingStatus) => {
    setReadingStatus(status);
  }, []);
  const goToHome = () => {
    //@ts-ignore
    navigation.navigate("Tabs", {
      screen: BOOKSHELF_SCREEN,
    });
  };
  const registerBook = useCallback(async () => {
    if (!user) return;
    try {
      const bookData: Book = {
        ...book,
        uid: user.uid,
        reading: { status: readingStatus },
        isFavorite: false,
        isWishList: false,
        genres: [],
      };
      const booksCollection = firestore().collection("books");
      await booksCollection.add(bookData).then(() => {
        console.log("Book added!");
        goToHome();
      });
    } catch (error) {
      console.error("Error registering book:", error);
    }
  }, [readingStatus]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { fontSize: 14 },
      headerTitle: "",
      headerRight: () => (
        <TouchableOpacity onPress={registerBook}>
          <Ionicons name="checkmark-sharp" size={24} color={DARK_BLUE} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, readingStatus]);

  return (
    <Wrapper>
      <FlatList
        data={[book]}
        keyExtractor={bookKeyExtractor}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            <HeaderText>Register Book</HeaderText>
            <BookInfoContainer>
              <CoverImg source={{ uri: item.image }} />
              <StatusWrapper>
                {Object.values(ReadingStatus).map((status) => (
                  <RadioButton
                    key={status}
                    label={translateReadingStatus(status)}
                    selected={readingStatus === status}
                    onPress={() => handleStatusChange(status)}
                  />
                ))}
              </StatusWrapper>
              <InputWithLabel label={"Title"} value={item.title} />
              <InputWithLabel label={"Author"} value={item.author} />
              <InputWithLabel label={"Publisher"} value={item.publisher} />
              <InputWithLabel label={"Published"} value={item.pubdate} />
              {isLoading ? <Loader /> : null}
              {item?.pageCount && (
                <InputWithLabel
                  label={"page"}
                  value={item.pageCount.toString()}
                />
              )}
              {/* <LinkBtn onPress={openLink}>
                <BtnText>Link</BtnText>
              </LinkBtn> */}
            </BookInfoContainer>
          </>
        )}
      />
    </Wrapper>
  );
};

export default Register;
const Wrapper = styled.View`
  margin: 26px 24px;
`;

const BookInfoContainer = styled.View`
  align-items: center;
  margin: 24px;
`;

const CoverImg = styled.Image`
  width: 136px;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 24px;
`;

const StatusWrapper = styled(Row)`
  justify-content: center;
`;
const LinkBtn = styled.TouchableOpacity``;
const BtnText = styled.Text``;
