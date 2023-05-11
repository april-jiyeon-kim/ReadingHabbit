import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
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
    pubdate: "20230418",
    publisher: "다산북스",
    title: "New 대한민국 청약지도 (한 권으로 끝내는 청약 당첨 전략의 모든 것)",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.READING,
  },
  {
    author: "정지영",
    description:
      "“부디 딱 1년만 청약하라!” 바로 지금이 가점 없는 우리가 7년간 기다려온 ‘당첨의 봄날’이다! 가점이 낮아도, 세대주가 아니라도, 중도금이 없어도 반드시 새 아파트 주인이 되는 아임해피의 청약 일타 강의 “추첨제 부활! 사상 최대 특별공급 확대! 중도금 대출 완화! 당신이 알던 ‘청약’의 모든 것이 달라졌다” _모든 규제가 사라진 대한민국 청약시장의 미래 “여러분이 생각하는 청약은 어떤 모습인가요? 60점이 넘는 고가점자가 수두룩해서 20~30대는 감히 엄두도 못 낼 것 같나요? 한평생 무주택자도 당첨되 기가 힘들다던데 하물며 1주택자에게 청약으로 갈아타기란 꿈도 못 꿀 일일까요? 다주택자에게는 언감생심 넘볼 수도 없다고요? 그런 여러분에게 2023 년 청약이 얼마나 새로워졌는지를 이야기해 주고 싶어 지금 이 책을 쓰게 되었습니다.” 대한민국 부동산계의 여성 리더로서 해마다 가장 저렴하게 내 집 장만하는 방법을 알려주며 ‘무주택자들의 어머니’라 불리는 아임해피가 2023년에는 ‘ 청약’을 주제로 『NEW 대한민국 청약지도』와 함께 돌아왔다. 2019년 이미 한 차례 대한민국에 청약 열풍을 불러 일으켰던 저자는 “모든 규제가 사라진 2023년이야말로 청약으로 내 집 마련할 수 있는 최적의 시기”라고 강조한다. ‘역대급 추첨제 부활’, ‘사상 최대 특별공급 확대’, ‘중도금 대출 대폭 완화’, ‘전매제한 해제’, ‘1주택자 처분 의무 폐지’ 등등. 일일이 열거하기도 벅찰 만큼 모든 정책이 청약의 구원투수로 나선 이때, 왜 사람들은 모두가 원하고 바라는 ‘새 아파트’를, 그것도 2년 전 가격으로 저렴하게 살 수 있음에도 청약에 관심을 두고 도전하지 않는 걸까? “가점이 낮아도 추첨제로 당첨될 수 있다고, 돈이 없어도 특별공급으로 강남 입성할 수 있다고 소리 높여 외치고 있지만, 청약은 여전히 ‘로또’라는 편견에 사로잡혀 시도조차 하지 않는 분들이 많습니다. 고시 공부를 하는 것처럼 알아야 할 게 너무 많고, 복잡하고 어렵기에 외면하는 것이겠죠. 이 책 은 그런 청약을 가장 쉽게, 하룻밤에 독파할 수 있도록 완벽하게 분석한 최초의 부동산 책입니다.” 이 책의 저자는 “모르면 그냥 지나치지만, 알면 누구나 기회를 잡을 수 있는 게 청약이다”라고 강조한다. 청약 역시 ‘지피지기면 백전불태’라서, 지금 자신의 상황을 제대로 알고 완벽하게 전략을 세우면 가점이 낮아도 자신에게 맞는 새 아파트를 장만할 수 있다는 말이다. ‘2023-2024 서울·수도권 분양예정단지 리스트’는 물론, 이미 수만 명의 독자를 당첨시키며 수백만 원을 주고도 듣지 못할 ‘청약의 신’ 아임해피의 ‘청약 노하우’가 이 책 한 권에 아낌없이 담겨 있다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3943762/39437627619.20230425163911.jpg",
    isbn: "979113069906s6",
    link: "https://search.shopping.naver.com/book/catalog/39437627619",
    pubdate: "20230418",
    publisher: "다산북스",
    title: "New 대한민국 청약지도 (한 권으로 끝내는 청약 당첨 전략의 모든 것)",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.READING,
  },
  {
    author: "김종율^임은정",
    description:
      "아파트건 상가건, 가치를 결정하는 건 결국 땅값! 진짜 전문가는 ‘토지’부터 공부한다! 최고의 토지 투자 분석가 옥탑방보보스 김종율의 실전 감각, 그리고 기초를 확실하게 잡아주는 라떼비버 임은정의 꼼꼼한 설명! ★ 송사무장, 빠숑, 붇옹산, 홍춘욱, 고상철 강력 추천 ★ 자타공인 대한민국 대표 토지 강사인 김종율과 임은정이, 초보부터 고수까지 누구나 활용할 수 있는 토지 투자 마스터 교과서를 펴냈다. 바로 이 책 《나는 집 대신 땅에 투자한다》이다. 부동산 투자자라면 누구나 시장 상황과 관계없이 꾸준한 수익을 내는 투자를 원한다. 특히 정부의 정책이나 규제, 시장 상황에서 자유롭고, 이왕이면 큰 수익도 낼 수 있는 투자가 좋다. 그런 게 뭘까? 바로 토지 투자다. 사실 부자들이 자산의 폭발적인 성장, 일명 퀀텀 리프를 이루는 수단은 대부분 땅이며, 진짜 부자는 ‘땅부자’라는 건 다들 안다. 지난 몇 년간 아파트 가격이 많이 올랐다고 해도 5~10배까지는 오르지 않았다. 하지만 땅은 개발호재가 있고 사고파는 타이밍을 잘 잡으면 5~10배는 거뜬히 오른다. 그럼에 도 왜 쉽게 투자를 하지 못할까? 토지 투자는 너무 어렵고 종잣돈도 많이 필요할 것 같아서다. 게다가 수익이 나기까지 오래 걸릴 것이라고들 생각한다. 사실일까? 이 책의 저자들은 이 선입견부터 깰 필요가 있다고 말한다. 그리고 아무것도 모르는 ‘부린이’도 바로 시작할 만큼 쉬운 일은 아니지만, 누구나 일정한 공부만 한다면 토지 투자에서 단기간에 기대 이상의 수익을 얻을 수 있다고 단언한다. 이 책은 토지 분야 최고 강사이자 성공한 투자자로도 명성이 높은 김종율 저자와, 토지 투자에 어려움을 겪는 초보자들을 위해 다양한 커뮤니티에서 강의를 해온 임은정 저자가 함께 썼다. 이론가일 뿐만 아니라 실전을 겸비한 투자자로도 잘 알려진 김종율 저자는 한 번 배워 평생 써먹을 수 있는 강력 한 투자 스킬들에 대해 주로 말하되, 그 어느 책에서도 볼 수 없는 성공 사례들을 상당수 공개했다. 준공업지역이나 개발제한구역 투자 등 투자자들이 라면 관심을 가질 만한 지역의 투자 성공 사례부터 아파트 갭 투자 금액 정도의 소액으로 수익을 남긴 투자 사례까지, 이 분야에 대해 한 번이라도 공 부를 해본 사람이라면 놀랄 만한 사례들이 가득하다. 그리고 임은정 저자는 초보 투자자이 어려워하는 공법부터 경공매 투자까지, 누구나 편하게 접근할 수 있도록 가장 쉬운 설명으로 이야기를 풀었다. 그리하여 이 책은 김종율의 실전 투자 감각에 임은정 강사의 친절한 이론 설명까지 보태어진, 그야말로 기초부터 응용까지 두루 섭렵할 수 있는 토지 투자의 바이블이라 할 만하다.",
    discount: "18000",
    image:
      "https://shopping-phinf.pstatic.net/main_3897638/38976388620.20230411162713.jpg",
    isbn: "9788947548885",
    link: "https://search.shopping.naver.com/book/catalog/38976388620",
    pubdate: "20230330",
    publisher: "한국경 제신문",
    title:
      "나는 집 대신 땅에 투자한다 (딱 1년 공부하고 평생 써먹는 토지 투자 공식)",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "9791186152331",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911861523316",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911861523317",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911861523318",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911861523319",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911186152331",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.TO_READ,
  },
  {
    author: "쇼킹부동산",
    description:
      "이 책은 부동산 투자의 손실을 최소화하고 이익을 극대화하는 투자의 천기누설을 모두 수록하였습니다. 부동산으로 부자가 되는 과정에서 반드시 알아야 하는 제도, 규제, 세금을 총정리했습니다.",
    discount: "17100",
    image:
      "https://shopping-phinf.pstatic.net/main_3945461/39454617637.20230509164916.jpg",
    isbn: "97911861523312",
    link: "https://search.shopping.naver.com/book/catalog/39454617637",
    pubdate: "20230420",
    publisher: "SG연구소",
    title: "부자들의 부동산 노트",
    startDate: `2023.05.01`,
    genres: ["Economic History", "Real Estate"],
    totalPages: 300,
    currentPage: 240,
    isFavorite: false,
    isWishList: false,
    status: ReadingStatus.READ,
  },
];

const Bookshelf: React.FC<NativeStackScreenProps<any, "Bookshelf">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(false);

  const booksReading = useMemo(() => {
    return mockData.filter((it) => it.status === ReadingStatus.READING);
  }, []);

  const booksToRead = useMemo(() => {
    return mockData.filter((it) => it.status === ReadingStatus.TO_READ);
  }, []);

  const booksRead = useMemo(() => {
    return mockData.filter((it) => it.status === ReadingStatus.READ);
  }, []);

  const renderBooks: ListRenderItem<Book> = ({ item }) => (
    <BookCover image={item.image} />
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
            onPress={() => navigate("Stack", { screen: "Register" })}
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
