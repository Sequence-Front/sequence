import React from 'react';
import styled from 'styled-components';
import { Archive } from '../types/archive';
import { useNavigate } from 'react-router-dom';

const ItemWrapper = styled.div`
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;

const ImageContainer = styled.div`
    position: relative;
    aspect-ratio: 1.75;
    background-color: #8b8b8b;
    overflow: hidden;

    &:hover {
        .hover-overlay {
            opacity: 1;
        }
    }
`;

const ArchiveImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ItemInfo = styled.div`
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    margin: 0;
`;

const Date = styled.span`
    color: #666;
    font-size: 1rem;
`;

const UserTempImage = styled.div`
    background-color: #919191;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const HoverOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(227, 41, 41, 0.9);
    color: #212121;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
`;

const OverlayTitle = styled.div`
    font-size: clamp(1rem, 2vw, 3rem);
    font-weight: bold;
    margin-bottom: 8px;
`;

const StatusContainer = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StatText = styled.div`
    font-size: 1rem;
`;

interface ArchiveItemProps {
    id: number;
    item: Archive;
}

const ArchiveItem = ({ id, item }: ArchiveItemProps) => {
    const navigate = useNavigate();

    // 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        // const date = new Date(dateString) as unknown as Date;
        // return date.toLocaleDateString('ko-KR');
    };

    const handleItemClick = (itemId: number) => {
        navigate(`/archive/${itemId}`);
    }

    return (
        <ItemWrapper onClick={() => handleItemClick(item.id)}>
            <ImageContainer>
                <ArchiveImage src={item.thumbnail} alt={`Archive ${id}`} />
                <HoverOverlay className="hover-overlay">
                    <OverlayTitle>{item.title}</OverlayTitle>
                    <StatusContainer>
                        <StatItem>
                            <StatText>댓글</StatText>
                            <StatText>{item.commentCount}</StatText>
                        </StatItem>
                        <StatItem>
                            <StatText>북마크</StatText>
                            <StatText>{item.bookmarkCount}</StatText>
                        </StatItem>
                        <StatItem>
                            <StatText>조회</StatText>
                            <StatText>{item.view}</StatText>
                        </StatItem>
                    </StatusContainer>
                </HoverOverlay>
            </ImageContainer>
            <ItemInfo>
                <UserInfo>
                    <UserTempImage />
                    <Title>{item.title}</Title>
                </UserInfo>
                {/* <Date>{formatDate(item.createdDateTime)}</Date> */}
            </ItemInfo>
        </ItemWrapper>
    );
};

export default ArchiveItem; 