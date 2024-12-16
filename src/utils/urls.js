export const FETCH_PULL_REQUESTS = "/pullrequests"
export const FETCH_PULL_REQUEST_DIFF = (id) => {
    return `/pullrequests/${id}/diff`;
} // fetches all the files that have been added/removed/changed in the pull request
export const FETCH_COMMITS_IN_PULL_REQUEST = (id) => {
    return `/pullrequests/${id}/commits`;
} // fetches all the commits made to the pull request
export const FETCH_FILE_CONTENTS = (commitHash, path) => {
    return `/src/${commitHash}/${path}`;
}