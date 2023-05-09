import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Bookshelf: React.FC<NativeStackScreenProps<any, "Bookshelf">> = ({
  navigation: { navigate },
}) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Register" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Bookshelf</Text>
  </TouchableOpacity>
);
export default Bookshelf;
