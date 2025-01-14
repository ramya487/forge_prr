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
import {
  FETCH_COMMITS_IN_PULL_REQUEST,
  FETCH_FILE_CONTENTS,
} from "../utils/urls";
import axios from "axios";
import { invoke } from "@forge/bridge";

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
      const response = await invoke(FETCH_COMMITS_IN_PULL_REQUEST, { prId });
      const hash = response["values"][0]["hash"];
      setLatestCommitHash(hash);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFileContent = async (commitHash, path) => {
    try {
      const response = await invoke(FETCH_FILE_CONTENTS, {
        commitHash,
        path
      })
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [reviewing, setReviewing] = useState(false);
  const fn = async (code) => {
    try {
      setReviewing(true);
      const response = await axios.post("http://localhost:8000/review/invoke", {
        input: {
          code: code,
        },
      });
      const cleanedString = response.data["output"]
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/\s+/g, " ") // Replace all whitespace (spaces, tabs, newlines) with a single space
        .replace(/\n/g, "") // Remove any remaining newlines
        .replace(/\s*([\[\],])\s*/g, "$1"); // Remove extra spaces around brackets and commas
      console.log("cleaned string: ",cleanedString);
    } catch (error) {
      console.log(error);
    } finally {
      setReviewing(false);
    }
  };

  const reviewPullRequest = async () => {
    try {
      for (let i = 0; i < tableRows.length; i++) {
        const path = tableRows[i]["cells"][0]["content"];
        const fileContent = await fetchFileContent(latestCommitHash, path);
        await fn(fileContent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (prId) fetchLatestCommitHash();
  }, [prId]);

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
              <LoadingButton
                onClick={() => reviewPullRequest()}
                isLoading={reviewing}
              >
                Review
              </LoadingButton>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default OverviewModal;
