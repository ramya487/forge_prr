import React, { useEffect, useState } from "react";
import { Select } from "@forge/react";
import { getValuesArray, PRListToDropDown } from "../utils/functions";
import { FETCH_PULL_REQUESTS } from "../utils/urls";
import { invoke } from "@forge/bridge";

const DropDown = ({ register }) => {
  const [prlist, setPRList] = useState([]);
  const fetchPullRequests = async () => {
    try {
      const response = await invoke(FETCH_PULL_REQUESTS);
      setPRList(PRListToDropDown(getValuesArray(response)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPullRequests();
  }, []);

  return <Select appearance="default" options={prlist} {...register("pr")} />;
};

export default DropDown;
