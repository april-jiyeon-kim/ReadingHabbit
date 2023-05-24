import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, GestureResponderEvent } from "react-native";
import { DARK_BLUE, LIGHT_GREY } from "../styles/colors";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Book, Note, NoteType, PageRange } from "../types/bookTypes";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import SetPage from "../components/screens/WriteNote/SetPage";
import { HeaderText } from "../styles/text";
import { TextInput } from "react-native";
import { Row } from "../styles/layout";
import { Badge } from "react-native-paper";
import Tag from "../components/common/Tag";
import { useFocusEffect } from "@react-navigation/native";
import { DETAIL_SCREEN } from "../constants/screenName";
import _ from "lodash";

type RootStackParamList = {
  EditTags: { book: Book };
};

type EditTagsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditTags"
>;

const EditTags: React.FC<EditTagsScreenProps> = ({ navigation, route }) => {
  const { book } = route.params;
  const user = firebase.auth().currentUser;
  const [tagList, setTagList] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const onChangeText = (text: string) => setNewTag(text);

  const handleAddTag = () => {
    if (tagList.includes(newTag)) {
      setSelectedTags([newTag, ...selectedTags]);
    } else {
      setTagList([newTag, ...tagList]);
      setSelectedTags([newTag, ...selectedTags]);
    }
  };

  const handleDeleteTag = _.debounce((tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setTagList(tagList.filter((t) => t !== tag));
  }, 100);

  const handleSelectTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([tag, ...selectedTags]);
    }
  };

  // 최종 세이브
  const handleSaveTag = async () => {
    if (!user) return;
    try {
      const booksCollection = firestore().collection("books");
      await booksCollection.doc(book.id).update({
        tags: selectedTags,
      });
      console.log("Tags added!");
    } catch (error) {
      console.error("Error updating tags:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const tagsSet = new Set<string>();
      const unsubscribe = firestore()
        .collection("books")
        .where("uid", "==", user?.uid)
        .onSnapshot((snapshot) => {
          const books = snapshot.docs;
          books.forEach((doc) => {
            const bookData = doc.data();
            if (bookData.tags) {
              bookData.tags.forEach((tag: string) => {
                if (book.id === doc.id) {
                  setSelectedTags((prevTags) => [tag, ...prevTags]);
                }
                tagsSet.add(tag);
              });
            }
          });

          const tagsArray = Array.from(tagsSet);
          setTagList(tagsArray);
        });

      return () => unsubscribe();
    }, [])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTitleStyle: { fontSize: 14 },
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveTag}>
          <Ionicons name="checkmark-sharp" size={24} color={DARK_BLUE} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedTags]);

  return (
    <Wrapper>
      <HeaderText>Edit Tags</HeaderText>
      <InputText
        value={newTag}
        onChangeText={onChangeText}
        placeholder={"Please enter a tag"}
        editable
      />
      <TouchableOpacity onPress={handleAddTag}>
        <Text>+</Text>
      </TouchableOpacity>
      <TagsWrapper>
        {tagList.map((it) => (
          <Tag
            label={it}
            selected={selectedTags.includes(it)}
            editable
            onSelect={() => handleSelectTag(it)}
            onDelete={() => handleDeleteTag(it)}
          />
        ))}
      </TagsWrapper>
    </Wrapper>
  );
};
export default EditTags;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding: 34px 16px 0;
`;

const InputText = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: black;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
`;

const TagsWrapper = styled(Row)`
  flex-direction: row;
  flex-wrap: wrap;
`;
