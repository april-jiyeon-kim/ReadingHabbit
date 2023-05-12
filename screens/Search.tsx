import { useState } from "react";
import { LIGHT_GREY } from "../styles/colors";
import { Container } from "../styles/layout";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { naverApi } from "../api";
import Loader from "../components/common/Loader";
import VList from "../components/screens/Bookshelf/VList";
import { Text } from "react-native";

const Search = () => {
  const [query, setQuery] = useState("");
  const { isLoading, data, refetch } = useQuery(
    ["searchBooks", query],
    naverApi.search,
    {
      enabled: false,
    }
  );

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    refetch();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search"
        placeholderTextColor={LIGHT_GREY}
        returnKeyLabel="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {isLoading ? <Loader /> : null}
      {data ? <VList data={data.items} /> : null}
    </Container>
  );
};
export default Search;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 14px;
`;
