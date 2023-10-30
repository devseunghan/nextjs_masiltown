import { useQuery } from "@apollo/client";
import { RECIEVE_SIMPLE_SURVEY_FORM } from "../graphql/schema";
import { Item } from "../graphql/type";
import { Container } from "../components/layout/Layout";
import styled from "styled-components";

interface Response {
  campusList: Item[]
  campusNameList: string[]
  majorList: Item[]
  majorNameList: string[]
  mbtiList: Item[]
  genderList: Item[]
  gradeList: Item[]
}

export default function signup() {
  const { data, loading, error } = useQuery(RECIEVE_SIMPLE_SURVEY_FORM);

  if (loading) {
    return <h2>로딩중</h2>;
  }
  if (error) {
    return <h1>에러 발생</h1>;
  }
  const res: Response = data.response;

  // 이름
  let name = '';
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    name = event.target.value;
  }

  // 휴대폰번호
  let phone = '';
  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    phone = event.target.value;
  }

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`name: ${name}`)
    console.log(`phone: ${phone}`)
  }

  return (
    <>
      <Container>
        <SizedBox />
        <h3>회원가입</h3>
        <form>
          <Wrapper>
            <label>이름</label>
            <input onChange={handleNameChange} type="text"/>
          </Wrapper>
          <Wrapper>
            <label>휴대전화</label>
            <input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder="XXX-XXXX-XXXX" onChange={handleTelChange}/>
          </Wrapper>

          <Wrapper>
            <button type="button" onClick={handleSubmitClick}>전송</button>
          </Wrapper>
        </form>
      </Container>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`

const SizedBox = styled.div`
  height: 24px;
`