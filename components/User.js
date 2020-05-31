import { Avatar, Flex, Heading, Text, Skeleton } from "@chakra-ui/core";

//displays an individual workplace user's name and profile picture,
export default function User({ user }) {
  return (
    <Flex backgroundColor="gray.100" rounded="lg" marginBottom="12px">
      <Avatar
        size="md"
        name={user.profile.real_name}
        src={user.profile.image_72}
        margin="12px"
      />
      <Flex direction="column" justify="center">
        <Text fontWeight="bold" fontSize="sm" margin="0px" padding="0px">
          {user.profile.display_name}
        </Text>
        <Text fontSize="sm" margin="0px" padding="0px">
          {user.profile.real_name}
        </Text>
        <Text fontSize="sm" margin="0px" padding="0px">
          {user.profile.title}
        </Text>
      </Flex>
    </Flex>
  );
}
