import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth, getCookie, signout, updateUser } from "../auth/helper";
import styled from "styled-components";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        const { name, role, email } = response.data;
        setValues({ ...values, name, role, email });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.pushState("/");
          });
        }
      });
  };

  const { name, role, email, password } = values;

  const updateForm = () => {
    const handleChange = (name) => (e) => {
      setValues({ ...values, [name]: e.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API}/user/update`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { name, password },
      })
        .then((response) => {
          console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
          updateUser(response, () => {
            toast.success("Profile updated successfully");
          });
        })
        .catch((error) => {
          console.log(
            "PRIVATE PROFILE UPDATE ERROR",
            error.response.data.error
          );
          toast.error(error.response.data.error);
        });
    };
    return (
      <AuthBlock>
        <Title>Private</Title>
        <SubTitle>프로필 업데이트</SubTitle>
        <FormEl>
          <StyledLabel htmlFor="name">이름</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            value={name}
            onChange={handleChange("name")}
          />
        </FormEl>
        <FormEl>
          <StyledLabel htmlFor="role">등급</StyledLabel>
          <StyledInput id="role" type="text" defaultValue={role} disabled />
        </FormEl>
        <FormEl>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            value={email}
            onChange={handleChange("email")}
            disabled
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
          <Button onClick={handleSubmit}>업데이트</Button>
        </FormEl>
      </AuthBlock>
    );
  };
  return (
    <Main>
      <ToastContainer />
      {updateForm()}
    </Main>
  );
};

export default Private;

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
