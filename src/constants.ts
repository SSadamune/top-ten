import type { QuestionCategory } from "./types";

export const CARD_CATEGORY: {
  [K in QuestionCategory]: {
    quantity: number;
    displayName: string;
    imageSize: number[];
    imageRowCount: number[];
  };
} = {
  normal: {
    quantity: 202,
    displayName: "普通",
    imageSize: [70, 60, 40, 32],
    imageRowCount: [7, 6, 6, 4],
  },
  ippon: {
    quantity: 82,
    displayName: "大喜利",
    imageSize: [50, 32],
    imageRowCount: [5, 5],
  },
  act: {
    quantity: 80,
    displayName: "表演",
    imageSize: [70, 10],
    imageRowCount: [7, 2],
  },
  nsfw: {
    quantity: 50,
    displayName: "少儿不宜",
    imageSize: [50],
    imageRowCount: [5],
  },
};

export const IMAGE_SIZE = [800, 1118];

export const SPRITE_COLUMN_COUNT = 10;

export const SCALING_FACTOR = 0.4;
