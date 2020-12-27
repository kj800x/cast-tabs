import { createSong } from "./createSong.js";
import { updateSong } from "./updateSong";
import { deleteSong } from "./deleteSong";

export const Mutation = {
  resolver: {
    createSong,
    updateSong,
    deleteSong,
  },
};
