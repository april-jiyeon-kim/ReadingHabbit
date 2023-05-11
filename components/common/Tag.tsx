import styled from "styled-components/native";

const TagText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  color: white;
`;

const Wrapper = styled.View`
  width: 76px;
  height: 17px;
  background: #87ceeb;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

type Props = {
  label: string;
};

const Tag = ({ label }: Props) => {
  return (
    <Wrapper>
      <TagText>#{label}</TagText>
    </Wrapper>
  );
};

export default Tag;
