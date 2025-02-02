import React from 'react';
import styled from 'styled-components';
import Header from '../../asset/component/Header';

const Container = styled.div`
  background-color: #151515;
  color: white;
  width: 75%;
  margin: 0 auto;
  font-family: 'SUIT', sans-serif;
`;

const Title = styled.div`
  margin-top: clamp(4rem, 8vw, 8rem);
  font-size: clamp(2.5rem, 5vw, 5rem);
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

const ContentContainer = styled.div`
  display:flex;
  width: 100%;
  margin: 2rem 0;
  flex-direction: column;
`

const Image = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
`

const Text = styled.div`
  display: flex;
  font-size: clamp(18px, 1.5vw, 24px);
  font-family: 'SUIT', sans-serif;
  color: white;
  font-weight: 400;
  line-height: 30px;
`

const AnnouncementDetail = () => {
    return (
        <>
        <Header headerName = "" isMain = {false}/>
        <Container>
        <Title>
          프로젝트 디자이너 구합니다
        </Title>
        <Detail>
          <DetailBox>
            <TempImage/>
            <div>홍길동</div>
            <div>24.08.08</div>
          </DetailBox>
        </Detail>
        <ContentContainer>
            <Image src = "https://s-lol-web.op.gg/images/home/character-tft.png?v=1736426255" />
            <Text>
            ‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다. ‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.‘단잠 DANJAM’은 코리빙 이웃들과 지속적인 교류를 지원해 청년들의 외로움 해결과 사회적 유대감을 쌓아 서로가 ‘단잠’을 이룰 수 있도록 하는 모바일 앱 서비스입니다.
            </Text>
        </ContentContainer>
        </Container>
        </>
    );
};

export default AnnouncementDetail;
