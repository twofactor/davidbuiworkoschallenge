import Head from "next/head";
import { useEffect, useState } from "react";

import { Heading } from "@chakra-ui/core";

import Container from "../components/ui/Container";
import CenteredColumn from "../components/ui/CenteredColumn";

import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/users");
        const users = await res.json();
        setUsers(users);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Head>David's WorkOS Challenge</Head>
      <CenteredColumn>
        <Heading>Workspace users</Heading>
        <UserList users={users} />
      </CenteredColumn>
    </Container>
  );
}
