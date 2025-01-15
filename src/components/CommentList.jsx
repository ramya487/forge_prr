import { Stack } from "@forge/react";
import React from "react";
import CommentListItem from "./CommentListItem";

const CommentList = ({comments}) => {
  return (
    <Stack space="space.250">
      {comments.map((item) => <CommentListItem item={item} />)}
    </Stack>
  );
};

export default CommentList;
