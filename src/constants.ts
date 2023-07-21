import type { QuestionCategory, ZoomLevel } from "./types";

/**
 * All categories of questions
 */
export const ALL_CATEGORIES = ["normal", "ippon", "act", "nsfw"];

/**
 * Constants related to the card categories and its corresponding sprite image resource files
 */
export const CARD_CATEGORY: {
  [K in QuestionCategory]: {
    /**
     * Quantity of cards in this card category
     */
    quantity: number;
    /**
     * Display name of this card category
     */
    displayName: string;
    /**
     * The number of card images contained in each sprite image file corresponding to this card category
     */
    imageSize: number[];
    /**
     * The number of rows in each sprite image corresponding to this card type
     * (including empty rows, i.e., black areas at the bottom of the image files)
     */
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

/**
 * The dimensions (in pixels) of a card image
 */
export const IMAGE_SIZE = [800, 1118];

/**
 * How many cards are there in each row of the sprite image
 */
export const SPRITE_COLUMN_COUNT = 10;

/**
 * The scaling ratio values for card images at each zoom level
 */
export const ZOOM_LEVELS: {
  [K in ZoomLevel]: { zoomRatio: number; displayName: string };
} = {
  s: { zoomRatio: 0.3, displayName: "小" },
  m: { zoomRatio: 0.4, displayName: "中" },
  l: { zoomRatio: 0.6, displayName: "大" },
  fullSize: { zoomRatio: 1, displayName: "原图" },
};
