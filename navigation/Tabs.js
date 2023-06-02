import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Bookshelf from "../screens/Bookshelf";
import Notes from "../screens/Notes";
import My from "../screens/My";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BOOKSHELF_SCREEN,
  HOME_SCREEN,
  MY_SCREEN,
  NOTES_SCREEN,
} from "../constants/screenName";
import { DARK_BLUE, DARK_PLUM, LIGHT_GREY } from "../styles/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarStyle: { backgroundColor: LIGHT_GREY },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: DARK_BLUE,
        tabBarInactiveTintColor: DARK_PLUM,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name={HOME_SCREEN}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={BOOKSHELF_SCREEN}
        component={Bookshelf}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NOTES_SCREEN}
        component={Notes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="note-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MY_SCREEN}
        component={My}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
