import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

type MiddleBlockProps = {
  title: string;
  content: string;
  button: string;
}

export default function MiddleBlock({ title, content, button }: MiddleBlockProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <MiddleBlockSection>
      <Row justify="center" align="middle">
        <ContentWrapper>
          <Col lg={24} md={24} sm={24} xs={24}>
            <h2>{title}</h2>
            <Content>{content}</Content>
            <Link href="/signup">
              <a>
                <Button>
                  {button}
                </Button>
              </a>
            </Link>
          </Col>
        </ContentWrapper>
      </Row>
      {/* <Slide direction="up">
        
      </Slide> */}
    </MiddleBlockSection>
  );
};

const MiddleBlockSection = styled.section`
  position: relative;
  padding: 7.5rem 0 3rem;
  display: flex;
  justify-content: center;
  text-align: center;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0 3rem;
  }
`;

const Content = styled.p`
  padding: 0.75rem 0 0.75rem;
  font-size: 16px;
  font-weight: 400;
`;

const ContentWrapper = styled.div`
  max-width: 570px;

  a {
    justify-content: center;
    display: flex;
  }

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;