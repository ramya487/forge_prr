import React, { useEffect, useState } from "react";
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
import { instance } from "../axios/instance";
import { FETCH_COMMITS_IN_PULL_REQUEST, FETCH_FILE_CONTENTS } from "../utils/urls";

const OverviewModal = ({
  loading,
  isOpen,
  closeModal,
  tableRows,
  prTitle,
  prId,
}) => {

  const [latestCommitHash, setLatestCommitHash] = useState("");
  const fetchLatestCommitHash = async () => {
    try {
      const response = await instance.get(FETCH_COMMITS_IN_PULL_REQUEST(prId));
      const hash = response.data['values'][0]['hash'];
      setLatestCommitHash(hash);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFileContent = async (commitHash, path) => {
    try {
      const response = await instance.get(FETCH_FILE_CONTENTS(commitHash, path));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const reviewPullRequest = async () => {
    try {
      for (let i = 0; i<tableRows.length; i++){
        const path = tableRows[i]['cells'][0]['content'];
        const fileContent = await fetchFileContent(latestCommitHash, path);
        // apply llm review logic
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (prId) fetchLatestCommitHash();
  }, [prId])

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
              <LoadingButton onClick={() => reviewPullRequest()}>Review</LoadingButton>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default OverviewModal;
