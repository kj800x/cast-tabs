import { db } from "../db";

const ALL_SONGS = db.prepare("SELECT id FROM Song").pluck();

export const Query = {
  resolver: {
    allSongs: async (_, __, context) => {
      const ids = ALL_SONGS.all();
      return context.dataLoaders.Song.loadMany(ids);
    },
  },
};
