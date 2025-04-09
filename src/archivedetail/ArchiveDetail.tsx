import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import { LuPen } from "react-icons/lu";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { PiSirenLight } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import ProfileSection from './components/ProfileSection';
import CommentSection from './components/CommentSection';
import { getArchiveDetail, deleteArchive, addBookmark } from '../api/archivedetail';


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

interface ArchiveDetail {
  id: number;
  writerNickname: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  category: string;
  thumbnail: string;
  link: string;
  skills: string[];
  imgUrls: string[];
  view: number;
  bookmarkCount: number;
  members: Array<{
    username: string;
    nickname: string;
    profileImg: string;
  }>;
  comments: any[];
  createdDateTime: string;
  modifiedDateTime: string;
  bookmarked: boolean;
}

const ArchiveDetailPage = () => {
    const { id } = useParams();
    const [archiveData, setArchiveData] = useState<ArchiveDetail | null>(null);
    const myNickname = localStorage.getItem("nickname");
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([]);
    
    const fetchArchiveDetail = async () => {
        try {
            const response = await getArchiveDetail(Number(id));
            console.log('Archive Detail Response:', response);
            setArchiveData(response.data);
            setImages(response.data.imgUrls || []); // imgUrls가 없을 경우 빈 배열
        } catch (error) {
            console.error('아카이브 상세 정보 조회 실패:', error);
        }
    };

    useEffect(() => {
        fetchArchiveDetail();
    }, [id]);

    
    if (!archiveData) return <div>로딩 중...</div>;

    const writeClick = ()=>{
      if(myNickname !== archiveData?.writerNickname){
        alert("수정 권한이 없습니다.");
        return;
      }
      navigate(`/archive/edit/${id}`);
    }
  
    const deleteClick = () => {
      deleteArchive(id);
      navigate(`/archive`);
    }
  
    const handleBookmark = async () => {
      try {
        await addBookmark(id);
        fetchArchiveDetail(); 
      } catch (error) {
        console.error('북마크 삭제 실패:', error);
      }
    }

    return (
        <Wrapper>
            <Header headerName = "" isMain = {false}/>
            <TitleSection>
                <IconContainer>
                  { archiveData?.bookmarked === false ?
                    (<FaRegBookmark onClick={handleBookmark} size={30} style={{color: "#E32929", cursor:"pointer"}}/>)
                    :
                    (<FaBookmark onClick={handleBookmark} size={30} style={{color: "#E32929", cursor:"pointer"}}/>)
                  }

                    <PiSirenLight
                      size={30}
                      title="신고"
                      style={{ color: "#E32929", cursor: "pointer" }}
                      onClick={() =>
                      navigate(`/report`, {
                        state: {
                          targetType: 'archive',
                          targetId: id
                      }})}
                    />
                  { myNickname === archiveData?.writerNickname && 
                    (
                      <>
                        <LuPen onClick={writeClick} size={30} style={{color: "#E32929", cursor:"pointer"} } title="수정하기"/>
                        <MdDelete onClick={deleteClick} size={30} style={{color: "#E32929", cursor:"pointer"}}/>
                      </>
                    )
                  }
                </IconContainer>
                <Title>
                    {archiveData.title}
                </Title>
                <Detail>
                    <DetailBox>
                        <TempImage/>
                        <div>{archiveData.writerNickname}</div>
                        <div>{new Date(archiveData.createdDateTime).toLocaleDateString()}</div>
                    </DetailBox>
                    <DetailBox>
                        <div>Comment {archiveData.comments?.length || 0}</div>
                        <div>북마크 {archiveData.bookmarkCount}</div>
                        <div>조회 {archiveData.view}</div>
                    </DetailBox>
                </Detail>
            </TitleSection>
            <Container>
                <ContentContainer>
                    <MetadataContainer>
                        <ComponentContainer>
                            <MetaTitle>기간</MetaTitle> 
                            <Text>
                                {archiveData.duration}
                            </Text>
                        </ComponentContainer>
                        <ComponentContainer>
                            <MetaTitle>분야</MetaTitle> 
                            <TagContainer>
                                {archiveData.category && (
                                    <SkillTag key={archiveData.category}>
                                        {archiveData.category}
                                    </SkillTag>
                                )}
                            </TagContainer>
                        </ComponentContainer>
                        <ComponentContainer>
                            <MetaTitle>프로젝트 소개</MetaTitle> 
                            <Text>
                                {archiveData.description}
                            </Text>
                        </ComponentContainer>
                        <ComponentContainer>
                            <MetaTitle>멤버</MetaTitle> 
                            {archiveData.members?.map((member) => (
                                <MemberRow key={member.username}>
                                    <MemberInfo>
                                        <ProfileImage src={member.profileImg} />
                                        <UserName>{member.nickname}</UserName>
                                    </MemberInfo>
                                </MemberRow>
                            ))}
                        </ComponentContainer>
                        <ComponentContainer>
                            <MetaTitle>활용 스킬</MetaTitle> 
                            <TagContainer>
                                {archiveData.skills?.map((skill) => (
                                    <SkillTag key={skill}>
                                        {skill}
                                    </SkillTag>
                                ))}
                            </TagContainer>
                        </ComponentContainer>
                        <ComponentContainer>
                            <MetaTitle>링크</MetaTitle> 
                            <Text>
                                {archiveData.link && (
                                    <a 
                                        href={archiveData.link}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{ 
                                            color: "white", 
                                            textDecoration: "underline",
                                            display: "block", 
                                            wordBreak: "break-all"
                                        }}
                                    >
                                        {archiveData.link}
                                    </a>
                                )}
                            </Text>
                        </ComponentContainer>
                    </MetadataContainer>
                    <ProjectContainer>
                        <PhotoContainer>
                            {images?.map((image) => (
                                <Image key={image} src={image} alt="프로젝트 이미지" />
                            ))}
                        </PhotoContainer>
                    </ProjectContainer>
                </ContentContainer>
                {archiveData.members && <ProfileSection profileData={archiveData.members}/>}
                <CommentSection comments={archiveData.comments} onCommentAdd={fetchArchiveDetail}/>
            </Container>
        </Wrapper>
    );
};

export default ArchiveDetailPage; 
