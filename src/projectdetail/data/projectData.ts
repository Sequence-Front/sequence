export interface ProjectData {
  project: {
    title: string;
    period: string;
    category: string[];
    description: string;
  };
  recruitment: {
    roles: string[];
    skills: string[];
    description: string;
  };
  progress: {
    meeting: string[];
    stage: string[];
    reference: string;
  };
  profile: {
    name: string[];
    role: string[];
    userImage: string[];
  }
}

export const projectData: ProjectData = {
  project: {
    title: "무슨무슨 프로젝트",
    period: "2024. 03 ~ 2024. 08",
    category: ["스터디"],
    description: "2024년, 트레이더스를 통해 외국어 실력향상과 외국인과의 문화 및 언어 교류, 다양한 문화교류를 경험해보실 트레이더스 2기를 모집합니다!! ✔️트레이더스는, 한국의 문화와 가치를 알리기 위해 외국 대학생에게 서울 투어 가이드 활동을 진행합니다. ✔️대학생 자체적으로 운영되며, 부운영진은 투표로 선출되며 이후 참림 기수부터 함께한 운영진으로 구성된 연합동아리 입니다. ✔️외국인 친구를 사귀고 싶은 사람 모두 모여라👋👋👋"
  },
  recruitment: {
    roles: ["Back-end", "UX/UI Design"],
    skills: ["Figma", "Adobe Illustration"],
    description: "💬모집대상- 서울권 대학 재학생 또는 휴학생, 외국인 교환학생, 어학당 다니는 외국학생, 워홀 경험자 및 준비자, - 외국어를 공부해야겠다 한 번이라도 생각해봤거나 연례가 한 번 해보고 싶었던 사람- 외국인 친구 사귀고 싶은 사람~~ 월 2회 이상 활동가능한 자, 시험기간에는 활동하지 않으며 결석은 4회까지 인정 (무단결석 5회 이상은 활동불가)"
  },
  progress: {
    meeting: ["온라인"],
    stage: ["기획중"],
    reference: "www.thisislinkreference.com"
  },
  profile: {
    name: ["홍길동", "김철수", "이영희", "박영수", "최영희", "정영수"],
    role: ["백엔드 개발자", "프론트엔드 개발자", "디자이너", "프로젝트 매니저", "프로젝트 매니저", "프로젝트 매니저"],
    userImage: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"]
  }
}; 