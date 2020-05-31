import User from "./User";

import { Flex, Text, Skeleton } from "@chakra-ui/core";

//displays list of users from a slack workplace
//takes in array of users, each with their own attributes
export default function UserList({ users }) {
  //Loading State/Users is undefined
  if (!users) return <Skeleton height="50px" rounded="lg" my="10px" />;

  //No users found
  if (!users.length)
    return (
      <Flex
        backgroundColor="gray.100"
        maxW="100%"
        rounded="lg"
        padding="12px"
        alignItems="center"
        marginBottom="12px"
      >
        <Text fontSize="md">No Users Found</Text>
      </Flex>
    );

  //return list of users
  return users.map((user) => <User key={user.id} user={user} />);
}
