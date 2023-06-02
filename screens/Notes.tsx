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

const Seperator = styled.View`
  height: 10px;
`;
