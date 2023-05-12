import React from "react";
import { FlatList } from "react-native";
import BookCover from "./BookCover";
import SearchBookCard from "./SearchBookCard";
import styled from "styled-components/native";

interface VListProps {
  data: any[];
}

const VList: React.FC<VListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.isbn}
      ItemSeparatorComponent={Seperator}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <SearchBookCard book={item} />}
      contentContainerStyle={{ alignItems: "center" }}
    />
  );
};

export default VList;

const Seperator = styled.View`
  height: 10px;
`;
