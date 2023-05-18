import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { DARK_BLUE, LIGHT_GREY } from "../styles/colors";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Book } from "../types/bookTypes";

type RootStackParamList = {
  WriteNote: { book: Book };
};

type WriteNoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WriteNote"
>;

const WriteNote: React.FC<WriteNoteScreenProps> = ({ navigation, route }) => {
  const { book } = route.params;
  const [note, setNote] = useState("");
  const onChangeText = (text: string) => setNote(text);
  const handleSaveNote = () => {
    console.log(note);

    // navigation.goBack();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: book.title,
      headerTitleStyle: { fontSize: 14 },
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveNote}>
          <Ionicons name="checkmark-sharp" size={24} color={DARK_BLUE} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Wrapper>
      <ButtonContainer>
        <PageBtn>
          <PageText>P. 120</PageText>
        </PageBtn>
      </ButtonContainer>

      <TextArea
        placeholder="Share your thoughts here..."
        placeholderTextColor={LIGHT_GREY}
        multiline
        textAlignVertical="top"
        value={note}
        onChangeText={onChangeText}
      />
    </Wrapper>
  );
};
export default WriteNote;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 34px;
`;

const TextArea = styled.TextInput`
  background-color: white;
  padding: 0 24px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1;
`;

const ButtonContainer = styled.View`
  position: absolute;
  margin-top: 12px;
  right: 12px;
`;

const PageBtn = styled.TouchableOpacity`
  border-radius: 20px;
  min-width: 61px;
  height: 21px;
  padding: 0 10px;
  border: 2px solid #d8d8d8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

const PageText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #797979;
`;
