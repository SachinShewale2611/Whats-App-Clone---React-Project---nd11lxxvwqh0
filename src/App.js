import React, { useState } from "react";
import styled from "styled-components";
import ContactListComponent from "./components/ContactListComponent";
import ConversationComponent from "./components/ConversationComponent";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: #f0f2f5;
  background-color: #f0f2f5;
`;

const ChatPlaceholder = styled.img`
  width: 450px;
  object-fit: contain;
`;
const Placeholder = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);
  span {
    font-size: 32px;
    color: #525252;
  }
`;

function App() {
  const [selectedChat, setSelectedChat] = useState();
  const [lastMSG, setLastMSG] = useState();
  return (
    <Container>
      <ContactListComponent activeChat={selectedChat} lastMSG={lastMSG} setLastMSG={setLastMSG} setChat={setSelectedChat} />
      {selectedChat ? (
        <ConversationComponent setLastMSG={setLastMSG} selectedChat={selectedChat} />
      ) : (
        <Placeholder>
          <ChatPlaceholder src="./conversation-placeholder.png" />
          <span>WhatsApp for Desktop</span>
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </Placeholder>
      )}
    </Container>
  );
}

export default App;
