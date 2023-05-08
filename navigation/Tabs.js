import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Bookshelf from "../screens/Bookshelf";
import Notes from "../screens/Notes";
import My from "../screens/My";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Bookshelf" component={Bookshelf} />
    <Tab.Screen name="Notes" component={Notes} />
    <Tab.Screen name="My" component={My} />
  </Tab.Navigator>
);

export default Tabs;
