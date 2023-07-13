export type QuestionCategory = "normal" | "ippon" | "act" | "nsfw";
export type Card = {
  index: number;
  category: QuestionCategory;
};
export type SpritesImage = {
  category: QuestionCategory;
  index: number;
  position: [number, number];
};
