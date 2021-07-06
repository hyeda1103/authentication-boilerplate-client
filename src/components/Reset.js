import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword } = values;

  const handleChange = (e) => {
    setValues({ ...values, newPassword: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const passwordResetForm = () => (
    <AuthBlock>
      <Title>비밀번호 재설정</Title>
      <SubTitle>Hey {name}, Type your new Password</SubTitle>
      <FormEl>
        <StyledLabel htmlFor="password">새로운 비밀번호</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          value={newPassword}
          placeholder="새로운 비밀번호를 입력하세요"
          onChange={handleChange}
          required
        />
      </FormEl>

      <FormEl>
        <Button onClick={handleSubmit}>비밀번호 재설정</Button>
      </FormEl>
    </AuthBlock>
  );
  return (
    <Main>
      <ToastContainer />
      {passwordResetForm()}
    </Main>
  );
};

export default Reset;

const Main = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
`;

const AuthBlock = styled.form`
  width: 480px;
  box-sizing: border-box;
  padding: 4rem;
  border: 1px solid #000;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 4px;
`;

const SubTitle = styled.p`
  font-size: 20px;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 4px;
`;

const FormEl = styled.div`
  & + & {
    margin-top: 2rem;
  }
`;

const StyledLabel = styled.label`
  display: block;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #00000080;

  &:focus {
    border-bottom: 1px solid #000;
  }
`;

const Button = styled.button`
  width: 100%;
  border: 1px solid #000;
  padding: 0.5rem;
  margin: 1.5rem 0;
  font-size: 16px;
  letter-spacing: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: 0.4s ease;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
