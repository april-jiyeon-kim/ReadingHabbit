import React from "react";
import styled from "styled-components/native";
import { Row } from "../../../styles/layout";
import { Note } from "../../../types/bookTypes";
import { EDIT_NOTE_SCREEN } from "../../../constants/screenName";
import { useNavigation } from "@react-navigation/native";
import { INPUT_BORDER_COLOR, PLACEHOLDER_COLOR } from "../../../styles/colors";

interface Props {
  note: Note;
  showBookInfo?: boolean;
}

const NotesQuotesTab: React.FC<Props> = ({ note, showBookInfo = true }) => {
  const navigation = useNavigation();
  const goToEditNote = () => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: EDIT_NOTE_SCREEN,
      params: { note },
    });
  };

  return (
    <NoteContainer key={note.id}>
      {showBookInfo && <CoverImg source={{ uri: note.image }} />}
      <RightContainer onPress={goToEditNote}>
        {showBookInfo && <NoteTitle>{note.title}</NoteTitle>}
        <PageText>
          {note.page.from && `p. ${note.page.from}`}
          {note.page.to && ` ~ p. ${note.page.to}`}
        </PageText>
        <NoteText>{note.text}</NoteText>
      </RightContainer>
    </NoteContainer>
  );
};

export default NotesQuotesTab;

const NoteContainer = styled(Row)`
  width: 100%;
`;
const RightContainer = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${INPUT_BORDER_COLOR};
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
  color: ${PLACEHOLDER_COLOR};
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
