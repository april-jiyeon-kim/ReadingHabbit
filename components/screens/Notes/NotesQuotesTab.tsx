import React from "react";
import styled from "styled-components/native";
import { Row } from "../../../styles/layout";
import { Note } from "../../../types/bookTypes";

interface Props {
  note: Note;
  showBookInfo?: boolean;
}

const NotesQuotesTab: React.FC<Props> = ({ note, showBookInfo = true }) => {
  return (
    <NoteContainer key={note.id}>
      {showBookInfo && <CoverImg source={{ uri: note.image }} />}
      <RightContainer>
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
