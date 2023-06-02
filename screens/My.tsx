import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import styled from "styled-components/native";
import { SubHeaderText } from "../styles/text";
import { LIGHT_BEIGE, LIGHT_GREY } from "../styles/colors";
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
      <Section>
        <SubHeaderText>User Setting</SubHeaderText>
      </Section>
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
  border-bottom-color: ${LIGHT_BEIGE};
  padding: 14px 0;
  width: 100%;
  justify-content: center;
`;

const Section = styled.View`
  justify-content: flex-start;
  width: 100%;
  margin: 10px 0;
`;
