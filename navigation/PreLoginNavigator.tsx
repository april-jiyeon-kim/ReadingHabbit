import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Join from "../screens/Join";
import { DARK_BLUE } from "../styles/colors";

type RootStackParamList = {
  Login: undefined;
  Join: undefined;
};

const Nav = createNativeStackNavigator<RootStackParamList>();

const PreLoginNavigator: React.FC = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
    }}
  >
    <Nav.Screen name="Login" component={Login} />
    <Nav.Screen name="Join" component={Join} />
  </Nav.Navigator>
);
export default PreLoginNavigator;
