import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      {children}
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

type ContainerProps = {
  children: React.ReactElement | React.ReactElement[];
  rootStyles?: React.CSSProperties;
};

export function Container({ children, rootStyles }: ContainerProps) {
  return <Main style={rootStyles}>{children}</Main>;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  
  /* @media (min-width: 810px) {
    max-width: 1200px;
    padding: 0 40px;
  } */
`;
