import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalTransition,
  ModalTitle,
  ModalFooter,
  ModalHeader,
  Strong,
  Text,
  LoadingButton,
  Box,
  Button,
  Stack,
} from "@forge/react";
import ChangedFilesTable from "./ChangedFilesTable";

const OverviewModal = ({
  loading,
  isOpen,
  closeModal,
  tableRows,
  prTitle,
  prId,
}) => {
  return (
    <>
      <LoadingButton type="submit" isLoading={loading}>
        Submit
      </LoadingButton>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Pull Request Overview</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Stack space="space.150">
                <Box>
                  <Text>
                    <Strong>PR Title: </Strong> {prTitle}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Strong>PR Id: </Strong>
                    {prId}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Strong>PR status: </Strong>Open
                  </Text>
                </Box>
                <Box>
                  <Strong>Files changed/added/removed</Strong>
                </Box>
                <Box>
                  <ChangedFilesTable tableRows={tableRows} />
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Cancel
              </Button>
              <LoadingButton onClick={closeModal}>Review</LoadingButton>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default OverviewModal;
