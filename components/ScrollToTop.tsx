import { useEffect, useState } from "react";
import styled from "styled-components";
import { getScroll } from "../utils/getWindow";
import SvgIcon from "./SvgIcon";

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = (event: any) => {
    const offsetFromTop = getScroll(event.target, true);

    if (!showScroll && offsetFromTop > 350) {
      setShowScroll(true);
    } else if (offsetFromTop <= 350) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollUp = () => {
    const element = document.getElementById("intro") as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <ScrollUpContainer onClick={scrollUp} $show={showScroll}>
      <SvgIcon src="scroll-top.svg" width="20px" height="20px" />
    </ScrollUpContainer>
  );
};

const ScrollUpContainer = styled.div<{ $show: boolean }>`
  z-index: 10;
  position: fixed;
  padding: 10px;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  background: rgb(241, 242, 243);
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  opacity: ${(props) => (props.$show ? "1" : "0")};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: rgb(224, 224, 224);
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;
