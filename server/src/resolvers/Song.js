import { order } from "./util/loaderOrderer";
import { get } from "./util/get";
import { db } from "../db";

const SONG_LOADER = db.prepareIn("SELECT * FROM Song WHERE id IN (!?!)");

export const Song = {
  resolver: {
    id: get("id"),
    title: get("title"),
    artist: get("artist"),
    album: get("album"),
    url: get("url"),
    content: ({ content }) => JSON.parse(content),
  },
  loader: async (ids) => {
    const result = SONG_LOADER.all(ids);
    return order(result, ids);
  },
};
