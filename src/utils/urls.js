export const FETCH_PULL_REQUESTS = "/pullrequests"
export const FETCH_PULL_REQUEST_DIFF = (id) => {
    return `/pullrequests/${id}/diff`;
}