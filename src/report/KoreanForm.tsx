import React, { useState, ChangeEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../asset/component/Header';
import { Result } from '../login/style/CommonStyles';
import { getReport, postReport } from '../api/report';


// 타입 정의
type FormTypeValue = 1 | 2 | 3 | 4 | 5;

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #151515;
  color: white;
  font-family: 'SUIT', sans-serif;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  width : 80%;
  margin: 0 auto;
  flex-direction: column;
`
const FormTitle = styled.h1`
  text-align: center;
  margin: 2rem 0 3rem;
  font-size: 1.8rem;
  font-weight: 500;
  
`;

const ProfileSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #333;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 6rem;
`;

const TopInfo = styled.div`
  display: flex;
  gap : 10px;
  flex-direction: row;
`
const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff0066, #6600ff);
  border-radius: 50%;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ProfileDate = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

const ProfileCompany = styled.div`
  color: #999;
  font-size: 0.85rem;
`;

const FormSection = styled.div`
  display: flex;
  width : 70%;
  flex-direction: row;
  margin: 0 auto 2rem;
`;

const FormLabel = styled.div`
  display: flex;
  margin-right: clamp(200px, 15vw, 300px);
  margin-bottom: 1rem;
  font-weight: bold;
  white-space: nowrap;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid white;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  outline: none;

  &:checked {
    border-color: #e32929;
    background-color: transparent;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 4px;  
    left: 4px;
    width: 5px;
    height: 5px;
    background-color: #e32929;  
    border-radius: 50%;
  }
`;



const TextAreaContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: #333;
  border: none;
  color: white;
  padding: 1rem;
  resize: none;
  margin-top: 0.5rem;
  &::placeholder {
    color: #777;
  }
`;

const CharCount = styled.div`
  position: relative;
  top: -40px;
  right: -10px;
  text-align: right;
  color: #999;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;


const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AttachmentItem = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

const SubmitButtonContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #444;
  }
`;

const KoreanForm = () => {
  const location = useLocation();
  const {targetType, targetId} = location.state || {};

  console.log(`타겟 : ${targetType}, 아이디 : ${targetId}`);
  const [formType, setFormType] = useState<FormTypeValue>(1);
  const [content, setContent] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();  

  const formTypeLabels: { value: FormTypeValue; label: string }[] = [
    { value: 1, label: '부적절한 프로필 이미지입니다.' },
    { value: 2, label: '스팸 또는 홍보성 게시글입니다.' },
    { value: 3, label: '욕설 또는 혐오 표현이 포함되어 있습니다.' },
    { value: 4, label: '개인정보가 노출되어 있습니다.' },
    { value: 5, label: '기타' },
  ];
  const loginUser = localStorage.getItem('nickname');

  const [userData, setUserData] = useState<any>(null);

  const handleFormTypeChange = (value: FormTypeValue) => {
    setFormType(value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value.slice(0, 500));
  };

  useEffect(() => {
    const fetchReport = async () => {
      if (targetType && targetId) {
        const result = await getReport(targetType, targetId);
        if (result?.isDuplicate) {
          setIsDuplicate(true);
          console.log('이미 신고한 대상입니다.');
        }
        if(result?.data){
          setUserData(result.data);
        }
      }
    };

    fetchReport();
  }, [targetType, targetId]);
  
  const reportTypeMap: Record<FormTypeValue, string> = {
    1: 'INAPPROPRIATE_PROFILE',
    2: 'SPAM',
    3: 'ABUSIVE_LANGUAGE',
    4: 'FALSE_INFORMATION',
    5: 'OTHER',
  };

  const handleReportClick = async() =>{
    const reportData = {
      nickname: userData.nickname, 
      reporter: loginUser,
      reportType: reportTypeMap[formType],
      reportContent: content,
      reportTarget: targetType.toUpperCase(),
      targetId: targetId
    };

    try{
      const response = await postReport(reportData);
      alert('신고가 정삭적으로 접수되었습니다.');
      navigate(-1);
      console.log("신고", response);
    } catch (error){
      console.error("신고 실패");
      alert("신고 중 오류가 발생하였습니다");
      console.log("신고 데이터  :", reportData);
    }
  }

  return (
    <Container>
        <Header headerName="Project"/>
      <FormTitle>신고하기</FormTitle>
    <ContentContainer>
      {userData && (
        <ProfileSection>
          <ProfileImage />
          <ProfileInfo>
            <TopInfo>
              <ProfileName>
                {userData.schoolName}_{userData.nickname}
              </ProfileName>
              <ProfileDate>{new Date().toLocaleDateString()}</ProfileDate>
            </TopInfo>
            <ProfileCompany>
              {userData.major} {userData.grade}{' '}
              {userData.degree === 'LEAVE_OF_ABSENCE' ? '휴학' : userData.degree}
            </ProfileCompany>
          </ProfileInfo>
        </ProfileSection>
      )}

      <FormSection>
        <FormLabel>신고 유형</FormLabel>
        <RadioGroup>
          {formTypeLabels.map(({ value, label }) => (
            <RadioItem key={value}>
              <RadioButton
                type="radio"
                name="formType"
                value={value}
                checked={formType === value}
                onChange={() => handleFormTypeChange(value)}
              />
            {label}
            </RadioItem>
          ))}
        </RadioGroup>
      </FormSection>

      <FormSection>
        <FormLabel>신고 내용</FormLabel>
        <TextAreaContainer>
          <TextArea
            placeholder="구체적인 신고 내용을 적어주세요."
            value={content}
            onChange={handleContentChange}
            maxLength={500}
          />
          <CharCount>{content.length}/500</CharCount>
        </TextAreaContainer>
      </FormSection>

      <FormSection>
        <FormLabel>안내 사항</FormLabel>
        <AttachmentList>
          <AttachmentItem>1. 신고 접수 후 확인이 소요 시간</AttachmentItem>
          <AttachmentItem>2. 안내사항</AttachmentItem>
          <AttachmentItem>3. 안내사항</AttachmentItem>
        </AttachmentList>
      </FormSection>

      <SubmitButtonContainer>
        <SubmitButton onClick={handleReportClick} >신고하기</SubmitButton>
      </SubmitButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default KoreanForm;
