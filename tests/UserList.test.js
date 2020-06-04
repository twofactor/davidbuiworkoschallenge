import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import UserList from "../components/UserList";
import User from "../components/User";
import { Flex, Text, Skeleton } from "@chakra-ui/core";

const testUsers = {
  users: [
    {
      id: "USLACKBOT",
      name: "slackbot",
      profile: {
        real_name: "Slackbot",
        display_name: "Slackbot",
        first_name: "slackbot",
        last_name: "",
        image_72: "https://a.slack-edge.com/80588/img/slackbot_72.png",
        team: "T014960QJ3G",
      },
    },
    {
      id: "U014FTSM1V0",
      name: "workoschallengedavidb",
      profile: {
        real_name: "workoschallengedavidb",
        display_name: "",
        image_72:
          "https://secure.gravatar.com/avatar/c6d4b6e4d6953f3da9f6ee87980af2c5.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0000-72.png",
        team: "T014960QJ3G",
      },
    },
    {
      id: "U014UGGGJTT",
      name: "davidbui.psd",
      profile: {
        real_name: "davidbui.psd",
        display_name: "",
        image_72:
          "https://secure.gravatar.com/avatar/4b004b04f0509db20692a75f44741225.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2Fdf10d%2Fimg%2Favatars%2Fava_0022-72.png",
        team: "T014960QJ3G",
      },
    },
  ],
};

test("Userlist displays correctly in normal circumstances", () => {
  configure({ adapter: new Adapter() });

  const userlist = shallow(<UserList users={testUsers.users} />);

  expect(userlist.contains(<User user={testUsers.users[0]} />)).toBe(true);
  expect(userlist.contains(<User user={testUsers.users[1]} />)).toBe(true);
});

test("Userlist displays correct loading state", () => {
  configure({ adapter: new Adapter() });

  const userlist = shallow(<UserList users={null} />);

  expect(
    userlist.contains(<Skeleton height="70px" rounded="lg" my="10px" />)
  ).toBe(true);
});

test("Userlist displays correct state for no users/error from api", () => {
  configure({ adapter: new Adapter() });

  const userlist = shallow(<UserList users={[]} />);

  expect(userlist.text()).toBe("No Users Found");
});
