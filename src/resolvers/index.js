import api, { route } from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("FETCH_PULL_REQUESTS", async ({ context }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;
  const res = await api
    .asApp()
    .requestBitbucket(
      route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests`,
      {
        method: "GET",
      }
    );

  return res.json();
});

resolver.define("FETCH_PULL_REQUESTS_DIFF", async ({ context, payload }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;
  const prId = payload.prId;
  const res = await api
    .asApp()
    .requestBitbucket(
      route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${prId}/diff`,
      {
        method: "GET",
      }
    );
  return res.text(); // diff returned is a text
});

resolver.define(
  "FETCH_COMMITS_IN_PULL_REQUEST",
  async ({ context, payload }) => {
    const workspaceId = context.workspaceId;
    const repositoryId = context.extension.repository.uuid;
    const prId = payload.prId;
    const res = await api
      .asApp()
      .requestBitbucket(
        route`/2.0/repositories/${workspaceId}/${repositoryId}/pullrequests/${prId}/commits`,
        {
          method: "GET",
        }
      );
    return res.json();
  }
);

resolver.define("FETCH_FILE_CONTENTS", async ({ context, payload }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;
  const commitHash = payload.commitHash;
  const encodedPath = encodeURIComponent(payload.path);
  const res = await api
    .asApp()
    .requestBitbucket(
      route`/2.0/repositories/${workspaceId}/${repositoryId}/src/${commitHash}/${encodedPath}`,
      {
        method: "GET",
      }
    );
  return res.text(); // since contents of the file in a particular commit is returned as text
});

export const handler = resolver.getDefinitions();
