import React, { useEffect } from "react";

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

const CommentModal = ({
  isOpenCommentModal,
  closeCommentModal,
  comments
}) => {
  useEffect(() => {
    console.log("comments as on comment modal: ", comments);
  }, [])
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
              <LoadingButton onClick={closeCommentModal}>
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
