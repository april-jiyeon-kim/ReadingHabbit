import React from "react";
import { Text, View } from "react-native";
import { Book } from "../types/bookTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Detail: Book;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params: book },
}) => (
  <View>
    <Text>{book.title}</Text>
  </View>
);

export default Detail;
