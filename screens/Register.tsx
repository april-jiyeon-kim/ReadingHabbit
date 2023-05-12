import React, { useMemo, useState } from "react";
import { Text, View, Linking } from "react-native";
import { Book } from "../types/bookTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "react-query";
import { googleApi } from "../api";
import Loader from "../components/common/Loader";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";

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

  return (
    <View>
      <Text>{book.title}</Text>
      <Text>{book.isbn}</Text>
      {isLoading ? <Loader /> : null}
      {book?.pageCount && <Text>{book?.pageCount}</Text>}
      <LinkBtn onPress={openLink}>
        <BtnText>Link</BtnText>
      </LinkBtn>
    </View>
  );
};

export default Register;

const LinkBtn = styled.TouchableOpacity``;
const BtnText = styled.Text``;
