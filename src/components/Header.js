import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helper";
import styled from "styled-components";

const Navbar = ({ history }) => {
  let pathname = history.location.pathname;
  return (
    <Header>
      <NavBlock>
        <Logo to="/" style={{ color: pathname === "/" && "yellow" }}>
          홈
        </Logo>
        <AuthBlock>
          {!isAuth() && (
            <>
              <NavItem
                to="/signup"
                style={{
                  color: pathname === "/signup" && "yellow",
                }}
              >
                회원가입
              </NavItem>
              <NavItem
                to="/signin"
                style={{ color: pathname === "/signin" && "yellow" }}
              >
                로그인
              </NavItem>
            </>
          )}
          {isAuth() && isAuth().role === "admin" && (
            <NavItem
              to="/admin"
              style={{ color: pathname === "/admin" && "yellow" }}
            >
              {isAuth().name}
            </NavItem>
          )}
          {isAuth() && isAuth().role === "subscriber" && (
            <NavItem
              to="/private"
              style={{ color: pathname === "/private" && "yellow" }}
            >
              {isAuth().name}
            </NavItem>
          )}
          {isAuth() && (
            <Logout
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              로그아웃
            </Logout>
          )}
        </AuthBlock>
      </NavBlock>
    </Header>
  );
};

export default withRouter(Navbar);

const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  background: #000;
`;

const NavBlock = styled.div`
  width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: #fff;

  & + & {
    margin-left: 2rem;
  }
`;

const AuthBlock = styled.div``;

const Logo = styled(Link)`
  font-size: 30px;
  text-decoration: none;
  color: #fff;
`;

const Logout = styled.span`
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  margin-left: 2rem;
`;
