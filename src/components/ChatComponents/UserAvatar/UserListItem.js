import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user , handleFunction}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      color="black"
      width="100%"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      onClick={handleFunction}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs"><b>Email: </b>{user.email}</Text>
      </Box>
    </Box>
  );
}

export default UserListItem