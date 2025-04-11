//11-19 21:11 준용작성
//팀원의 평가 모음집
//필요 API: 바형태의 평가( label , value, profile(), content(평가종류)) // 팀원이 작성한 평가내용(name, afiliation, time, img)

import React, { useState } from "react";
import styled from "styled-components";
import {
  MemberSummaryComponent,
  GrayBar,
  DataItem,
} from "../component/MemberSummaryComponent";
import MemberEvaluationPost from "../component/MemberEvaluationPost";

const dummyData: DataItem[] = [
  {
    content: "시간 약속을 잘 지켜요",
    count: 24,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    content: "배려심이 넘쳐요",
    count: 12,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    content: "꾸준히 모임에 참석해요",
    count: 8,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    content: "연락에 답장이 빠른 편이에요",
    count: 3,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    content: "친절하게 대화해요",
    count: 18,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    content: "친절하게 대화해요",
    count: 17,
    profile:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
];

const dummyData2 = [
  {
    name: "홍영주",
    affiliation: "홍익대학교 (세종) 디자인컨버전스학부 4학년 휴학",
    content:
      "이번프로젝트에서 보여준 리더십이 인상적이었어요. 덕분에 모두가 더 나은 결과를 낼 수 있었어요!",
    time: "1년 이상",
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    name: "정준용",
    affiliation: "고려대학교 컴퓨터공학과 3학년",
    content:
      "당신의 문제 해결 능력 덕분에 프로젝트가 순조롭게 진행될 수 있었어요. 정말 고마워요!",
    time: "6개월",
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
  {
    name: "박승균",
    affiliation: "연세대학교 경제학부 4학년",
    content:
      "프로젝트에서 보여준 꼼꼼함이 인상적이었어요. 덕분에 작은 실수도 놓치지 않았습니다.",
    time: "8개월",
    img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTdfNDEg%2FMDAxNjk3NTMxNTE5Njcw.52ZDcQKpBi8e9PdPSVni4bjTVYQLm4AdYVsPDpOSLdMg.lcmpUTkXHo6cGqgoREhzlLoQkUGd5IN9o9B6Z_zHwyUg.PNG.gustn5883%2F2487135674_baby_cat%252C_cute_face%252C_Cat%2527s_feet.png&type=a340",
  },
];

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: clamp(3rem, 5vw, 5rem);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(1rem, 2vw, 1.5rem);
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-top: clamp(0.5rem, 1vw, 1rem);
  gap: clamp(1rem, 2.5vw, 2rem);
  padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem);
  background-color: transparent;
  color: #ff0000;
  border: 2px solid #ff0000;
  font-size: clamp(1rem, 1.2vw, 1.8rem);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
    color: #fff;
  }
`;

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TagButtonContainer = styled.div`
  display: flex;
  gap: clamp(0.5rem, 1vw, 1rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
`;

const TagButton = styled.div`
  display: flex;
  padding: clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.8rem, 1.5vw, 1rem);
  border: 0.5px solid #d9d9d9;
  background-color: none;
  color: #d9d9d9;
  border-radius: 20px;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  cursor: pointer;
`;

interface evaluationData {
  evaluationData: {
    myPageEvaluation: {
      keywords: Array<{
        content: string;
        count: number;
      }>;
      feedbacks: Array<{
        content: string;
        duration: string;
      }>;
    };
  };
}

const MemberEvaluation: React.FC<evaluationData> = (evaluationData) => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll((prev) => !prev);
  };

  const dataToUse =
    evaluationData?.evaluationData?.myPageEvaluation?.keywords || dummyData;
  const sortedData = [...dataToUse].sort((a, b) => b.count - a.count);
  const displayedData = showAll ? sortedData : sortedData.slice(0, 4);
  const maxValue = Math.max(...sortedData.map((item) => item.count)) * 1.2;

  return (
    <>
      <SummaryContainer>
        {evaluationData.evaluationData.myPageEvaluation.keywords.map(
          (item, index) => (
            <MemberSummaryComponent
              key={index}
              item={item}
              maxValue={maxValue}
            />
          )
        )}
        {}
        {evaluationData.evaluationData.myPageEvaluation.keywords.length > 4 && (
          <>
            {!showAll && <GrayBar />}
            <ButtonWrapper>
              <Button onClick={handleToggle}>
                {showAll ? "접기" : "더보기"} <div>→</div>
              </Button>
            </ButtonWrapper>
          </>
        )}
        {evaluationData.evaluationData.myPageEvaluation.keywords.length ===
          0 && <h1>팀원평가가 존재하지 않습니다.</h1>}
      </SummaryContainer>
      <PostContainer>
        <TagButtonContainer>
          {/* <TagButton>참여도</TagButton>
          <TagButton>시간개념..?</TagButton>
          <TagButton>커뮤니케이션</TagButton> */}
        </TagButtonContainer>
        {evaluationData.evaluationData.myPageEvaluation.feedbacks.map(
          (item, index) => (
            <MemberEvaluationPost key={index} member={item} />
          )
        )}
      </PostContainer>
    </>
  );
};

export default MemberEvaluation;
