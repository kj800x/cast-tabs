import { db } from "../../db";

const CREATE_SONG = db.prepare(`INSERT INTO Song (
    title,
    artist,
    source_url,
    content
  ) VALUES (
    ?,
    ?,
    ?,
    ?
  )`);

export const createSong = (_, { payload }, context) => {
  const { title, artist, url, content } = payload;

  const id = CREATE_SONG.run(title, artist, url, content).lastInsertRowid;

  return context.dataLoaders.Song.load(id);
};
