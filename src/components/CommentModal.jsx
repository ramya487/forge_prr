import React, { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalTransition,
  ModalTitle,
  ModalFooter,
  ModalHeader,
  Button,
  LoadingButton,
} from "@forge/react";
import CommentList from "./CommentList";
import { invoke } from "@forge/bridge";
import { ADD_COMMENT_TO_PR } from "../utils/urls";

const CommentModal = ({
  isOpenCommentModal,
  closeCommentModal,
  comments,
  prId,
}) => {
  const [loading, setLoading] = useState(false);
  const addSingleComment = async (requestBody) => {
    try {
      setLoading(true);
      await invoke(ADD_COMMENT_TO_PR, {
        requestBody,
        prId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addAllComments = async () => {
    try {
      for (let i = 0; i < comments.length; i++) {
        const item = comments[i];
        const { fileName, solution, line } = item;
        const requestBody = {
          content: {
            raw: solution,
          },
          inline: {
            path: fileName,
            to: Number(line), // might not be necessary to convert to number as the response body is stringified when sending request
          },
        };
        await addSingleComment(requestBody);
      }
      closeCommentModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ModalTransition>
        {isOpenCommentModal && (
          <Modal onClose={closeCommentModal}>
            <ModalHeader>
              <ModalTitle>Following are the suggested changes</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <CommentList comments={comments} />
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeCommentModal}>
                Cancel
              </Button>
              <LoadingButton onClick={addAllComments} isLoading={loading}>
                Add Comments
              </LoadingButton>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default CommentModal;
