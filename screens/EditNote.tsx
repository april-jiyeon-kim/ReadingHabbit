import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { DARK_BLUE, LIGHT_GREY } from "../styles/colors";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Book, Note, NoteType, PageRange } from "../types/bookTypes";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import SetPage from "../components/screens/WriteNote/SetPage";

type RootStackParamList = {
  EditNote: { note: Note };
};

type EditNoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditNote"
>;

const EditNote: React.FC<EditNoteScreenProps> = ({ navigation, route }) => {
  const { note } = route.params;
  const user = firebase.auth().currentUser;
  const [noteText, setNoteText] = useState<string>(note.text || "");
  const [page, setPage] = useState<PageRange>({ from: 120, to: 123 });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "30%", "45%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  const onChangeText = useCallback((text: string) => {
    setNoteText(text);
  }, []);

  const handleSaveNote = useCallback(async () => {
    if (!user || noteText === "") return;
    try {
      const notesCollection = firestore().collection("notes");
      await notesCollection.doc(note.id).update({
        text: noteText,
      });
      navigation.goBack();
    } catch (error) {
      console.log("Error writing note:", error);
    }
  }, [navigation, note, noteText, user]);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.expand();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Note",
      headerTitleStyle: { fontSize: 14 },
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveNote}>
          <Ionicons name="checkmark-sharp" size={24} color={DARK_BLUE} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSaveNote]);

  return (
    <BottomSheetModalProvider>
      <Wrapper>
        <ButtonContainer>
          <PageBtn onPress={handlePresentModalPress}>
            <PageText>
              {page.from && `p. ${page.from}`}
              {page.to && ` ~ p. ${page.to}`}
            </PageText>
          </PageBtn>
        </ButtonContainer>
        <TextArea
          placeholder="Share your thoughts here..."
          placeholderTextColor={LIGHT_GREY}
          multiline
          textAlignVertical="top"
          value={noteText}
          onChangeText={onChangeText}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <SetPage />
        </BottomSheet>
      </Wrapper>
    </BottomSheetModalProvider>
  );
};

export default EditNote;

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
