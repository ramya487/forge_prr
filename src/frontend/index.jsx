import React, { useState } from "react";
import ForgeReconciler, {
  Text,
  Box,
  Stack,
  Button,
  Form,
  useForm,
} from "@forge/react";
import DropDown from "../components/DropDown";
import OverviewModal from "../components/OverviewModal";
import { instance } from "../axios/instance";
import { FETCH_PULL_REQUEST_DIFF } from "../utils/urls";
import { extractFiles, formatFileList } from "../utils/functions";

const App = () => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);

  const [prTitle, setPRTitle] = useState("");
  const [prId, setPRId] = useState("");
  const [tableRows, setTableRows] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submit = async (data) => {
    try {
      setLoading(true);
      const pr_id = data["pr"]["value"]; // pull request id is stored as value of dropdown
      const pr_title = data["pr"]["label"];
      setPRTitle(pr_title);
      setPRId(pr_id);
      const response = await instance.get(FETCH_PULL_REQUEST_DIFF(pr_id));
      const diffText = response.data;
      setTableRows(formatFileList(extractFiles(diffText)));
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
