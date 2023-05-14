import React, { useMemo, useState } from "react";
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

type RootStackParamList = {
  Register: Book;
};

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const Register: React.FC<RegisterScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const [book, setBook] = useState(params);
  const [readingStatus, setReadingStatus] = useState(ReadingStatus.READING);
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

  const handleStatusChange = (status: ReadingStatus) => {
    setReadingStatus(status);
  };

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
              <LinkBtn onPress={openLink}>
                <BtnText>Link</BtnText>
              </LinkBtn>
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
  justify-content: space-between;
`;
const LinkBtn = styled.TouchableOpacity``;
const BtnText = styled.Text``;
