import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { contactList } from "../Data";

const saveState = () => {
  localStorage.setItem("contacts", JSON.stringify(contactList));
};
let contacts = JSON.parse(localStorage.getItem("contacts"));
if(!contacts) {
  contacts = contactList;
  saveState();
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.6;
  height: 100%;
  width: 100%;
  border-right: 1px solid #dadada;
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #f0f2f5;
  justify-content: space-between;
  padding: 10px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  padding: 8px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 5px 10px;
  gap: 10px;
`;
const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;
export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
`;
const ContactItem = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
border-bottom: 1px solid #f2f2f2;
background:  ${(props) => (props.isActive ? "f0f2f5" : "white")};
cursor: pointer;
:hover {
  background: #f0f2f5;
}
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 12px;
`;
const ContactName = styled.span`
  width: 100%;
  font-size: 18px;
  color: black;
`;
const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  overflow: hidden;
  height: 20px;
  color: rgba(0, 0, 0, 0.8);
`;
const MessageTime = styled.span`
  display: flex;
  flex-direction: column;
  align-items: end;
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;
const ProfileImage = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileIcon = styled(ProfileImage)`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-left: 12px;
  margin-top: 11px;
  margin-bottom: 11px;
  object-fit: cover;
`;
const SearchResults = styled.div`
  width: 100%;
  height: 100px;
`;
const Navigation = styled.div`
  display: flex;
  padding: 10px;
`;
const Icons = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  margin: 0 10px;
`;
const UnseenMessages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #0cc159;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: white;
  font-size: 12px;
  margin-left: 10px;
`;
//function to render the contact list
const ContactComponent = (props) => {
  const { userData, setChat } = props;
  return (
    <ContactItem
      onClick={() => {
        setChat(userData);
        props.setLastMSG(
          userData.messagesList[userData.messagesList.length - 1].text
        );
      }}
      isActive = {props.activeChat &&  props.activeChat.id===userData.id}
    >
      <ProfileIcon src={userData.profilePic} />
      <ContactInfo>
        <ContactName>{userData.name}</ContactName>
        <MessageText>
          {userData.messagesList[userData.messagesList.length - 1].text}
        </MessageText>
      </ContactInfo>
      <MessageTime>
        {userData.messagesList[userData.messagesList.length - 1].addedOn}
        {userData.unseenMessages && (
          <UnseenMessages>{userData.unseenMessages}</UnseenMessages>
        )}
      </MessageTime>
    </ContactItem>
  );
};
//contact list component
const ContactListComponent = (props) => {
  const { lastMSG } = props;
  const [contactsList, setContactsList] = useState(contacts);
  const findContacts = (e) => {
    const searchValue = e.target.value;
    const filteredContacts = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setContactsList(filteredContacts);
  };
  //to update the contact list when a new message is added
  useEffect(() => {
    contacts = JSON.parse(localStorage.getItem("contacts"));
    setContactsList([...contacts]);
  }, [lastMSG]);

  return (
    <Container>
      <ProfileInfoDiv>
        <ProfileImage src="profilePic.jpg" />
        <Navigation>
          <Icons src="community.png" alt="community" />
          <Icons src="status.png" alt="status" />
          <Icons src="menu.png" alt="menu" />
        </Navigation>
      </ProfileInfoDiv>
      <SearchBox>
        <InputContainer>
          <SearchIcon src="https://img.icons8.com/ios/50/000000/search--v1.png" />
          <Input
            placeholder="Search or start new chat"
            onChange={(e) => findContacts(e)}
          />
        </InputContainer>
      </SearchBox>
      <SearchResults>
        {contactsList.map((contact) => (
          <ContactComponent
            setLastMSG={props.setLastMSG}
            userData={contact}
            setChat={props.setChat}
            key={contact.id}
            activeChat={props.activeChat}
          />
        ))}
      </SearchResults>
    </Container>
  );
};

export default ContactListComponent;
