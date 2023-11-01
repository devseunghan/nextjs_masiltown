import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import styled from "styled-components";
import { ContentBlockProps } from "./ContentBlock";
import ImgIcon from "./ImgIcon";

export default function RightBlock({ title, content, button, icon, id }: ContentBlockProps) {

  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <RightBlockContainer>
      <Fade direction="right">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h2>{title}</h2>
              <Content>{content}</Content>
              {/* <ButtonWrapper>
                {typeof button === "object" &&
                  button.map((item: any, id: number) => {
                    return (
                      <Button
                        key={id}
                        color={item.color}
                        onClick={() => scrollTo("about")}
                      >
                        {item.title}
                      </Button>
                    );
                  })}
              </ButtonWrapper> */}
            </ContentWrapper>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <ImgIcon src={icon} width="100%" height="100%" />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

const RightBlockContainer = styled.section`
  position: relative;
  padding: 4rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 6rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`;

const Content = styled.p`
  margin: 1.5rem 0 2rem 0;
  font-size: 16px;
  font-weight: 400;
`;

const ContentWrapper = styled.div`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-bottom: 4rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`;