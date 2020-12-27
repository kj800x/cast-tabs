import { db } from "../../db";

const UPDATE_SONG = db.prepare(
  `UPDATE Song SET title = ?, artist = ?, source_url = ?, content = ? WHERE id = ?`
);

export const updateSong = (_, { id, payload }, context) => {
  const { title, artist, url, content } = payload;

  UPDATE_SONG.run(title, artist, url, content, id);

  return context.dataLoaders.Song.load(id);
};
