import { useQuery } from "@apollo/client";
import { CHECK_ATTENDER, RECIEVE_SIMPLE_SURVEY_FORM, SIMPLE_REGIST_ATTENDER } from "../graphql/schema";
import { Item } from "../graphql/type";
import { Container } from "../components/layout/Layout";
import styled from "styled-components";
import { useRef, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase-config";
import { ClipLoader } from "react-spinners";
import client from "../graphql/apollo-client";
import Link from "next/link";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import Head from "next/head";

interface Response {
  campusList: Item[]
  campusNameList: string[]
  majorList: Item[]
  majorNameList: string[]
  mbtiList: Item[]
  genderList: Item[]
  gradeList: Item[]
}

export default function Signup() {
  // 휴대폰인증 관련상태
  const [isRenderRecaptchaVerifier, setIsRenderRecaptchaVerifier] = useState(false);
  const [credential, setCredential] = useState(null);
  const [isCodeSendLoading, setIsCodeSendLoading] = useState(false);
  const [isCodeHandleLoading, setIsCodeHandleLoading] = useState(false);
  const [isSendVerifyCode, setIsSendVerifyCode] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleVerifyCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCode(event.target.value);
  }

  const sendVerifyCode = async () => {
    try { 
      if (phone === '') {
        window.alert('연락처를 입력해주세요.');
      }
      else {
        // response -> boolean [false: 이미 가입된 휴대폰 번호]
        const { data } = await client.query({
          query: CHECK_ATTENDER, 
          variables: {phone}
        })

        if (!data.response) {
          window.alert('이미 가입된 휴대폰번호입니다.')
        }
        else {
          const phoneNum = phone.replaceAll('-' , '').replace('0', '+82');
          if (phoneNum.length === 12 || phoneNum.length === 13) {
            if (isRenderRecaptchaVerifier) {
              const recaptchaContainer = document.getElementById("recaptcha-container");
              recaptchaContainer.parentNode.removeChild(recaptchaContainer);

              const newRecaptchaContainer = document.createElement("div");
              newRecaptchaContainer.id = "recaptcha-container";
              document.body.appendChild(newRecaptchaContainer);
            }
            
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {size: 'invisible'});
            setIsRenderRecaptchaVerifier(true);

            setIsCodeSendLoading(true);
            const confirmation = await signInWithPhoneNumber(auth, phoneNum, recaptchaVerifier)
            setIsCodeSendLoading(false);
            
            setCredential(confirmation);
            setIsSendVerifyCode(true);
            window.alert('인증번호를 전송했습니다.');
          }
          else {
            window.alert('올바른 휴대폰번호를 입력해주세요.');
          }     
        }
      }
    } catch (error) {
      setIsCodeSendLoading(false);
      console.log(error)

      if (error.code === 'auth/too-many-requests') {
        window.alert('너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.')
      }
      else {
        window.alert('올바른 휴대폰번호를 입력해주세요.');
      }
    }
  };

  const checkVerifyCode = async () => {
    try {
      if (verifyCode.length != 6) {
        window.alert('6자리 인증번호를 입력해주세요.');
      }
      else {
        setIsCodeHandleLoading(true);
        const data = await credential.confirm(verifyCode);
        setIsCodeHandleLoading(false);
  
        if (data.user != null) {  
          setIsSendVerifyCode(false);
          setIsAuth(true);
        }
      }
    } catch (error) {
      setIsCodeHandleLoading(false);
      window.alert('인증번호가 일치하지 않습니다.');
    }
  };

  // 사용자입력정보
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [campusId, setCampusId] = useState<number>(null);
  const [majorId, setMajorId] = useState<number>(null);
  const [gradeId, setGradeId] = useState<number>(null);
  const [birthYear, setBirthYear] = useState('');
  const [genderId, setGenderId] = useState<number>(null);
  const [mbtiId, setMbtiId] = useState<number>(null);
  const [motivation, setMotivation] = useState('');
  const phoneRef = useRef<HTMLInputElement>();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;
    let result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    phoneRef.current.value = result;
    setPhone(event.target.value); 
  }

  const SelectGradeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGradeId(parseInt(event.target.value));
  }

  const SelectBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  }

  const SelectGenderId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderId(parseInt(event.target.value));
  }

  const SelectMbtiId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMbtiId(parseInt(event.target.value));
  }

  const handleMotivationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMotivation(event.target.value);
  }

  const router = useRouter();

  const handleSubmitClick = async () => {
    const alias = {
      name: '이름', 
      phone: '연락처', 
      campusId: '소속 대학교', 
      majorId: '전공', 
      gradeId: '학년', 
      birthYear: '출생연도', 
      genderId: '성별', 
      mbtiId: 'MBTI', 
      motivation: '지원동기'
    };
    
    const input = {
      name,
      phone,
      campusId,
      majorId,
      gradeId,
      birthYear,
      genderId,
      mbtiId,
      motivation
    };

    if (!isAuth) {
      alert('휴대폰 인증을 완료해주세요.');
      return;
    }

    for (const key in input) {
      if (input[key] === '' || input[key] === null) {
        alert(`${alias[key]} 필드를 입력해주세요.`);
        return;
      }
    }

    if (motivation.length < 30) {
      alert('지원동기는 30자 이상 작성해주세요.');
      return;
    }

    const { data } = await client.mutate({
      mutation: SIMPLE_REGIST_ATTENDER, 
      variables: {input}
    });

    if (data.response != null) {
      window.alert('멤버등록신청이 완료되었습니다!')
    }

    router.push('/main');
  }

  const { data, loading, error } = useQuery(RECIEVE_SIMPLE_SURVEY_FORM);

  if (loading) {
    return <div style={{display: 'flex', flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <ClipLoader size={24} color="#dfdfdf" />
    </div>;
  }
  if (error) {
    return <h1>에러 발생</h1>;
  }

  const res: Response = data.response;

  let campusItemList: {id: number, name: string}[] = [];
  res.campusList.forEach((item) => {
    campusItemList.push({id: item.id, name: item.value})
  });

  let majorItemList: {id: number, name: string}[] = [];
  res.majorList.forEach((item) => {
    majorItemList.push({id: item.id, name: item.value})
  });

  const birthList = Array.from({length: 15 }, (_, index) => ({ 
    id: index + 1, value: (1990 + index).toString()
    })
  );

  return (
    <>
      <Head>
        <title>회원가입</title>
        <meta name="description" content="마실타운의 멤버가 되어주세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Container>
        <Header>회원가입을 위해<br/>정보를 입력해주세요.</Header>

        <form>
          <ColWrapper>
            <Label>이름</Label>
            <Input onChange={handleNameChange} placeholder="이름을 입력해주세요." type="text" maxLength={6}/>
            <Gap />
            
            <Label>연락처</Label>
            <RowWrapper>       
              <Input 
                type="tel" 
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" 
                placeholder="연락처를 입력해주세요" 
                onChange={handlePhoneChange} 
                ref={phoneRef}
                disabled={isAuth}
              />
              <AuthButton 
                type="button" 
                disabled={isCodeSendLoading || isAuth ? true : false}
                onClick={sendVerifyCode}
              >
                {isCodeSendLoading ? <ClipLoader size={16} color="#ffffff"/>: isAuth ? '인증완료' : '인증'}
              </AuthButton>
              <div id="recaptcha-container"></div>
            </RowWrapper>

            {isSendVerifyCode && <Gap height="6px"/>}
            {isSendVerifyCode && 
              
              <RowWrapper >
                <Input 
                  type="num" 
                  placeholder="인증번호를 입력해주세요." 
                  onChange={handleVerifyCodeChange}
                />
                <AuthButton 
                  type="button"
                  disabled={isCodeHandleLoading ? true : false}
                  onClick={checkVerifyCode}
                >
                  {isCodeHandleLoading ? <ClipLoader size={16} color="#ffffff" />: '확인'}
                </AuthButton>
              </RowWrapper>
            }
            <Gap />

            <Label>소속 대학교</Label>
            <ReactSearchAutocomplete
              items={campusItemList}
              onSelect={(item) => {setCampusId(item.id)}}
              onClear={() => {setCampusId(null)}}
              showNoResults={false}
              showIcon={false}
              placeholder="소속 대학을 검색 후 선택해주세요."
              styling={{
                height: '32px',
                borderRadius: '0',
                border: '1px solid #dfdfdf',
                fontFamily: 'Pretendard',
                fontSize: '13px',
                color: '#000000',
                zIndex: 2
              }}
            />
            <Gap />

            <Label>전공</Label>
            <ReactSearchAutocomplete
              items={majorItemList}
              onSelect={(item) => {setMajorId(item.id)}}
              onClear={() => {setMajorId(null)}}
              showNoResults={false}
              showIcon={false}
              placeholder="전공을 검색 후 선택해주세요."
              styling={{
                height: '32px',
                borderRadius: '0',
                border: '1px solid #dfdfdf',
                fontFamily: 'Pretendard',
                fontSize: '13px',
                color: '#000000',
                zIndex: 1
              }}
            />
            <Gap />

            <Label>학년</Label>
            <Select onChange={SelectGradeId}>
              <option value={null}>학년을 알려주세요.</option>
              {
                res.gradeList.map((grade) => (
                  <option key={grade.id} value={grade.id}>{grade.value}</option>
                  )
                )
              }
            </Select>
            <Gap />

            <Label>출생연도</Label>
            <Select onChange={SelectBirthYear}>
              <option value={''}>출생연도를 알려주세요.</option>
              {
                birthList.map((birth) => (
                  <option key={birth.value} value={birth.value}>{birth.value}</option>
                  )
                )
              }
            </Select>
            <Gap />

            <Label>성별</Label>
            <Select onChange={SelectGenderId}>
              <option value={null}>성별을 알려주세요.</option>
              {
                res.genderList.map((gender) => (
                  <option key={gender.id} value={gender.id}>{gender.value}</option>
                  )
                )
              }
            </Select>
            <Gap />

            <Label>MBTI</Label>
            <Select onChange={SelectMbtiId}>
              <option value={null}>MBTI를 알려주세요.</option>
              {
                res.mbtiList.map((mbti) => (
                  <option key={mbti.id} value={mbti.id}>{mbti.value}</option>
                  )
                )
              }
            </Select>
            <Gap />

            <RowWrapper>
              <Label>지원동기</Label>
              <Sub>(이름, 나이, 학번 등 개인정보는 작성하지 말아주세요)</Sub>
            </RowWrapper>
            <TextArea rows={6} placeholder="지원동기는 최소 30자 이상으로 작성해주세요." onChange={handleMotivationChange}></TextArea>
            <Gap height="28px"/>

            <SubmitButton type="button" onClick={handleSubmitClick}>회원가입</SubmitButton>
            <Gap height="12px"/>
            
            <LoginBlock>
              <LoginGuide>이미 마실타운의 회원이신가요?</LoginGuide>
              <Link href='/'>
                <HyperLink>홈으로</HyperLink>
              </Link>
            </LoginBlock>
            <Gap height="40px"/>
            
          </ColWrapper>
        </form>
      </Container>
    </>
  );
}

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Gap = styled.div<{ height?: string }>`
  height: ${(props) => props.height? props.height : '20px'};;
`

const Header = styled.p`
  margin-top: 36px;
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 125%;
`

const Label = styled.label`
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #575757;
`

const Sub = styled.p`
  font-size: 10px;
  color: #aaaaaa;
  margin-left: 4px;
`

const Input = styled.input`
  height: 32px;
  border: 1px solid #dfdfdf;
  margin-left: 2px;
  padding-left: 13px;
`

const TextArea = styled.textarea`
  border: 1px solid #dfdfdf;
  margin-left: 2px;
  padding: 8px 8px;
`

const Select = styled.select`
  height: 32px;
  border: 1px solid #dfdfdf;
  border-radius: 0;
  font-size: 13px;
  color: #000000;
  background-color: white;
  margin-left: 2px;
  padding-left: 8px
`

const AuthButton = styled.button`
  width: 60px;
  font-weight: 600;
  background-color: #383838;
  color: #ffffff;

  &:hover{  
    background-color : #575757;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
  background-color: #383838;
  color: #ffffff;
  border-radius: 12px;

  &:hover{  
    background-color : #575757;
  }
`

const LoginBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const LoginGuide = styled.p`
  font-size: 12px;
  color: #aaaaaa;
  font-weight: 500;
`

const HyperLink = styled.a`
  font-size: 12px;
  line-height: 160%;
  text-decoration: underline;
  color: #575757;
  margin-left: 4px;
`