import { useState, useRef, useEffect } from "react";
import { useQueryClient, useMutation, useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

import { GET_FEEDS, CREATE_FEED, UPDATE_FEED, DELETE_FEED } from "../../graphql/feeds";
import { QueryKeys, fetcher, findTargetFeedIndex, getNewFeeds } from "../../service/queryClient";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import FeedItem from "../FeedItem/FeedItem";
import FeedInput from "../FeedInput/FeedInput";

import styles from './FeedList.module.css'

const FeedList = ({ sfeeds }) => {
  const client = useQueryClient();
  const { query } = useRouter();
  const userId = query.userId || query.userid || "";
  const [feedList, setFeedList] = useState([{ feeds: sfeeds }]);
  const [editingId, setEditingId] = useState(null);
  const moreRef = useRef(null);
  const intersecting = useInfiniteScroll(moreRef);

  const { mutate: onCreate } = useMutation(({ text }) => fetcher(CREATE_FEED, { text, userId }), {
    onSuccess: ({ createFeed }) => {
      client.setQueryData(QueryKeys.FEEDS, (old) => {
        return {
          pageParam: old.pageParam,
          pages: [{ feeds: [createFeed, ...old.pages[0].feeds] }, ...old.pages.slice(1)],
        };
      });
    },
  });

  const { mutate: onUpdate } = useMutation(({ text, id }) => fetcher(UPDATE_FEED, { text, id, userId }), {
    onSuccess: ({ updateFeed }) => {
      doneEdit();
      client.setQueryData(QueryKeys.FEEDS, (old) => {
        const { pageIndex, feedIndex } = findTargetFeedIndex(old.pages, updateFeed.id);
        if (pageIndex < 0 || feedIndex < 0) return old;
        const newFeeds = getNewFeeds(old);
        newFeeds.pages[pageIndex].feeds.splice(feedIndex, 1, updateFeed);
        return newFeeds;
      });
    },
  });

  const doneEdit = () => setEditingId(null);

  const { mutate: onDelete } = useMutation(id => fetcher(DELETE_FEED, { id, userId }), {
    onSuccess: ({ deleteFeed: deletedId }) => {
      client.setQueryData(QueryKeys.FEEDS, (old) => {
        const { pageIndex, feedIndex } = findTargetFeedIndex(old.pages, deletedId)
        if (pageIndex < 0 || feedIndex < 0) return old

        const newFeeds = getNewFeeds(old);
        newFeeds.pages[pageIndex].feeds.splice(feedIndex, 1)
        return newFeeds
      })
    },
  })

  const { data, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QueryKeys.FEEDS,
    ({ pageParam = '' }) => {
      return fetcher(GET_FEEDS, { cursor: pageParam })
    },
    {
      getNextPageParam: ({ feeds }) => {
        return feeds?.[feeds.length - 1]?.id
      },
    },
  )

  useEffect(() => {
    if (!data?.pages) return
    setFeedList(data.pages)
  }, [data?.pages])

  if (isError) {
    return null
  }

  useEffect(() => {
    if (intersecting && hasNextPage) fetchNextPage()
  }, [intersecting, hasNextPage])

  return (
    <>
      {userId && <FeedInput mutate={onCreate} />}
      <ul className={styles.list}>
        {feedList.map(({ feeds }, pageIndex) =>
          feeds.map(x => (
            <div>
              <FeedItem
                key={pageIndex + x.id}
                {...x}
                onUpdate={onUpdate}
                onDelete={() => onDelete(x.id)}
                startEdit={() => setEditingId(x.id)}
                isEditing={editingId === x.id}
                myId={userId}
              />
            </div>
          )),
        )}
      </ul>
      <div ref={moreRef} className={styles.more}/>
    </>
  );
};
export default FeedList;
