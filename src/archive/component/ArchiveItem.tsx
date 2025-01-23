import React from 'react';
import styled from 'styled-components';

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
    font-size: 1.1rem;
    margin: 0;
`;

const Date = styled.span`
    color: #666;
    font-size: 0.9rem;
`;

const UserTempImage = styled.div`
    background-color: #919191;
    width: 20px;
    height: 20px;
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
    font-size: clamp(0.5rem, 1.25vw, 1.8rem);
`;

interface ArchiveItemProps {
    id: number;
    item: {
        imageUrl: string;
        title: string;
        date: string;
        userImage: string;
        username: string;
        comment: number;
        view: number;
        bookmark: number;
    }
}

const ArchiveItem = ({ id, item }: ArchiveItemProps) => {
    return (
        <ItemWrapper>
            <ImageContainer>
                <ArchiveImage src={item.imageUrl} alt={`Archive ${id}`} />
                <HoverOverlay className="hover-overlay">
                    <OverlayTitle>{item.title}</OverlayTitle>
                    <StatusContainer>
                        <StatItem>
                            <StatText>comment</StatText>
                            <StatText>{item.comment}</StatText>
                        </StatItem>
                        <StatItem>
                            <StatText>북마크</StatText>
                            <StatText>{item.bookmark}</StatText>
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
                    <Title>{item.username}</Title>
                </UserInfo>
                <Date>{item.date}</Date>
            </ItemInfo>
        </ItemWrapper>
    );
};

export default ArchiveItem; 