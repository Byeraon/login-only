import React from "react";
import styled from "styled-components";

interface ProfileProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Form = styled.div`
  height: max-content;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  span {
    font-size: 40px;
    text-align: center;
  }
`;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  height: 60px;
  font-weight: 700;
  background: #f5f5f5;
  margin-top: 50px;
  border: none;
  border-radius: 8px;
  width: 200px;
  color: black;
  font-size: 18px;
  &:hover {
    background: #d4d4d4;
  }
`;

export const ProfilePage: React.FC<ProfileProps> = ({ setLogin }) => {
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    setLogin(null);
  };

  return (
    <Form>
      <span>
        Здравствуйте, <b>{user && JSON.parse(user).name}</b>!
      </span>
      <Button onClick={logout}>Выйти</Button>
    </Form>
  );
};
