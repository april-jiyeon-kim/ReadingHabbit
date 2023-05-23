import React, { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ToggleTab from "../components/common/ToggleTab";
import { Note, NoteType } from "../types/bookTypes";
import styled from "styled-components/native";
import { Row } from "../styles/layout";
import NotesQuotesTab from "../components/screens/Notes/NotesQuotesTab";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const Notes = () => {
  const [tab, setTab] = useState(NoteType.QUOTES);
  const [notes, setNotes] = useState<Note[]>([]);
  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = firestore()
        .collection("notes")
        .where("uid", "==", auth().currentUser?.uid)
        .where("noteType", "==", tab)
        .onSnapshot((snapshot) => {
          const notesArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Note[];
          setNotes(notesArray);
        });
      console.log("load");
      return () => unsubscribe();
    }, [tab])
  );

  return (
    <Wrapper>
      <ToggleTab activeTab={tab} onChangeTab={handleTabChange} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Seperator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => <NotesQuotesTab note={item} />}
      />
    </Wrapper>
  );
};
export default Notes;

const Wrapper = styled.View`
  margin: 0 16px;
`;
const NoteContainer = styled(Row)`
  width: 100%;
`;
const RightContainer = styled.View`
  flex: 1;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  align-items: flex-start;
  margin-left: 16px;
  padding-bottom: 16px;
`;
const PageText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #bdbdbd;
`;
const NoteTitle = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
const NoteText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const CoverImg = styled.Image`
  width: 60px;
  height: 68px;
  border-radius: 5px;
  margin: 2px;
`;

const Seperator = styled.View`
  height: 10px;
`;
