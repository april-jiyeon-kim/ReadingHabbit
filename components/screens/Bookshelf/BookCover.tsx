import React from "react";
import styled from "styled-components/native";

interface Props {
  image: string;
}

const BookCover: React.FC<Props> = ({ image }) => (
  <Wrapper>
    <CoverImg source={{ uri: image }} />
  </Wrapper>
);

export default BookCover;

const Wrapper = styled.TouchableOpacity``;

const CoverImg = styled.Image`
  width: 60px;
  height: 88px;
  border-radius: 5px;
`;
