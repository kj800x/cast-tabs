import { db } from "../../db";

const UPDATE_SONG = db.prepare(
  `UPDATE Song SET title = ?, artist = ?, album = ?, source_url = ?, content = ? WHERE id = ?`
);

export const updateSong = (_, { id, payload }, context) => {
  const { title, artist, album, url, content } = payload;

  UPDATE_SONG.run(title, artist, album, url, content, id);

  return context.dataLoaders.Song.load(id);
};
