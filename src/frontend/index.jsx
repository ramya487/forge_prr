import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

import ForgeReconciler, {
  Text,
  Box,
  Stack,
  Form,
  useForm,
} from "@forge/react";
import DropDown from "../components/DropDown";
import OverviewModal from "../components/OverviewModal";
import { FETCH_PULL_REQUESTS_DIFF } from "../utils/urls";
import { extractFiles, formatFileList } from "../utils/functions";
import CommentModal from "../components/CommentModal";

const App = () => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);

  const [prTitle, setPRTitle] = useState("");
  const [prId, setPRId] = useState("");
  const [tableRows, setTableRows] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [comments, setComments] = useState([]);

  // comment modal
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const openCommentModal = () => setIsOpenCommentModal(true);
  const closeCommentModal = () => {
    setIsOpenCommentModal(false);
    setComments([]);
  };

  const submit = async (data) => {
    try {
      setLoading(true);
      const pr_id = data["pr"]["value"]; // pull request id is stored as value of dropdown
      const pr_title = data["pr"]["label"];
      setPRTitle(pr_title);
      setPRId(pr_id);
      const response = await invoke(FETCH_PULL_REQUESTS_DIFF, {
        prId: pr_id,
      });
      const diffText = response;
      const rows = formatFileList(extractFiles(diffText));
      setTableRows(rows);
      openModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Stack space="space.200">
        <Box>
          <Text>Hello!! this is PRR bot</Text>
        </Box>
        <Box>
          <Text>Select the PR to be reviewed..</Text>
        </Box>
        <Box>
          <DropDown register={register} />
        </Box>
        <Box>
          <OverviewModal
            loading={loading}
            isOpen={isOpen}
            closeModal={closeModal}
            tableRows={tableRows}
            prTitle={prTitle}
            prId={prId}
            setComments={setComments}
            comments={comments}
            openCommentModal={openCommentModal}
          />
          <CommentModal
            isOpenCommentModal={isOpenCommentModal}
            closeCommentModal={closeCommentModal}
            comments={comments}
            prId={prId}
          />
        </Box>
      </Stack>
    </Form>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
