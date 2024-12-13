import React from "react";
import { DynamicTable } from "@forge/react";

const ChangedFilesTable = ({tableRows}) => {
  return <DynamicTable rows={tableRows} rowsPerPage={5} />;
};

export default ChangedFilesTable;
