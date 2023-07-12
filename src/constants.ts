import type { QuestionCategory } from "./types";

export const CARD_CATEGORY: {
  [K in QuestionCategory]?: {
    quantity: number;
    displayName: string;
    imageSize: number[];
  };
} = {
  normal: {
    quantity: 202,
    displayName: "普通",
    imageSize: [70, 60, 40, 32],
  },
  ippon: {
    quantity: 82,
    displayName: "大喜利",
    imageSize: [50, 32],
  },
  act: {
    quantity: 90,
    displayName: "表演",
    imageSize: [70, 20],
  },
  nsfw: {
    quantity: 50,
    displayName: "少儿不宜",
    imageSize: [50],
  },
};
