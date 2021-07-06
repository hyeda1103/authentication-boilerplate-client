import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../auth/helper";
import styled from "styled-components";
import Google from "./../auth/Google";
import Facebook from "./../auth/Facebook";

const SignIn = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/private");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome Back`);
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <AuthBlock>
      <Title>로그인</Title>
      <FormEl>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          id="email"
          type="email"
          value={email}
          onChange={handleChange("email")}
        />
      </FormEl>
      <FormEl>
        <StyledLabel htmlFor="password">비밀번호</StyledLabel>
        <StyledInput
          id="password"
          type="password"
          value={password}
          onChange={handleChange("password")}
        />
      </FormEl>
      <FormEl>
        <Button onClick={handleSubmit}>로그인</Button>
        <br />
        <ForgotPassword to="/auth/password/forgot">
          비밀번호를 잊으셨나요?
        </ForgotPassword>
      </FormEl>
      <FormEl>
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
      </FormEl>
    </AuthBlock>
  );

  return (
    <Main>
      <ToastContainer />
      {isAuth() ? <Redirect to="/" /> : null}
      {signinForm()}
    </Main>
  );
};

export default SignIn;

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

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: #000;
`;
