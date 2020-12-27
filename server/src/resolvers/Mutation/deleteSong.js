import { db } from "../../db";

const DELETE_SONG = db.prepare(`DELETE FROM Song WHERE id = ?`);

export const deleteSong = (_, { id }) => {
  DELETE_SONG.run(id);

  return id;
};
