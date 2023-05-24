import styled from "styled-components/native";
import { DARK_BLUE, LIGHT_BLUE, LIGHT_GREY } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";
type Props = {
  label: string;
  editable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
};

const Tag = ({
  label,
  editable = false,
  selected = false,
  onSelect,
  onDelete,
}: Props) => {
  const handleDelete = (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <Wrapper
      selected={selected}
      onPress={() => onSelect?.()}
      activeOpacity={editable ? 0 : 1}
    >
      <TagText>#{label}</TagText>
      {editable && (
        <DeleteBtn onPress={handleDelete}>
          <Ionicons name="md-close" size={12} color="black" />
        </DeleteBtn>
      )}
    </Wrapper>
  );
};

export default Tag;

const TagText = styled.Text`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: white;
  margin-right: 6px;
`;

const Wrapper = styled.TouchableOpacity<{ selected: boolean }>`
  background: ${({ selected }) => (selected ? LIGHT_BLUE : LIGHT_GREY)};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 4px 4px 0;
  padding: 0 4px 4px;
`;

const DeleteBtn = styled.TouchableOpacity``;
