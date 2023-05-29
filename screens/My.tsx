import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import styled from "styled-components/native";
interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const My: React.FC<Props> = ({ navigation }) => {
  const onLogout = () => {
    auth().signOut().then();
  };
  const username = auth().currentUser?.displayName || "";
  return (
    <Wrapper style={{ flex: 1, alignItems: "center" }}>
      <NameText>HELLO, {username.toUpperCase()}</NameText>
      <MenuItem disabled>
        <Text>Language settings</Text>
      </MenuItem>
      <MenuItem onPress={onLogout}>
        <Text>Logout</Text>
      </MenuItem>
    </Wrapper>
  );
};
export default My;

const Wrapper = styled.View`
  margin: 16px 24px;
`;

const NameText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 24px;
`;

const MenuItem = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  padding-bottom: 14px;
  width: 100%;
`;
