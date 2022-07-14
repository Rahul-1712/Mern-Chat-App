import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user , handleFunction}) => {
  return (
    <Box
    bgColor={"purple"}
    px={2}
    py={1}
    m={1}
    mb={3}
    fontSize={12}
    borderRadius="lg"
    cursor="pointer"
    variant="solid"
    color="white"
    onClick={handleFunction}
    >
        {user.name} <CloseIcon pl={1} />
    </Box>
  )
}

export default UserBadgeItem