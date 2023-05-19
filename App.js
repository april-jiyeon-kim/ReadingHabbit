import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import MainNavigator from "./navigation/MainNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PreLoginNavigator from "./navigation/PreLoginNavigator";
import auth from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Add the auth state change listener
        auth().onAuthStateChanged((user) => {
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {isLoggedIn ? <MainNavigator /> : <PreLoginNavigator />}
          <View onLayout={onLayoutRootView}></View>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
