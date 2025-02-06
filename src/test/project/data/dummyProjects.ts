export interface Project {
  id: number;
  title: string;
  author: string;
  date: string;
  tags: string[];
  type: string[];
}

export const dummyProjects: Project[] = [
  {
    id: 1,
    title: "AI 기반 학습 관리 시스템 개발",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "대외활동"],
    type: ["개발", "UI/UX Design"]
  },
  {
    id: 2,
    title: "친환경 쇼핑몰 UI/UX 디자인",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "경험"],
    type: ["UI/UX Design", "기획"]
  },
  {
    id: 3,
    title: "스마트 도시 쓰레기 관리 시스템11111111111111111111111111111111",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "대회"],
    type: ["기획"]
  },
  {
    id: 4,
    title: "실시간 수어 번역 애플리케이션",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "경험"],
    type: ["개발"]
  },
  {
    id: 5,
    title: "메타버스 독서실 서비스 디자인2222222222222222222222222222222222222222222222222222222222222222222",
    author: "홍길동",
    date: "24.08.08",
    tags: ["스터디", "창업"],
    type: ["UI/UX Design"]
  },
  {
    id: 6,
    title: "블록체인 기반 기부 플랫폼",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "창업"],
    type: ["개발"]
  },
  {
    id: 7,
    title: "IoT 스마트팜 모니터링 시스템",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "경험"],
    type: ["개발"]
  },
  {
    id: 8,
    title: "반려동물 케어 서비스 기획",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "스터디"],
    type: ["기획"]
  },
  {
    id: 9,
    title: "AR 기반 실내 네비게이션",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "경험"],
    type: ["개발"]
  },
  {
    id: 10,
    title: "디지털 치매 예방 앱 디자인",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "스터디"],
    type: ["UI/UX Design"]
  },
  {
    id: 11,
    title: "음식물 쓰레기 저감 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "대회"],
    type: ["기획"]
  },
  {
    id: 12,
    title: "학교 동아리 매칭 플랫폼",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "스터디"],
    type: ["개발"]
  },
  {
    id: 13,
    title: "시니어 건강관리 앱 UI 디자인",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "창업"],
    type: ["UI/UX Design"]
  },
  {
    id: 14,
    title: "실시간 버스 위치 알림 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "경험"],
    type: ["개발"]
  },
  {
    id: 15,
    title: "중고 의류 거래 플랫폼",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "스터디"],
    type: ["기획"]
  },
  {
    id: 16,
    title: "AI 작곡 서비스 개발",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "대회"],
    type: ["개발"]
  },
  {
    id: 17,
    title: "스마트 주차 시스템 디자인",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "창업"],
    type: ["UI/UX Design"]
  },
  {
    id: 18,
    title: "로컬 맛집 추천 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["스터디", "대외활동"],
    type: ["기획"]
  },
  {
    id: 19,
    title: "VR 기반 부동산 투어",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "창업"],
    type: ["개발"]
  },
  {
    id: 20,
    title: "독거노인 돌봄 로봇 UI",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "스터디"],
    type: ["UI/UX Design"]
  },
  {
    id: 21,
    title: "캠퍼스 미니맵 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "경험"],
    type: ["개발"]
  },
  {
    id: 22,
    title: "친환경 배달 패키징 기획",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "대회"],
    type: ["기획"]
  },
  {
    id: 23,
    title: "NFT 아트 마켓플레이스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["스터디", "창업"],
    type: ["개발"]
  },
  {
    id: 24,
    title: "운동 자세 교정 AI 앱",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "경험"],
    type: ["개발"]
  },
  {
    id: 25,
    title: "도시농업 커뮤니티 플랫폼",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "스터디"],
    type: ["기획"]
  },
  {
    id: 26,
    title: "전기차 충전소 찾기 앱",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "대외활동"],
    type: ["개발"]
  },
  {
    id: 27,
    title: "온라인 독서토론 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "스터디"],
    type: ["UI/UX Design"]
  },
  {
    id: 28,
    title: "반려식물 관리 IoT 시스템",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "대회"],
    type: ["개발"]
  },
  {
    id: 29,
    title: "대학생 멘토링 매칭 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "스터디"],
    type: ["기획"]
  },
  {
    id: 30,
    title: "음악 취향 분석 플레이리스트",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "창업"],
    type: ["개발"]
  },
  {
    id: 31,
    title: "실시간 통역 채팅 앱",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대회", "스터디"],
    type: ["개발"]
  },
  {
    id: 32,
    title: "제로웨이스트 샵 지도",
    author: "홍길동",
    date: "24.08.08",
    tags: ["창업", "경험"],
    type: ["UI/UX Design"]
  },
  {
    id: 33,
    title: "스마트 홈 제어 시스템",
    author: "홍길동",
    date: "24.08.08",
    tags: ["대외활동", "대회"],
    type: ["개발"]
  },
  {
    id: 34,
    title: "청년 창업 지원 플랫폼",
    author: "홍길동",
    date: "24.08.08",
    tags: ["스터디", "창업"],
    type: ["기획"]
  },
  {
    id: 35,
    title: "디지털 방명록 서비스",
    author: "홍길동",
    date: "24.08.08",
    tags: ["경험", "대외활동"],
    type: ["UI/UX Design"]
  }
]; 