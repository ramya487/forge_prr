import React from "react";
import { ModalTitle, Strong, Text, Stack } from "@forge/react";

const CommentListItem = ({item}) => {
  return (
    <Stack>
      <ModalTitle># Comment for {item.fileName}</ModalTitle>
      <Text>
        <Strong>Issue:</Strong> {item.issue}
      </Text>
      <Text>
        <Strong>Fix: </Strong> {item.solution}
      </Text>
      <Text>
        <Strong>Line: </Strong> {item.line}
      </Text>
      <Text>
        <Strong>Category: </Strong> {item.category}
      </Text>
    </Stack>
  );
};

export default CommentListItem;
