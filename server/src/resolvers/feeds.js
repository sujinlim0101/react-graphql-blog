import { v4 } from 'uuid'
import { writeDB } from '../db/dbController.js'

const setFeeds = data => writeDB('feeds', data)

const feedResolver = {
  Query: {
    feeds: (parent, { cursor = '' }, { db }) => {
      const fromIndex = db.feeds.findIndex(Feed => Feed.id === cursor) + 1
      return db.feeds?.slice(fromIndex, fromIndex + 15) || []
    },
    feed: (parent, { id = '' }, { db }) => {
      return db.feeds.find(Feed => Feed.id === id)
    },
  },
  Mutation: {
    createFeed: (parent, { text, userId }, { db }) => {
      if (!userId) throw Error('사용자가 없습니다.')
      const newFeed = {
        id: v4(),
        text,
        userId,
        timestamp: Date.now(),
      }
      db.feeds.unshift(newFeed)
      setFeeds(db.feeds)
      return newFeed
    },
    updateFeed: (parent, { id, text, userId }, { db }) => {
      const targetIndex = db.feeds.findIndex(Feed => Feed.id === id)
      if (targetIndex < 0) throw Error('메시지가 없습니다.')
      if (db.feeds[targetIndex].userId !== userId) throw Error('사용자가 다릅니다.')

      const newFeed = { ...db.feeds[targetIndex], text }
      db.feeds.splice(targetIndex, 1, newFeed)
      setFeeds(db.feeds)
      return newFeed
    },
    deleteFeed: (parent, { id, userId }, { db }) => {
      const targetIndex = db.feeds.findIndex(Feed => Feed.id === id)
      if (targetIndex < 0) throw '메시지가 없습니다.'
      if (db.feeds[targetIndex].userId !== userId) throw '사용자가 다릅니다.'
      db.feeds.splice(targetIndex, 1)
      setFeeds(db.feeds)
      return id
    },
  },
  Feed: {
    user: (feed, args, { db }) => db.users[feed.userId]
  }
}
export default feedResolver
