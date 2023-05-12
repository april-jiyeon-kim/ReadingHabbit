import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import Search from "../screens/Search";
import Detail from "../screens/Detail";
import Register from "../screens/Register";
import {
  DETAIL_SCREEN,
  REGISTER_SCREEN,
  SEARCH_SCREEN,
} from "../constants/screenName";

const ScreenRegister = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Bookshelf" })}>
    <Text>Go to Bookshelf</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name={SEARCH_SCREEN} component={Search} />
    <NativeStack.Screen name={DETAIL_SCREEN} component={Detail} />
    <NativeStack.Screen name={REGISTER_SCREEN} component={Register} />
  </NativeStack.Navigator>
);

export default Stack;
