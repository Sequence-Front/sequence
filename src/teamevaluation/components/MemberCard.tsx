import React from 'react';
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import EvaluationForm from './EvaluationForm';

const Card = styled.div`
  border-radius: 8px;
  padding: 20px;
  
  &.expanded {
    background: transparent;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background: #1E1E1E;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MemberName = styled.span`
  color: white;
  font-size: 16px;
`;

const MemberRole = styled.span`
  color: #ffffff;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #ffffff;
`;

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
  };
  isSelected: boolean;
  evaluation: {
    period: string;
    comment: string;
    keywords: string[];
  };
  onSelect: (id: number) => void;
  onEvaluationChange: (memberId: number, field: string, value: any) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isSelected,
  evaluation,
  onSelect,
  onEvaluationChange
}) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className={isSelected ? 'expanded' : ''}
      onClick={() => onSelect(member.id)}
    >
      <MemberInfo>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <ProfileImage src={member.image} alt={member.name} />
          <MemberName>{member.name}</MemberName>
          <MemberRole>{member.role}</MemberRole>
        </div>
        <div>
          <IoIosArrowDown style={{fontSize: '40px', color: '#E32929'}}/>
        </div>
      </MemberInfo>
      
      {isSelected && (
        <EvaluationForm
          memberId={member.id}
          evaluation={evaluation}
          onChange={onEvaluationChange}
          onClick={handleContentClick}
        />
      )}
    </Card>
  );
};

export default MemberCard; 