import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const My: React.FC<Props> = ({ navigation }) => {
  const onLogout = () => {
    auth().signOut().then();
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default My;
