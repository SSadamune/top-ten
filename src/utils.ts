import { CARD_CATEGORY, IMAGE_SIZE, SPRITE_COLUMN_COUNT } from "./constants";
import type { Card, QuestionCategory, SpritesImage } from "./types";

export const getCardFromGlobalIndex = (
  index: number,
  selectedCategories: QuestionCategory[]
): Card =>
  index <= CARD_CATEGORY[selectedCategories[0]].quantity
    ? { index, category: selectedCategories[0] }
    : getCardFromGlobalIndex(
        index - CARD_CATEGORY[selectedCategories[0]].quantity,
        selectedCategories.slice(1)
      );

export const getSpritesImage = (card?: Card): SpritesImage | undefined => {
  if (!card || card.index >= CARD_CATEGORY[card.category].quantity) {
    return undefined;
  }

  let imageIndex = 0;
  let cardIndex = card.index;
  while (cardIndex > CARD_CATEGORY[card.category].imageSize[imageIndex]) {
    cardIndex -= CARD_CATEGORY[card.category].imageSize[imageIndex];
    imageIndex++;
  }

  const xPosition = Math.round(cardIndex % SPRITE_COLUMN_COUNT) * IMAGE_SIZE[0];
  const yPosition = Math.round(cardIndex / SPRITE_COLUMN_COUNT) * IMAGE_SIZE[1];

  return {
    category: card.category,
    index: imageIndex,
    position: [xPosition, yPosition],
  };
};
