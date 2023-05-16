import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Book, NoteType, ReadingStatus } from "../types/bookTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderText } from "../styles/text";
import { Row } from "../styles/layout";
import styled from "styled-components/native";
import RadioButton from "../components/common/RadioButton";
import ReadingProgress from "../components/screens/Bookshelf/ReadingStatus";
import Status from "../components/common/Status";
import BottomSheet from "../components/common/BottomSheet";
import ToggleTab from "../components/common/ToggleTab";

type RootStackParamList = {
  Detail: Book;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

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

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params: book },
}) => {
  const [tab, setTab] = useState(NoteType.QUOTES);
  const handleTabChange = (newTab: NoteType) => {
    setTab(newTab);
  };

  const data = useMemo(() => {
    return mockData.filter((it) => it.noteType === tab);
  }, [tab]);

  return (
    <Wrapper>
      <HeaderText>{book.title}</HeaderText>
      <BookInfoContainer>
        <CoverImg source={{ uri: book.image }} />
        <BookInfo>
          <View>
            <BottomText>{book.author}</BottomText>
            <BottomText>{book.publisher}</BottomText>
          </View>
          <BottomSheet openBtn={<Status label={ReadingStatus.READING} />}>
            <View>
              <Text>test</Text>
            </View>
          </BottomSheet>

          <ReadingProgress book={book} />
        </BookInfo>
      </BookInfoContainer>
    </Wrapper>
  );
};

export default Detail;
const Wrapper = styled.View`
  margin: 26px 24px;
`;
const BookInfoContainer = styled(Row)`
  margin: 24px 0;
  width: 100%;
`;
const CoverImg = styled.Image`
  width: 93px;
  height: 136px;
  border-radius: 5px;
  margin-bottom: 24px;
`;

const BookInfo = styled.View`
  margin-left: 10px;
  justify-content: space-between;
  height: 136px;
`;

const BottomText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #797979;
`;
