import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import User from "../components/User";
import { Flex, Text, Skeleton } from "@chakra-ui/core";

const testUser = {
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
};

test("User displays correctly", () => {
  configure({ adapter: new Adapter() });

  const user = shallow(<User user={testUser} />);

  expect(user.contains("Slackbot")).toBe(true);
});
