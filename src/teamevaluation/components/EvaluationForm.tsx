import React from 'react';
import styled from 'styled-components';
import KeywordSelector from './KeywordSelector';

const EvaluationContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 40px;
  background: transparent;
`;

const EvaluationLeft = styled.div`
  flex: 1;
`;

const EvaluationRight = styled.div`
  flex: 1;
`;

const Period = styled.div`
  margin: 10px 0;
`;

const PeriodInput = styled.input`
  width: 100%;
  padding: 15px;
  background: #2C2C2C;
  border: none;
  border-radius: 8px;
  color: white;
  margin: 10px 0;
  
  &::placeholder {
    color: #757575;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  background: #2C2C2C;
  border: none;
  border-radius: 8px;
  padding: 15px;
  color: white;
  resize: none;
  margin: 10px 0;
  
  &::placeholder {
    color: #757575;
  }
`;

interface EvaluationFormProps {
  memberId: number;
  evaluation: {
    period: string;
    comment: string;
    keywords: string[];
  };
  onChange: (memberId: number, field: string, value: any) => void;
  onClick: (e: React.MouseEvent) => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  memberId,
  evaluation,
  onChange,
  onClick
}) => {
  const formatPeriodInput = (input: string): string => {
    // 숫자만 추출
    const numbers = input.replace(/\D/g, '');
    
    if (numbers.length >= 16) {
      // YYYYMMDDYYYYMMDD 형식을 YYYY.MM.DD~YYYY.MM.DD 형식으로 변환
      const firstDate = `${numbers.slice(0, 4)}.${numbers.slice(4, 6)}.${numbers.slice(6, 8)}`;
      const secondDate = `${numbers.slice(8, 12)}.${numbers.slice(12, 14)}.${numbers.slice(14, 16)}`;
      return `${firstDate}~${secondDate}`;
    }
    
    // 16자리가 안 되면 입력된 숫자만큼만 포맷팅
    let formatted = '';
    for (let i = 0; i < numbers.length && i < 16; i++) {
      if (i === 4 || i === 6) formatted += '.';
      else if (i === 8) formatted += '~';
      else if (i === 12 || i === 14) formatted += '.';
      formatted += numbers[i];
    }
    return formatted;
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPeriodInput(e.target.value);
    onChange(memberId, 'period', formattedValue);
  };

  return (
    <EvaluationContent onClick={onClick}>
      <EvaluationLeft>
        <Period>팀원 평가</Period>        
        <TextArea
          placeholder="팀원의 한줄평을 100자 이내로 작성주세요!"
          value={evaluation?.comment || ''}
          onChange={(e) => onChange(memberId, 'comment', e.target.value)}
          maxLength={100}
        />
        <div style={{ width : "93%", textAlign: 'right', color: '#757575' }}>
          {(evaluation?.comment || '').length}/100
        </div>
      </EvaluationLeft>

      <EvaluationRight>
        <KeywordSelector
          memberId={memberId}
          selectedKeywords={evaluation?.keywords || []}
          onChange={onChange}
        />
      </EvaluationRight>
    </EvaluationContent>
  );
};

export default EvaluationForm; 