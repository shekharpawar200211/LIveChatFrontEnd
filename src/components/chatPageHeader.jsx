import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function ChatPageHeader() {
  const location = useLocation();
  const user = location.state?.user;

  const Header = styled.header`
    position: relative;
    background-color: #ffb6c1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border: 2px solid black;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  `;

  const Title = styled.h1`
    margin: 0;
    font-size: 2.2rem;

    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 10px;
    }
  `;

  const CenterContent = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }
  `;

  const ChatTitle = styled.h1`
    margin: 0;
    font-size: 2rem;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  `;

  const Avatar = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 768px) {
      height: 40px;
      width: 40px;
    }
  `;

  const LogoutButton = styled.button`
    color: black;
    background-color: #f0fff0;
    border: 2px solid black;
    border-radius: 100px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0ffe0;
    }

    @media (max-width: 768px) {
      margin-top: 10px;
    }
  `;

  return (
    <Header>
      <Title>{user}</Title>

      <CenterContent>
        <ChatTitle>CHAT ROOM</ChatTitle>
        <Avatar
          src="https://imgs.search.brave.com/3-F1l7Ldi7lxoyS0W4SRl0jNVJtCVsxwz9VeHgdcjI4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZXV0/c2NoZXItY2hhdC5k/ZS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8xMi9jaGF0cm9v/bV9kZXV0c2NoZXJf/Y2hhdC5qcGc"
          alt=""
        />
      </CenterContent>

      <Link to="/">
        <LogoutButton>Logout</LogoutButton>
      </Link>
    </Header>
  );
}

export default ChatPageHeader;
