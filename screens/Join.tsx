import React, { useRef, useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { DARK_BLUE } from "../styles/colors";

const Join = () => {
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitNameEditing = () => {
    emailInput.current?.focus();
  };

  const onSubmitEmailEditing = () => {
    passwordInput.current?.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (name === "" || email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user.updateProfile({ displayName: name });
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <InputWrapper>
        <PreLoginTextInput
          placeholder="Name"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          returnKeyLabel="next"
          onChangeText={(text) => setName(text)}
          onSubmitEditing={onSubmitNameEditing}
          placeholderTextColor={"#BDBDBD"}
        />
        <PreLoginTextInput
          ref={emailInput}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          returnKeyLabel="next"
          onChangeText={(text) => setEmail(text)}
          onSubmitEditing={onSubmitEmailEditing}
          placeholderTextColor={"#BDBDBD"}
        />
        <PreLoginTextInput
          ref={passwordInput}
          placeholder="Password"
          secureTextEntry
          value={password}
          returnKeyLabel="done"
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={onSubmitPasswordEditing}
          placeholderTextColor={"#BDBDBD"}
        />
      </InputWrapper>
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color={DARK_BLUE} />
        ) : (
          <BtnText>Sign Up</BtnText>
        )}
      </Btn>
    </Container>
  );
};
export default Join;

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
