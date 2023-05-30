import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

interface Props {
  image: string;
  read?: boolean;
}

const BookCover: React.FC<Props> = ({ image, read = false }) => {
  return (
    <>
      <CoverImg source={{ uri: image }} read={read} />
      {read && (
        <ConfirmImg
          source={require("../../../assets/images/confirm_circle.png")}
        />
      )}
    </>
  );
};

export default BookCover;

const CoverImg = styled.Image<{ read: boolean }>`
  width: 60px;
  height: 88px;
  border-radius: 5px;
  opacity: ${({ read }) => (read ? "0.5" : "1")};
`;

const ConfirmImg = styled.Image`
  position: absolute;
  width: 23px;
  height: 23px;
  right: 4px;
  bottom: 4px;
`;
