import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;

const ImageContainer = styled.div`
    aspect-ratio: 1.75;
    background-color: #8b8b8b;
    overflow: hidden;
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

interface ArchiveItemProps {
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    onClick: (id: number) => void;
}

const ArchiveItem = ({ id, imageUrl, title, date, onClick }: ArchiveItemProps) => {
    return (
        <ItemWrapper onClick={() => onClick(id)}>
            <ImageContainer>
                <ArchiveImage src={imageUrl} alt={`Archive ${id}`} />
            </ImageContainer>
            <ItemInfo>
                <UserInfo>
                    <UserTempImage />
                    <Title>{"홍길동"}</Title>
                </UserInfo>
                <Date>{date}</Date>
            </ItemInfo>
        </ItemWrapper>
    );
};

export default ArchiveItem; 