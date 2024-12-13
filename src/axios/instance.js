import axios from "axios";
import {
  WORKSPACE,
  REPO_SLUG,
  REPOSITORY_ACCESS_TOKEN,
} from "../utils/constants";

export const instance = axios.create({
  baseURL: `https://api.bitbucket.org/2.0/repositories/${WORKSPACE}/${REPO_SLUG}`,
  headers: {
    Authorization: `Bearer ${REPOSITORY_ACCESS_TOKEN}`,
  },
});
