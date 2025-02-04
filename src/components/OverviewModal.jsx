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
  GET_BACKEND_URL,
} from "../utils/urls";
import { invoke } from "@forge/bridge";
import { formatComments } from "../utils/functions";

const OverviewModal = ({
  loading,
  isOpen,
  closeModal,
  tableRows,
  prTitle,
  prId,
  setComments,
  comments,
  openCommentModal,
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
        path,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const [reviewing, setReviewing] = useState(false);
  const fn = async (code) => {
    const backend_url = await invoke(GET_BACKEND_URL);
    try {
      setReviewing(true);
      const body = {
        input: {
          code: code
        }
      }
      const response = await fetch(`${backend_url}/review/invoke`, {
        method: "POST",
        body: JSON.stringify(body)
      })
      const cleanedJsonString = (await response.json())["output"]["content"]
        .replace(/^```json\n/, "") // Remove the starting ```json
        .replace(/```$/, "") // Remove the ending ```
        .replace(/\\n/g, "") // Remove newline escape sequences
        .replace(/\\t/g, "") // Remove tab escape sequences
        .trim(); // Trim any extra whitespace

      return JSON.parse(cleanedJsonString);
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
        const response = await fn(fileContent);
        const commentArray = response["issues"];
        const formattedCommentArray = formatComments(commentArray, path);
        setComments([...comments, ...formattedCommentArray]);
      }
      closeModal();
      openCommentModal();
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