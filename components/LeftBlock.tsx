import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import styled from "styled-components";
import { ContentBlockProps } from "./ContentBlock";
import SvgIcon from "./SvgIcon";
import ImgIcon from "./ImgIcon";

export default function LeftContentBlock({
  icon, title, content, section, id
}: ContentBlockProps) {
  return (
    <LeftContentSection>
      <Row justify="space-between" align="middle" id={id}>
        <Col lg={11} md={11} sm={12} xs={24}>
          <ImgIcon src={icon} width="100%" height="100%" />
        </Col>
        <Col lg={11} md={11} sm={11} xs={24}>
          <ContentWrapper>
            <h2>{title}</h2>
            <Content>{content}</Content>
            <ServiceWrapper>
              <Row justify="space-between">
                {typeof section === "object" &&
                  section.map((item: any, id: number) => {
                    return (
                      <Col key={id} span={11}>
                        <ImgIcon src={item.icon} width="60px" height="60px" />
                        <MinTitle>{item.title}</MinTitle>
                        <MinPara>{item.content}</MinPara>
                      </Col>
                    );
                  })}
              </Row>
            </ServiceWrapper>
          </ContentWrapper>
        </Col>
      </Row>
      {/* <Fade direction="left">
        
      </Fade> */}
    </LeftContentSection>
  );
};

const LeftContentSection = styled.section`
  position: relative;
  padding: 10rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 4rem;
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
    padding-top: 4rem;
  }
`;

const ServiceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
`;

const MinTitle = styled.h6`
  font-size: 15px;
  line-height: 1rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

const MinPara = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #575757;
`;
