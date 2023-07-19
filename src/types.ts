import { ALL_CATEGORIES } from "./constants";

export type QuestionCategory = (typeof ALL_CATEGORIES)[number];
export type Card = {
  index: number;
  category: QuestionCategory;
};
export type SpritesImage = {
  category: QuestionCategory;
  index: number;
  position: [number, number];
};
