import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import MainNavigator from "./navigation/MainNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PreLoginNavigator from "./navigation/PreLoginNavigator";
import { Provider, useDispatch } from "react-redux";
import store, { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getFirebase, isLoaded } from "react-redux-firebase";
import { firebase } from "@react-native-firebase/auth";
import {
  login,
  selectUser,
  listenForAuthChanges,
} from "./store/reducers/userSlice";
import { getFirestore, createFirestoreInstance } from "redux-firestore";

SplashScreen.preventAutoHideAsync();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = firebase.auth();
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Add the auth state change listener
        auth.onAuthStateChanged((user) => {
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

  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={navTheme}>
            {isLoggedIn ? <MainNavigator /> : <PreLoginNavigator />}
            <View onLayout={onLayoutRootView}></View>
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ReactReduxFirebaseProvider>
  );
}
