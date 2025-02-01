export interface Announcement {
  id: number;
  title: string;
  author: string;
  date: string;
  type: string[];
  image?: string;
}

export const dummyAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "2024년 IT 공모전 일정 업데이트 안내",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"],
    image: "https://s-lol-web.op.gg/images/home/character-lol.png?v=1736426255"
  },
  {
    id: 2,
    title: "2023 SW융합클러스터 2.0 해커톤 대상, 우수상 수상!",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"]
  },
  {
    id: 3,
    title: "IT 스타트업 경진대회 본선 진출 팀 소개",
    author: "홍길동",
    date: "24.08.08",
    type: ["대회"],
    image: "https://s-lol-web.op.gg/images/home/character-tft.png?v=1736426255"
  },
  {
    id: 4,
    title: "[회원 소식] 팀 프로젝트로 1억 투자 유치 성공!",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"]
  },
  {
    id: 5,
    title: "2025 신년 맞이 IT 지원 사업 안내",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"],
    image: "https://meta-static.op.gg/logo/image/60104d0e9375e4281c55ae98e22626e6.png?image=q_auto:good,f_webp,h_448&v=1736426255"
  },
  {
    id: 6,
    title: "2025년 팀원 평가 작성 유의사항",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"]
  },
  {
    id: 7,
    title: "우리 팀, 2024 스타트업 해커톤에서 최우수상 수상!",
    author: "홍길동",
    date: "24.08.08",
    type: ["대회"],
    image: "https://opgg-com-image.akamaized.net/attach/images/20250201080622.0.150992.jpg"
  },
  {
    id: 8,
    title: "서비스 출시 소식: [프로젝트명], 드디어 세상에 나오다!",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"]
  },
  {
    id: 9,
    title: "2023년 개발자 커뮤니티 대회 최종 진출 성공!",
    author: "홍길동",
    date: "24.08.08",
    type: ["대회"],
    image: "https://opgg-com-image.akamaized.net/attach/images/20250201080611.0.150992.jpg"
  },
  {
    id: 10,
    title: "[이벤트] 함께한 팀원 평가하고 상품 받아가세요!",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"]
  },
  {
    id: 11,
    title: "우리 서비스, IT 커뮤니티 대회 본선 진출!",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"],
    image: "/dummy-image6.jpg"
  },
  {
    id: 12,
    title: "2024 스타트업 해커톤에서 최우수상 수상!",
    author: "홍길동",
    date: "24.08.08",
    type: ["대회"]
  },
  {
    id: 13,
    title: "서비스 업데이트 안내: 새로운 기능이 추가됩니다",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"],
    image: "/dummy-image7.jpg"
  },
  {
    id: 14,
    title: "2023년 하반기 프로젝트 성과 발표",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"]
  },
  {
    id: 15,
    title: "신규 멤버 모집 안내: UX/UI 디자이너",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"],
    image: "/dummy-image8.jpg"
  },
  {
    id: 16,
    title: "프로젝트 중간 발표회 일정 안내",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"]
  },
  {
    id: 17,
    title: "2024년 상반기 프로젝트 계획 발표",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"],
    image: "/dummy-image9.jpg"
  },
  {
    id: 18,
    title: "개발자 채용 설명회 개최 안내",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"]
  },
  {
    id: 19,
    title: "신규 서비스 베타 테스터 모집",
    author: "홍길동",
    date: "24.08.08",
    type: ["공지사항"],
    image: "/dummy-image10.jpg"
  },
  {
    id: 20,
    title: "2024년 개발자 컨퍼런스 참가 후기",
    author: "홍길동",
    date: "24.08.08",
    type: ["소식"]
  }
]; 