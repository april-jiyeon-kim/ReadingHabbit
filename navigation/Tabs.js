import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Bookshelf from "../screens/Bookshelf";
import Notes from "../screens/Notes";
import My from "../screens/My";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#D9D9D9" },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#1E90FF",
        tabBarInactiveTintColor: "#141B34",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookshelf"
        component={Bookshelf}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My"
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
