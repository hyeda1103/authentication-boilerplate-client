import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";

const Google = ({ informParent = (f) => f }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        // inform parent component
        informParent(response);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <GoogleIcon />
            Login with Google
          </GoogleButton>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;

const GoogleButton = styled.button`
  width: 100%;
  background: #ff3e30;
  color: #fff;
  border: 1px solid #ff3e30;
  padding: 0.5rem;
  margin: 0.5rem 0 0;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: 0.4s ease;
`;

const GoogleIcon = styled(FaGoogle)`
  font-size: 16px;
  color: #fff;
  margin-right: 0.5rem;
`;
