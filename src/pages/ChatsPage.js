import { Box } from "@chakra-ui/react";
import React from "react";
import ChatBox from "../components/ChatComponents/ChatBox";
import MyChats from "../components/ChatComponents/MyChats";
import SideDrawer from "../components/ChatComponents/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const ChatsPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box 
      display="flex"
      width="100%"
      justifyContent={"space-between"}
      height="91vh"
      p="15px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatsPage;
