import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

interface IFormInput {
  name: string;
  password: string;
}

interface FormProps {
  logged: null | boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  height: 60px;
  font-weight: 700;
  background: #4a67ff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  &:hover {
    background: #6c85ff;
  }
  &:disabled {
    background: #99a9ff;
  }
`;

const Form = styled.form`
  width: 640px;
  height: max-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;

const LabelInput = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-top: 20px;
`;

const Input = styled.input`
  outline: none;
  background: #f5f5f5;
  border: none;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 10px 0 8px 0;

  width: 100%;
  font-size: 16px;
  padding: 20px;
  &:required {
    border: 1px solid red;
  }
`;

const InputChecker = styled.input`
  font-size: 16px;
  position: relative;
  z-index: -1;
  margin-right: 14px;
  padding: 20px;

  &:checked::before {
    width: 0;
    height: 0;
    border-color: #0b76ef;
    border: 8px solid #0b76ef;
  }
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    background-color: white;
    flex-shrink: 0;
    opacity: 1;
    flex-grow: 0;
    border: 1px solid #000000;
    border-radius: 4px;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
`;

const LabelChecker = styled.label`
  margin-bottom: 20px;
  cursor: pointer;
  width: max-content;

  label {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: #e26f6f;
  font-weight: 400;
`;

const ErrorBlock = styled.p`
  width: 100%;
  box-sizing: border-box;
  padding: 22px 20px;
  background-color: #f5e9e9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border: 1px solid #e26f6f;
  p {
    margin-left: 14px;
    font-size: 14px;
    color: black;
  }
`;

export const LoginForm: React.FC<FormProps> = ({ logged, setLogin }) => {
  const [user, setUser] = useState<IFormInput>({ name: "", password: "" });
  const [serverError, setError] = useState({ show: false, message: "" });

  const trueUser = { name: "steve.jobs@example.com", password: "password" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = () => {
    setError({ show: false, message: "" });
    setLogin(false);
    setTimeout(() => {
      fakeAuth();
    }, 2000);
  };

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    keyName: string
  ) => {
    setUser({ ...user, [keyName]: e.target.value });
  };

  const fakeAuth = () => {
    if (user.name === trueUser.name && user.password === trueUser.password) {
      setLogin(true);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: user.name, token: Date.now() })
      );
    } else {
      setLogin(null);
      setError({
        show: true,
        message: `Пользователя ${user.name} не существует`,
      });
    }
    setUser({ name: "", password: "" });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverError.show && (
        <ErrorBlock>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#FFC8C8" />
            <path
              d="M9.036 13.446V15H10.59V13.446H9.036ZM10.478 8.084V5.004H9.148V8.084L9.498 12.438H10.128L10.478 8.084Z"
              fill="#EE6565"
            />
          </svg>

          <p>{serverError.message}</p>
        </ErrorBlock>
      )}

      <LabelInput>Логин</LabelInput>
      <Input
        {...register("name", { required: true })}
        style={
          errors.name && errors.name.type === "required"
            ? { border: "2px solid #E26F6F" }
            : {}
        }
        value={user.name}
        onChange={(e) => {
          changeValue(e, "name");
        }}
      />
      {errors.name && errors.name.type === "required" && (
        <ErrorMessage>Обязательное поле</ErrorMessage>
      )}
      <LabelInput>Пароль</LabelInput>
      <Input
        {...register("password", { required: true })}
        style={
          errors.password && errors.password.type === "required"
            ? { border: "2px solid #E26F6F" }
            : {}
        }
        onChange={(e) => {
          changeValue(e, "password");
        }}
        value={user.password}
        type="password"
      />
      {errors.password && errors.password.type === "required" && (
        <ErrorMessage>Обязательное поле</ErrorMessage>
      )}
      <LabelChecker style={{ marginBottom: "20px", cursor: "pointer" }}>
        <InputChecker
          id="passCheck"
          type="checkbox"
          name="Запомнить пароль"
        ></InputChecker>
        <LabelInput htmlFor="passCheck"> Запомнить пароль</LabelInput>
      </LabelChecker>
      <Button disabled={logged === false} type="submit">
        Войти
      </Button>
    </Form>
  );
};
