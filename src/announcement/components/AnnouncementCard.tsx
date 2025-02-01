import React from 'react';
import styled from 'styled-components';
import { Announcement } from '../data/dummyAnnouncements';


const TypeTag = styled.span`
  background: transparent;
  border: 1px solid #FFFFFF;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
`;

const TypeTagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Title = styled.div`
  margin: 0;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  color: white;
  margin-bottom: 16px;
  line-height: 1.4;
  word-break: break-all;
  transition: color 0.2s ease-in-out;
`;

const Card = styled.div`
  padding: 20px 0;
  cursor: pointer;
  border-top: 1px solid #616161;
  border-bottom: 1px solid #616161;
  
  &:hover {
    ${Title} {
      color: #E32929;
    }
    
    ${TypeTag} {
      background: #E32929;
      border-color: #E32929;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #888;
  font-size: clamp(1rem, 1.3vw, 1.5rem);
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: clamp(24px, 2vw, 30px);
  height: clamp(24px, 2vw, 30px);
  border-radius: 50%;
  background: #333;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface AnnouncementCardProps {
  announcement: Announcement;
  searchTerm: string;
}

const HighlightedText = styled.span`
  color: #E32929;
`;

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, searchTerm }) => {
  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <HighlightedText key={index}>{part}</HighlightedText> : part
    );
  };

  return (
    <Card>
      <TypeTagsContainer>
        {announcement.type.map((t, index) => (
          <TypeTag key={index}>{t}</TypeTag>
        ))}
      </TypeTagsContainer>
      <Title>{highlightText(announcement.title)}</Title>
      {announcement.image && <Image src={announcement.image} alt={announcement.title} />}
      <MetaInfo>
        <AuthorInfo>
          <AuthorAvatar>
            {/*이미지 추가*/}
          </AuthorAvatar>
          <span>{highlightText(announcement.author)}</span>
        </AuthorInfo>
        <span>{announcement.date}</span>
      </MetaInfo>
    </Card>
  );
};

export default AnnouncementCard; 