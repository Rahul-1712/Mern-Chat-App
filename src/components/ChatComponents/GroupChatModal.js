import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from './UserAvatar/UserBadgeItem';
import UserListItem from './UserAvatar/UserListItem';

const GroupChatModal = ({children}) => {
      const { isOpen, onOpen, onClose } = useDisclosure();

      const [groupChatName, setGroupChatName] = useState();
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [search, setSearch] = useState();
      const [searchResult, setSearchResult] = useState([]);
      const [loading, setLoading] = useState(false);

      const toast = useToast();

      const { user , chats, setChats } = ChatState();
      
      const handleSearch = async (query) => {

        setSearch(query);

        if (!query) { 
          setLoading(false);
          setSearchResult([]);
          return ; 
        }

        try {
          setLoading(true);

          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
          }


          const { data } = await axios.get(`/api/user?search=${search}`, config);



          setLoading(false);
          setSearchResult(data);

        } catch (error) {
          toast({
            title: "Error occured.",
            description: "Failed to load search results.",
            duration: 5000,
            status: "warning",
            position: "top",
            isClosable: true,
          });
          setLoading(false);
          return;
        }
      }

      const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          toast({
            title: "User already selected",
            duration: 5000,
            status: "warning",
            position: "top",
            isClosable: true,
          });
          return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);

      };

      const handleDelete = (userToRemove) => {
        setSelectedUsers(
          selectedUsers.filter((sel) => sel._id !== userToRemove._id)
        )
      };



      const handleSubmit =async () => {
        if (!groupChatName || !selectedUsers) {
          toast({
            title: "Please fill all the fields.",
            duration: 5000,
            status: "warning",
            position: "top",
            isClosable: true,
          });
        }

        try {
          
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };

          const { data } = await axios.post(
            '/api/chats/group',
            {
              name: groupChatName,
              users: JSON.stringify(selectedUsers.map((user) => user._id))
            },
            config
          );

          setChats([data, ...chats]);
          onClose();
          toast({
            title: "New group chat Created.",
            duration: 5000,
            status: "success",
            position: "top",
            isClosable: true,
          });

        } catch (error) {
          toast({
            title: "Failed to create the group chat.",
            duration: 5000,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      }


  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="30px"
            fontFamily="Works Sans"
            display="flex"
            justifyContent="center"
          >
            Create New Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users eg: bola, bachi, Jugni "
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display="flex" flexWrap={"wrap"} width={"100%"}>
              {selectedUsers?.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner display="flex" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal