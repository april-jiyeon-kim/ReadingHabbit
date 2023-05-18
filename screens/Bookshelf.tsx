import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { DARK_BLUE, LIGHT_GREY } from "../styles/colors";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Container, Row } from "../styles/layout";
import BookCard from "../components/screens/Bookshelf/BookCard";
import { Book, ReadingStatus } from "../types/bookTypes";
import { SectionTitle } from "../components/screens/Bookshelf/SectionTitle";
import BookCover from "../components/screens/Bookshelf/BookCover";
import {
  DETAIL_SCREEN,
  REGISTER_SCREEN,
  SEARCH_SCREEN,
  WRITE_NOTE_SCREEN,
} from "../constants/screenName";
import { useNavigation } from "@react-navigation/native";

const mockData: Book[] = [
  {
    author: "정지영",
    description:
      "“부디 딱 1년만 청약하라!” 바로 지금이 가점 없는 우리가 7년간 기다려온 ‘당첨의 봄날’이다! 가점이 낮아도, 세대주가 아니라도, 중도금이 없어도 반드시 새 아파트 주인이 되는 아임해피의 청약 일타 강의 “추첨제 부활! 사상 최대 특별공급 확대! 중도금 대출 완화! 당신이 알던 ‘청약’의 모든 것이 달라졌다” _모든 규제가 사라진 대한민국 청약시장의 미래 “여러분이 생각하는 청약은 어떤 모습인가요? 60점이 넘는 고가점자가 수두룩해서 20~30대는 감히 엄두도 못 낼 것 같나요? 한평생 무주택자도 당첨되 기가 힘들다던데 하물며 1주택자에게 청약으로 갈아타기란 꿈도 못 꿀 일일까요? 다주택자에게는 언감생심 넘볼 수도 없다고요? 그런 여러분에게 2023 년 청약이 얼마나 새로워졌는지를 이야기해 주고 싶어 지금 이 책을 쓰게 되었습니다.” 대한민국 부동산계의 여성 리더로서 해마다 가장 저렴하게 내 집 장만하는 방법을 알려주며 ‘무주택자들의 어머니’라 불리는 아임해피가 2023년에는 ‘ 청약’을 주제로 『NEW 대한민국 청약지도』와 함께 돌아왔다. 2019년 이미 한 차례 대한민국에 청약 열풍을 불러 일으켰던 저자는 “모든 규제가 사라진 2023년이야말로 청약으로 내 집 마련할 수 있는 최적의 시기”라고 강조한다. ‘역대급 추첨제 부활’, ‘사상 최대 특별공급 확대’, ‘중도금 대출 대폭 완화’, ‘전매제한 해제’, ‘1주택자 처분 의무 폐지’ 등등. 일일이 열거하기도 벅찰 만큼 모든 정책이 청약의 구원투수로 나선 이때, 왜 사람들은 모두가 원하고 바라는 ‘새 아파트’를, 그것도 2년 전 가격으로 저렴하게 살 수 있음에도 청약에 관심을 두고 도전하지 않는 걸까? “가점이 낮아도 추첨제로 당첨될 수 있다고, 돈이 없어도 특별공급으로 강남 입성할 수 있다고 소리 높여 외치고 있지만, 청약은 여전히 ‘로또’라는 편견에 사로잡혀 시도조차 하지 않는 분들이 많습니다. 고시 공부를 하는 것처럼 알아야 할 게 너무 많고, 복잡하고 어렵기에 외면하는 것이겠죠. 이 책 은 그런 청약을 가장 쉽게, 하룻밤에 독파할 수 있도록 완벽하게 분석한 최초의 부동산 책입니다.” 이 책의 저자는 “모르면 그냥 지나치지만, 알면 누구나 기회를 잡을 수 있는 게 청약이다”라고 강조한다. 청약 역시 ‘지피지기면 백전불태’라서, 지금 자신의 상황을 제대로 알고 완벽하게 전략을 세우면 가점이 낮아도 자신에게 맞는 새 아파트를 장만할 수 있다는 말이다. ‘2023-2024 서울·수도권 분양예정단지 리스트’는 물론, 이미 수만 명의 독자를 당첨시키며 수백만 원을 주고도 듣지 못할 ‘청약의 신’ 아임해피의 ‘청약 노하우’가 이 책 한 권에 아낌없이 담겨 있다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
    isbn: "9791130699066",
    link: "https://search.shopping.naver.com/book/catalog/39437627619",
    pubDate: "20230418",
    publisher: "다산북스",
    title: "New 대한민국 청약지도 (한 권으로 끝내는 청약 당첨 전략의 모든 것)",
    reading: {
      status: ReadingStatus.READING,
      currentPage: 240,
      startDate: `2023.05.01`,
    },
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    isFavorite: false,
    isWishList: false,
  },
  {
    author: "정지영",
    description:
      "“부디 딱 1년만 청약하라!” 바로 지금이 가점 없는 우리가 7년간 기다려온 ‘당첨의 봄날’이다! 가점이 낮아도, 세대주가 아니라도, 중도금이 없어도 반드시 새 아파트 주인이 되는 아임해피의 청약 일타 강의 “추첨제 부활! 사상 최대 특별공급 확대! 중도금 대출 완화! 당신이 알던 ‘청약’의 모든 것이 달라졌다” _모든 규제가 사라진 대한민국 청약시장의 미래 “여러분이 생각하는 청약은 어떤 모습인가요? 60점이 넘는 고가점자가 수두룩해서 20~30대는 감히 엄두도 못 낼 것 같나요? 한평생 무주택자도 당첨되 기가 힘들다던데 하물며 1주택자에게 청약으로 갈아타기란 꿈도 못 꿀 일일까요? 다주택자에게는 언감생심 넘볼 수도 없다고요? 그런 여러분에게 2023 년 청약이 얼마나 새로워졌는지를 이야기해 주고 싶어 지금 이 책을 쓰게 되었습니다.” 대한민국 부동산계의 여성 리더로서 해마다 가장 저렴하게 내 집 장만하는 방법을 알려주며 ‘무주택자들의 어머니’라 불리는 아임해피가 2023년에는 ‘ 청약’을 주제로 『NEW 대한민국 청약지도』와 함께 돌아왔다. 2019년 이미 한 차례 대한민국에 청약 열풍을 불러 일으켰던 저자는 “모든 규제가 사라진 2023년이야말로 청약으로 내 집 마련할 수 있는 최적의 시기”라고 강조한다. ‘역대급 추첨제 부활’, ‘사상 최대 특별공급 확대’, ‘중도금 대출 대폭 완화’, ‘전매제한 해제’, ‘1주택자 처분 의무 폐지’ 등등. 일일이 열거하기도 벅찰 만큼 모든 정책이 청약의 구원투수로 나선 이때, 왜 사람들은 모두가 원하고 바라는 ‘새 아파트’를, 그것도 2년 전 가격으로 저렴하게 살 수 있음에도 청약에 관심을 두고 도전하지 않는 걸까? “가점이 낮아도 추첨제로 당첨될 수 있다고, 돈이 없어도 특별공급으로 강남 입성할 수 있다고 소리 높여 외치고 있지만, 청약은 여전히 ‘로또’라는 편견에 사로잡혀 시도조차 하지 않는 분들이 많습니다. 고시 공부를 하는 것처럼 알아야 할 게 너무 많고, 복잡하고 어렵기에 외면하는 것이겠죠. 이 책 은 그런 청약을 가장 쉽게, 하룻밤에 독파할 수 있도록 완벽하게 분석한 최초의 부동산 책입니다.” 이 책의 저자는 “모르면 그냥 지나치지만, 알면 누구나 기회를 잡을 수 있는 게 청약이다”라고 강조한다. 청약 역시 ‘지피지기면 백전불태’라서, 지금 자신의 상황을 제대로 알고 완벽하게 전략을 세우면 가점이 낮아도 자신에게 맞는 새 아파트를 장만할 수 있다는 말이다. ‘2023-2024 서울·수도권 분양예정단지 리스트’는 물론, 이미 수만 명의 독자를 당첨시키며 수백만 원을 주고도 듣지 못할 ‘청약의 신’ 아임해피의 ‘청약 노하우’가 이 책 한 권에 아낌없이 담겨 있다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
    isbn: "9791130699066",
    link: "https://search.shopping.naver.com/book/catalog/39437627619",
    pubDate: "202304183",
    publisher: "다산북스",
    title: "New 대한민국 청약지도 (한 권으로 끝내는 청약 당첨 전략의 모든 것)",
    reading: {
      status: ReadingStatus.READ,
      currentPage: 240,
      startDate: `2023.05.01`,
    },
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    isFavorite: false,
    isWishList: false,
  },
  {
    author: "정지영",
    description:
      "“부디 딱 1년만 청약하라!” 바로 지금이 가점 없는 우리가 7년간 기다려온 ‘당첨의 봄날’이다! 가점이 낮아도, 세대주가 아니라도, 중도금이 없어도 반드시 새 아파트 주인이 되는 아임해피의 청약 일타 강의 “추첨제 부활! 사상 최대 특별공급 확대! 중도금 대출 완화! 당신이 알던 ‘청약’의 모든 것이 달라졌다” _모든 규제가 사라진 대한민국 청약시장의 미래 “여러분이 생각하는 청약은 어떤 모습인가요? 60점이 넘는 고가점자가 수두룩해서 20~30대는 감히 엄두도 못 낼 것 같나요? 한평생 무주택자도 당첨되 기가 힘들다던데 하물며 1주택자에게 청약으로 갈아타기란 꿈도 못 꿀 일일까요? 다주택자에게는 언감생심 넘볼 수도 없다고요? 그런 여러분에게 2023 년 청약이 얼마나 새로워졌는지를 이야기해 주고 싶어 지금 이 책을 쓰게 되었습니다.” 대한민국 부동산계의 여성 리더로서 해마다 가장 저렴하게 내 집 장만하는 방법을 알려주며 ‘무주택자들의 어머니’라 불리는 아임해피가 2023년에는 ‘ 청약’을 주제로 『NEW 대한민국 청약지도』와 함께 돌아왔다. 2019년 이미 한 차례 대한민국에 청약 열풍을 불러 일으켰던 저자는 “모든 규제가 사라진 2023년이야말로 청약으로 내 집 마련할 수 있는 최적의 시기”라고 강조한다. ‘역대급 추첨제 부활’, ‘사상 최대 특별공급 확대’, ‘중도금 대출 대폭 완화’, ‘전매제한 해제’, ‘1주택자 처분 의무 폐지’ 등등. 일일이 열거하기도 벅찰 만큼 모든 정책이 청약의 구원투수로 나선 이때, 왜 사람들은 모두가 원하고 바라는 ‘새 아파트’를, 그것도 2년 전 가격으로 저렴하게 살 수 있음에도 청약에 관심을 두고 도전하지 않는 걸까? “가점이 낮아도 추첨제로 당첨될 수 있다고, 돈이 없어도 특별공급으로 강남 입성할 수 있다고 소리 높여 외치고 있지만, 청약은 여전히 ‘로또’라는 편견에 사로잡혀 시도조차 하지 않는 분들이 많습니다. 고시 공부를 하는 것처럼 알아야 할 게 너무 많고, 복잡하고 어렵기에 외면하는 것이겠죠. 이 책 은 그런 청약을 가장 쉽게, 하룻밤에 독파할 수 있도록 완벽하게 분석한 최초의 부동산 책입니다.” 이 책의 저자는 “모르면 그냥 지나치지만, 알면 누구나 기회를 잡을 수 있는 게 청약이다”라고 강조한다. 청약 역시 ‘지피지기면 백전불태’라서, 지금 자신의 상황을 제대로 알고 완벽하게 전략을 세우면 가점이 낮아도 자신에게 맞는 새 아파트를 장만할 수 있다는 말이다. ‘2023-2024 서울·수도권 분양예정단지 리스트’는 물론, 이미 수만 명의 독자를 당첨시키며 수백만 원을 주고도 듣지 못할 ‘청약의 신’ 아임해피의 ‘청약 노하우’가 이 책 한 권에 아낌없이 담겨 있다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
    isbn: "9791130699066",
    link: "https://search.shopping.naver.com/book/catalog/39437627619",
    pubDate: "202304182",
    publisher: "다산북스",
    title: "New 대한민국 청약지도 (한 권으로 끝내는 청약 당첨 전략의 모든 것)",
    reading: {
      status: ReadingStatus.TO_READ,
      currentPage: 240,
      startDate: `2023.05.01`,
    },
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    isFavorite: false,
    isWishList: false,
  },
];

