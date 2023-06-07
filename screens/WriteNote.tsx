import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, TextInput, Alert } from "react-native";
import {
  DARK_BLUE,
  DARK_GREY,
  LIGHT_BEIGE,
  LIGHT_GREY,
} from "../styles/colors";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Book, Note, NoteType, PageRange, PageType } from "../types/bookTypes";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import SetPage from "../components/screens/WriteNote/SetPage";
import ToggleTab from "../components/common/ToggleTab";

type RootStackParamList = {
  WriteNote: { book: Book };
};

type WriteNoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WriteNote"
>;

const WriteNote: React.FC<WriteNoteScreenProps> = ({ navigation, route }) => {
  const { book } = route.params;
  const user = firebase.auth().currentUser;
  const [noteText, setNoteText] = useState<string>("");
  const [page, setPage] = useState<PageRange>({ from: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const noteInput = useRef<TextInput>(null);
  const [tab, setTab] = useState(NoteType.QUOTES);

  const onChangeText = useCallback((text: string) => {
    setNoteText(text);
  }, []);

  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  const handleSaveNote = async () => {
    if (!user || noteText === "") {
      Alert.alert("Please enter your notes");
      return;
    }
    console.log("page:", page);
    try {
      const noteData = {
        text: noteText,
        bookId: book.id,
        noteType: tab,
        uid: user.uid,
        page: page,
        image: book.image,
      };
      const notesCollection = firestore().collection("notes");
      await notesCollection.add(noteData).then(() => {
        console.log("Note added!");
        navigation.goBack();
      });
    } catch (error) {
      console.log("Error writing note:", error);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const goToPage = () => {
    openModal();
  };

  useEffect(() => {
    noteInput.current?.focus();
  }, []);

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
  }, [navigation, handleSaveNote]);

  const handleSubmit = (pageType: PageType, pageRange: PageRange) => {
    pageType === PageType.RANGE
      ? setPage(pageRange)
      : setPage({ from: pageRange.from });
  };

  return (
    <Wrapper>
      <ButtonContainer>
        <ToggleTab activeTab={tab} onChangeTab={handleTabChange} size="small" />
        <PageBtn onPress={goToPage}>
          <PageText>
            {page.from && `p. ${page.from}`}
            {page.to && ` ~ p. ${page.to}`}
          </PageText>
        </PageBtn>
      </ButtonContainer>
      <SetPage
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSubmit}
        pageRange={page}
        currentPageType={page.to ? PageType.RANGE : PageType.SINGLE}
      />
      <TextArea
        ref={noteInput}
        placeholder="Share your thoughts here..."
        placeholderTextColor={LIGHT_GREY}
        multiline
        textAlignVertical="top"
        value={noteText}
        onChangeText={onChangeText}
      />
    </Wrapper>
  );
};

export default WriteNote;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 14px;
`;

const TextArea = styled.TextInput`
  padding: 0 24px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1;
  width: 100%;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px 10px;
`;

const PageBtn = styled.TouchableOpacity`
  border-radius: 20px;
  min-width: 61px;
  height: 24px;
  padding: 0 10px;
  border: 2px solid ${LIGHT_BEIGE};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  justify-content: center;
`;

const PageText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: ${DARK_GREY};
`;
