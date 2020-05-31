import { Avatar, Flex, Heading, Text, Skeleton } from "@chakra-ui/core";

//displays an individual workplace user's name and profile picture,
export default function User({ user }) {
  return (
    <Flex
      backgroundColor="gray.100"
      maxW="100%"
      rounded="lg"
      padding="12px"
      alignItems="center"
      marginBottom="12px"
    >
      <Avatar
        size="md"
        name="Ryan Florence"
        src={user.image_72}
        marginRight="12px"
      />
      <Text fontSize="md">
        {user.display_name ? user.display_name : user.real_name}
      </Text>
    </Flex>
  );
}
