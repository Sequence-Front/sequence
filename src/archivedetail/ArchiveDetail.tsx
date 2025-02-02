import React, {useState} from 'react';
import styled from 'styled-components';
import { projectData } from './data/projectData';
import Header from '../asset/component/Header';
import { LuPen } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { PiSirenLight } from "react-icons/pi";
import ProfileSection from './components/ProfileSection';
import CommentSection from './components/CommentSection';

const Wrapper = styled.div`
`

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 75%;
  margin: 0 auto;
  font-family: 'SUIT', sans-serif;
`;

const PhotoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

const TitleSection = styled.div`
  margin: 4rem auto;
  width: 75%;
  display: flex;
  flex-direction: column;
`

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: clamp(1.8rem, 4.3vw, 5rem);
`

const Title = styled.div`
  font-size: clamp(2.5rem, 5vw, 5rem);
`

const MetaTitle = styled.div`
  display: flex;
  font-family: "SUIT";
  font-weight: 500;
  margin-bottom: clamp(15px, 1.5vw, 26px);
  font-size: clamp(1rem, 1vw, 20px);
`

const MetadataContainer = styled.div`
  display: flex;
  width: 30%;
  margin-right: clamp(1rem, 2vw, 2rem);
  flex-direction: column;
  box-sizing: border-box;
`
const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: clamp(5rem, 5vw, 10rem);
  
`

const ProjectContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  box-sizing: border-box;
  gap: clamp(8px, 1vw, 1rem);
`

const Text = styled.div`
  display: flex;
  width: 100%;
  font-size: clamp(12px, 1.1vw, 20px);
  color: white;
  background: #151515;
  color: white;
`

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  color: #BDBDBD;
  margin-top: 2rem;
`

const DetailBox =styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const TempImage = styled.div`
  background-color: grey;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

 const IconContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
 `

const TagContainer= styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SkillTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  background-color: none;
  color: white;
  border: 1px solid white;
  font-size: clamp(8px, 1vw, 16px);
  border-radius: 20px;
  font-weight: 600;
`
const MemberRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #212121;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div<{ src: string }>`
  width: clamp(15px, 1.7vw, 30px);
  height: clamp(15px, 1.7vw, 30px);
  border-radius: 50%;
  background-color: white;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const UserName = styled.div`
  margin-right: 10px;
  font-size: clamp(12px, 1.5vw,24px);
  color: white;
`;

const RoleTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  font-size: clamp(8px, 1vw, 16px);
  color: white;
  border: 1px solid white;
  border-radius: 15px;
  white-space: nowrap;
`;

const ProjectDetailPage = () => {
    const [skills] = useState<string[]>([
      "Adobe Illustration",
      "Adobe Photoshop",
    ]);

    const [fields] = useState<string[]>([
        "공모전"
    ]);
    
    const [userList] = useState([
        { id: 1, name: "홍길동", role: "PM", profile: "" },
        { id: 2, name: "홍길동", role: "Front-end", profile: "" },
        { id: 3, name: "정준용", role: "Back-end", profile: "" },
    ]);

    const [images] = useState<string[]>([
        "https://s-lol-web.op.gg/images/home/character-tft.png?v=1736426255",
        "https://meta-static.op.gg/logo/image/60104d0e9375e4281c55ae98e22626e6.png?image=q_auto:good,f_webp,h_448&v=1736426255"

    ])
  return (
    <Wrapper>
      <Header headerName = "" isMain = {false}/>
      <TitleSection>
        <IconContainer>
          <FaRegBookmark size={30} style={{color: "#E32929"}}/>
          <PiSirenLight size={30} style={{color: "#E32929"}}/>
          <LuPen size={30} style={{color: "#E32929"}}/>
        </IconContainer>
        <Title>
          프로젝트 디자이너 구합니다
        </Title>
        <Detail>
          <DetailBox>
            <TempImage/>
            <div>홍길동</div>
            <div>24.08.08</div>
          </DetailBox>
          <DetailBox>
            <div>Comment 2</div>
            <div>북마크 4</div>
            <div>조회 10</div>
          </DetailBox>
        </Detail>
      </TitleSection>
      <Container>
        <ContentContainer>
        <MetadataContainer>
        <ComponentContainer>
            <MetaTitle>기간</MetaTitle> 
            <Text>
                2024.03.00 ~ 2024.11.01
            </Text>
        </ComponentContainer>
        <ComponentContainer>
            <MetaTitle>분야</MetaTitle> 
            <TagContainer>
            {fields.map((field) => (
              <SkillTag
                key={field}
              >
                {field}
              </SkillTag>
            ))}
            </TagContainer>
        </ComponentContainer>
        <ComponentContainer>
            <MetaTitle>프로젝트 소개</MetaTitle> 
            <Text>
            ‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.
            </Text>
        </ComponentContainer>
        <ComponentContainer>
            <MetaTitle>멤버</MetaTitle> 
            {userList.map((user) => (
            <MemberRow key={user.id}>
              <MemberInfo>
                <ProfileImage src={user.profile} />
                <UserName>{user.name}</UserName>
                <RoleTag>{user.role}</RoleTag>
              </MemberInfo>
            </MemberRow>
          ))}
        </ComponentContainer>
        <ComponentContainer>
            <MetaTitle>활용 스킬</MetaTitle> 
            <TagContainer>
            {skills.map((skill) => (
              <SkillTag
                key={skill}
              >
                {skill}
              </SkillTag>
            ))}
            </TagContainer>
        </ComponentContainer>
        <ComponentContainer>
            <MetaTitle>링크</MetaTitle> 
            <Text>
                <a 
                    href="https://www.behance.net/gallery/208114721/BuziTrip-Business-travel-UIUX-logo-UI?tracking_source=for_you_logged_in_feed_recommended" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        color: "white", 
                        textDecoration: "underline",
                        display: "block", 
                        wordBreak: "break-all"
                    }}
                >
                    https://www.behance.net/gallery/208114721/BuziTrip-Business-travel-UIUX-logo-UI?tracking_source=for_you_logged_in_feed_recommended
                </a>
            </Text>
        </ComponentContainer>
        </MetadataContainer>
        <ProjectContainer>
        <PhotoContainer>
          {images.map((image) => (
            <Image key={image} src={image} alt="프로젝트 이미지" />
          ))}
            </PhotoContainer>
        </ProjectContainer>
        </ContentContainer>
        <ProfileSection profileData={projectData.profile}/>
        <CommentSection />
      </Container>
    </Wrapper>
  );
};

export default ProjectDetailPage;