const Bookshelf: React.FC<NativeStackScreenProps<any, "Bookshelf">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(false);

  const booksReading = useMemo(() => {
    return mockData.filter((it) => it.reading.status === ReadingStatus.READING);
  }, []);

  const booksToRead = useMemo(() => {
    return mockData.filter((it) => it.reading.status === ReadingStatus.TO_READ);
  }, []);

  const booksRead = useMemo(() => {
    return mockData.filter((it) => it.reading.status === ReadingStatus.READ);
  }, []);

  const navigation = useNavigation();

  const goToDetail = (book: Book) => {
    //@ts-ignore
    navigation.navigate("Stack", {
      screen: DETAIL_SCREEN,
      params: { ...book },
    });
  };

  const renderBooks: ListRenderItem<Book> = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => goToDetail(item)}>
      <View>
        <BookCover image={item.image} />
      </View>
    </TouchableWithoutFeedback>
  );
  const bookKeyExtractor = (item: Book) => item.isbn;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <ReadingContainer>
        <SectionTitle>
          Currently Reading
          <MaterialCommunityIcons
            name="book-open-page-variant-outline"
            size={24}
            color="black"
          />
        </SectionTitle>
        <FlatList
          data={booksReading}
          horizontal
          keyExtractor={bookKeyExtractor}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <BookCard key={item.isbn} book={item} />}
        />
      </ReadingContainer>
      <Container>
        <SectionTitle>Wish List</SectionTitle>
        <Row>
          <RegisterBook
            onPress={() => navigate("Stack", { screen: SEARCH_SCREEN })}
          >
            <AntDesign name="plus" size={24} color={DARK_BLUE} />
          </RegisterBook>
          <FlatList
            data={booksToRead}
            horizontal
            keyExtractor={bookKeyExtractor}
            ItemSeparatorComponent={Seperator}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, paddingTop: 34 }}
            renderItem={renderBooks}
          />
        </Row>
      </Container>
      <Container>
        <SectionTitle>Finished Books</SectionTitle>
        <FlatList
          data={booksRead}
          horizontal
          keyExtractor={bookKeyExtractor}
          ItemSeparatorComponent={Seperator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 34 }}
          renderItem={renderBooks}
        />
      </Container>
    </Container>
  );
};
export default Bookshelf;

const ReadingContainer = styled(Container)`
  flex: 2;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RegisterBook = styled.TouchableOpacity`
  width: 60px;
  height: 88px;
  border: 2px solid ${LIGHT_GREY};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 34px 10px 0 24px;
`;

const Seperator = styled.View`
  width: 10px;
`;
