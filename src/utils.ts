import {
  CARD_CATEGORY,
  IMAGE_SIZE,
  SPRITE_COLUMN_COUNT,
  ZOOM_LEVELS,
} from "./constants";
import type { Card, QuestionCategory, SpritesImage } from "./types";

export const getCardFromGlobalIndex = (
  index: number,
  selectedCategories: QuestionCategory[],
): Card =>
  index < CARD_CATEGORY[selectedCategories[0]].quantity
    ? { index, category: selectedCategories[0] }
    : getCardFromGlobalIndex(
        index - CARD_CATEGORY[selectedCategories[0]].quantity,
        selectedCategories.slice(1),
      );

export const getSpritesImage = (card?: Card): SpritesImage | undefined => {
  if (!card || card.index >= CARD_CATEGORY[card.category].quantity) {
    return undefined;
  }

  let imageIndex = 0;
  let cardIndex = card.index;
  while (cardIndex >= CARD_CATEGORY[card.category].imageSize[imageIndex]) {
    cardIndex -= CARD_CATEGORY[card.category].imageSize[imageIndex];
    imageIndex++;
  }

  const xPosition = Math.floor(cardIndex % SPRITE_COLUMN_COUNT);
  const yPosition = Math.floor(cardIndex / SPRITE_COLUMN_COUNT);

  return {
    category: card.category,
    index: imageIndex,
    position: [xPosition, yPosition],
  };
};

export const imageUrl = (image: SpritesImage): string =>
  `/assets/images/sprites/${image.category}_${image.index}.png`;

export const imagePosition = (
  image: SpritesImage,
  scalingLevel: keyof typeof ZOOM_LEVELS = "m",
): string =>
  `-${Math.round(
    image.position[0] * IMAGE_SIZE[0] * ZOOM_LEVELS[scalingLevel],
  )}px -${Math.round(
    image.position[1] * IMAGE_SIZE[1] * ZOOM_LEVELS[scalingLevel],
  )}px`;

export const imageSize = (
  image: SpritesImage,
  scalingLevel: keyof typeof ZOOM_LEVELS = "m",
): string =>
  `${Math.round(
    SPRITE_COLUMN_COUNT * IMAGE_SIZE[0] * ZOOM_LEVELS[scalingLevel],
  )}px ${Math.round(
    CARD_CATEGORY[image.category].imageRowCount[image.index] *
      IMAGE_SIZE[1] *
      ZOOM_LEVELS[scalingLevel],
  )}px`;
