import React from 'react';
import styled from 'styled-components';

const KeywordSection = styled.div`
  margin-top: 20px;
`;

const KeywordTitle = styled.div`
  color: white;
  margin-bottom: 15px;
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Keyword = styled.button<{ isSelected: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid ${props => props.isSelected ? '#E32929' : '#FFFFFF'};
  background: ${props => props.isSelected ? '#E32929' : 'transparent'};
  color: ${props => props.isSelected ? '#212121' : '#FFFFFF'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  white-space: nowrap;
`;

interface KeywordSelectorProps {
  memberId: number;
  selectedKeywords: string[];
  onChange: (memberId: number, field: string, value: string[]) => void;
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  memberId,
  selectedKeywords,
  onChange
}) => {
    const keywords = [
        '성실해요', '시간을 잘 지켜요', '리더십이 있어요', '창의적이에요', 
        '문제 해결 능력이 뛰어나요', '팀워크를 잘해요', '책임감이 있어요',
        '의사소통이 원활해요', '피드백을 잘 수용해요', '빠르게 적응해요',
        '친화력이 좋아요', '새부적인 부분까지 신경 써요', '문제 해결을 잘해요',
        '계획을 잘 세워요', '자료 조사가 철저해요', '꼼꼼해요',
        '동기를 부여해요', '일정 관리 능력이 뛰어나요', '시간 약속을 잘 지켜요',
        '목표를 잘 설정해요', '변화에 빠르게 적응해요', '다른 사람을 잘 도와줘요',
        '강점을 잘 해결해요'
      ];

  const handleKeywordClick = (keyword: string) => {
    const newKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : [...selectedKeywords, keyword];
    
    onChange(memberId, 'keywords', newKeywords);
  };

  return (
    <KeywordSection>
      <KeywordTitle>키워드 선택</KeywordTitle>
      <KeywordContainer>
        {keywords.map(keyword => (
          <Keyword
            key={keyword}
            isSelected={selectedKeywords.includes(keyword)}
            onClick={(e) => {
              e.stopPropagation();
              handleKeywordClick(keyword);
            }}
          >
            {keyword}
          </Keyword>
        ))}
      </KeywordContainer>
    </KeywordSection>
  );
};

export default KeywordSelector; 