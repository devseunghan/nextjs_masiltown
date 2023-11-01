import styled from "styled-components"
import { Container } from "../components/layout/Layout"
import completeAnimation from "../public/img/lottie/completeAnimation.json"
import Lottie from "react-lottie-player"
import Link from "next/link"
import Head from "next/head"


export default function Main() {
  return (
    <>
      <Head>
        <title>마실타운</title>
        <meta name="description" content="마실타운에서 즐거운 교류를 만들어봐요!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Container>
        <Wrapper>
        <Lottie
              loop
              animationData={completeAnimation}
              play
              style={{width: '100px', height: '100px'}}
          />   
          <Header>멤버등록 신청이 완료되었어요!</Header>
          
          <Link href={'/'}>
            <a>
              <Button type="button">홈으로 돌아가기</Button>
            </a>
          </Link>
        </Wrapper>
      </Container>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto auto;
`

const Header = styled.h2`
  text-align: center;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 48px;
  margin-top: 48px;
  color: white;
  background-color: #383838;
  font-weight: 600;
  border-radius: 12px;
  
  &:hover{  
    background-color : #575757;
  }
`