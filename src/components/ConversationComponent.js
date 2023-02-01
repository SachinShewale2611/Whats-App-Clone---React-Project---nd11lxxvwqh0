import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { InputContainer, Input } from "./ContactListComponent";
import Picker from "emoji-picker-react";

let contactList = JSON.parse(localStorage.getItem("contacts"));
const saveState = () => {
  localStorage.setItem("contacts", JSON.stringify(contactList));
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100%;
  width: 100%;
  background: #f6f7f8;
`;
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  align-items: center;
  gap: 10px;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 50%;
`;
const ContactName = styled.span`
  font-size: 16px;
  color: black;
`;
const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: #e5ddd6;
  background-image: url("bg.jpg");
  padding-bottom: 50px;
`;
const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  margin: 5px 15px;
`;
const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  padding: 8px 10px;
  border-radius: 4px;
  max-width: 50%;
  color: #303030;
  font-size: 14px;
`;
const EmojiImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
`;
const Functinality = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;
const Icons = styled.img`
  width: 22px;
  height: 22px;
  object-fit: cover;
  margin: 0 10px;
`;
//time format function
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
//find selected contact message list
let SelectedcontactMessageList;
function findSelectedMessageList(selectedChat) {
  contactList.forEach((contact) => {
    if (contact.id === selectedChat.id) {
      SelectedcontactMessageList = contact.messagesList;
      contact.unseenMessages = "";
      contact.LastMessageTime = new Date();
      saveState();
    }
  });
}
//reorder contact list based on last message time
const ReorderContactList = () => {
  contactList = contactList.sort((a, b) => {
    return new Date(b.LastMessageTime) - new Date(a.LastMessageTime);
  });
  saveState();
};
//conversation component
function ConversationComponent(props) {
  const { selectedChat, setLastMSG } = props;
  const [text, setText] = useState("");
  const [pickerVisible, togglePicker] = useState(false);
  findSelectedMessageList(selectedChat);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [messageList, setMessageList] = useState(SelectedcontactMessageList);
  const onEmojiClick = (event, emojiObj) => {
    setText(text + emojiObj.emoji);
  };
  //send message
  const onEnterPress = (event) => {
    const newText = event.target.value.trim(" ");
    if (event.key === "Enter" && newText) {
      const newMessage = {
        id: messageList.length + 1,
        messageType: "TEXT",
        text: newText,
        senderID: 1,
        addedOn: formatAMPM(new Date()),
      };
      SelectedcontactMessageList.push(newMessage);
      setText("");
      ReorderContactList();
      setLastMSG({ ...newMessage });
      scrollToBottom();
    }
  };
  useEffect(() => {
    setMessageList(SelectedcontactMessageList);
    selectedChat.unseenMessages = "";
    scrollToBottom();
  }, [selectedChat]);
  return (
    <Container>
      <ProfileHeader>
        <ProfileInfo>
          <ProfileImage src={selectedChat.profilePic} />
          <ContactName>{selectedChat.name}</ContactName>
        </ProfileInfo>
        <Functinality>
          <Icons src="/voice-call.png" />
          <Icons src="/video-call.png" />
          <Icons src="/menu.png" />
        </Functinality>
      </ProfileHeader>
      <MessageContainer>
        {messageList.map((message, index) => (
          <MessageDiv isYours={message.senderID} key={message.id}>
            <Message isYours={message.senderID} ref={messagesEndRef}>
              {message.text}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>
      <ChatBox>
        <InputContainer>
          {pickerVisible && (
            <Picker
              pickerStyle={{ position: "absolute", bottom: "60px" }}
              onEmojiClick={onEmojiClick}
            />
          )}
          <EmojiImage
            src="/emoji.png"
            onClick={() => togglePicker(!pickerVisible)}
          />
          <Input
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => onEnterPress(e)}
          />
        </InputContainer>
      </ChatBox>
    </Container>
  );
}

export default ConversationComponent;
