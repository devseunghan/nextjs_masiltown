import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <P>높히(주) ㅣ 대표 박근호 ㅣ 사업자등록번호 623-86-02407</P>
      <P>(14557) 경기 부천시 부천로198번길 18, 춘의테크노파크II 202동 10층</P>
      <P>+82-70-5057-3388 ㅣ masiltown@nophy.io</P>
    </Container>
  );
}

const Container = styled.footer`
  color: #aaaaaa;
  background-color: #f1f1f1;
  Padding: 24px;
  line-height: 105%;
`

const P = styled.p`
  font-weight: 500;
  font-size: 10px;
`