import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));


    if (user) {
      navigate("/Chats");
    }
  }, [navigate]);

  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          w="100%"
          bg={"white"}
          m="40px 0 15px 0"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Text fontSize="4xl">Talk-A-Tive</Text>
        </Box>
        <Box p={4} w="100%" bg={"white"} borderWidth="1px" borderRadius="lg">
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width={"50%"}>Login</Tab>
              <Tab width={"50%"}>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
