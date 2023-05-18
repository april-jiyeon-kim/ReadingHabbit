import React, { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ToggleTab from "../components/common/ToggleTab";
import { NoteType } from "../types/bookTypes";
import styled from "styled-components/native";
import { Row } from "../styles/layout";
import NotesQuotesTab from "../components/screens/Notes/NotesQuotesTab";

const mockData = [
  {
    id: 1,
    noteType: NoteType.QUOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 2,
    noteType: NoteType.QUOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120", "130"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 3,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 4,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 5,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 6,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 7,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
  {
    id: 8,
    noteType: NoteType.NOTES,
    title: "Book Title",
    text: "He'll want to use your yacht, and I don't want this thing smelling like fish. He'll want to use your yacht, and I don't want this thing smelling like fish.",
    page: ["120"],
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
  },
];

const Notes = () => {
  const [tab, setTab] = useState(NoteType.QUOTES);
  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  const data = useMemo(() => {
    return mockData.filter((it) => it.noteType === tab);
  }, [tab]);

  return (
    <Wrapper>
      <ToggleTab activeTab={tab} onChangeTab={handleTabChange} />
      <FlatList
        data={data}
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
