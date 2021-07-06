import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styled from "styled-components";
import { FaFacebookF } from "react-icons/fa";

const Facebook = ({ informParent = (f) => f }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log("FACEBOOK SIGNIN SUCCESS", response);
        // inform parent component
        informParent(response);
      })
      .catch((error) => {
        console.log("FACEBOOK SIGNIN ERROR", error.response);
      });
  };
  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <FacebookButton onClick={renderProps.onClick}>
            <FacebookIcon />
            Login with Facebook
          </FacebookButton>
        )}
      />
    </div>
  );
};

export default Facebook;

const FacebookButton = styled.button`
  width: 100%;
  background: #4267b2;
  color: #fff;
  border: 1px solid #4267b2;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: 0.4s ease;
`;

const FacebookIcon = styled(FaFacebookF)`
  font-size: 16px;
  color: #fff;
  margin-right: 0.5rem;
`;
