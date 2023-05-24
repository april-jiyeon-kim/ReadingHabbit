import styled from "styled-components/native";
import { DARK_BLUE, LIGHT_BLUE } from "../../styles/colors";

type Props = {
  label: string;
};

const Status = ({ label }: Props) => {
  return (
    <Wrapper>
      <StatusText>{label}</StatusText>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  background-color: ${DARK_BLUE};
  border-radius: 9px;
  padding: 2px 6px;
  height: 18px;
  margin-right: 5px;
  min-width: 66px;
  align-items: center;
`;

const StatusText = styled.Text`
  color: white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export default Status;
