import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";

interface Props {
  image: string;
}

const BookCover: React.FC<Props> = ({ image }) => {
  return <CoverImg source={{ uri: image }} />;
};

export default BookCover;

const CoverImg = styled.Image`
  width: 60px;
  height: 88px;
  border-radius: 5px;
`;
