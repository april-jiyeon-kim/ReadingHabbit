import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

type RootStackParamList = {
  Tabs: undefined;
  Stack: undefined;
};

const Nav = createNativeStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);
export default MainNavigator;
