import React from "react";
import { Box, ThemeProvider } from "@chakra-ui/core";

export default function Container(props) {
  return (
    <ThemeProvider>
      <Box minHeight="100vh" padding="12px" {...props} />
    </ThemeProvider>
  );
}
