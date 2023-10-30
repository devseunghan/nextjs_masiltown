import styled from "styled-components";

type ButtonProps = {
  color?: string;
  name?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ color, children, onClick }: ButtonProps) {
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.div<{ color?: string }>`
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  width: 100%;
  max-width: 180px;
  margin-top: 0.625rem;
  padding: 13px 0;
  border: 1px solid #edf3f5;
  border-radius: 4px;
  color: ${(props) => (props.color ? "#2E186A" : "#fff")};
  background: ${(props) => props.color || "#2e186a"};
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);
  }
`;
