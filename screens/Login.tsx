import React, { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import { DARK_BLUE } from "../styles/colors";
import auth from "@react-native-firebase/auth";
interface LoginProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const passwordInput = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitEditing = () => {
    passwordInput.current?.focus();
  };
  const onLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <InputWrapper>
        <PreLoginTextInput
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          returnKeyLabel="next"
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={"#BDBDBD"}
        />
        <PreLoginTextInput
          ref={passwordInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          returnKeyLabel="done"
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={"#BDBDBD"}
        />
      </InputWrapper>
      <Btn onPress={onLogin}>
        <BtnText>Log In</BtnText>
      </Btn>
      <JoinBtn onPress={() => navigation.navigate("Join")}>
        <JoinText>Don't have an account? </JoinText>
      </JoinBtn>
    </Container>
  );
};
export default Login;

const Container = styled.View`
  margin: 32px 16px;
  flex: 1;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

const PreLoginTextInput = styled.TextInput`
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
const Btn = styled.TouchableOpacity`
  padding: 10px 20px;
  background: #1e90ff;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const JoinBtn = styled.TouchableOpacity`
  margin-top: 16px;
`;
const JoinText = styled.Text`
  color: ${DARK_BLUE};
  text-align: center;
`;
