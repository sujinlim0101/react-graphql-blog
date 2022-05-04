import { request } from "graphql-request";
const URL = "http://localhost:8000/graphql";

export const fetcher = (query, variables = {}) => request(URL, query, variables);

export const QueryKeys = {
  FEEDS: "FEEDS",
  FEED: "FEED",
  USERS: "USERS",
  USER: "USER",
};

export const findTargetFeedIndex = (pages, id) => {
  let feedIndex = -1;
  const pageIndex = pages.findIndex(({ feeds }) => {
    feedIndex = feeds.findIndex((feed) => feed.id === id);
    if (feedIndex > -1) {
      return true;
    }
    return false;
  });
  return { pageIndex, feedIndex };
};

export const getNewFeeds = (old) => ({
  pageParams: old.pageParams,
  pages: old.pages.map(({ feeds }) => ({ feeds: [...feeds] })),
});
