import { useCallback, useMemo, useState } from "react";
import styles from "./Main.module.scss";
import { Card, QuestionCategory, ZoomLevel } from "../types";
import { CARD_CATEGORY, ZOOM_LEVELS } from "../constants";
import {
  cardSize,
  getCardFromGlobalIndex,
  getSpritesImage,
  imagePosition,
  imageSize,
} from "../utils";
import { images } from "../assets/images/sprites";
import { Settings } from "./settings";

function Main() {
  const [zoomLevelKey, setZoomLevelKey] = useState<ZoomLevel>("m");

  const [selectedCategories, setSelectedCategories] = useState<
    QuestionCategory[]
  >(["normal", "act", "ippon"]);
  const [drawnCard, setDrawCard] = useState<Card | undefined>(undefined);
  const [discardCardsIndex, setDiscardCardsIndex] = useState<Set<number>>(
    new Set()
  );

  const totalCardsQuantity = useMemo(
    () =>
      selectedCategories.reduce(
        (accumulator, currentValue) =>
          accumulator + CARD_CATEGORY[currentValue].quantity,
        0
      ),
    [selectedCategories]
  );

  const image = useMemo(() => getSpritesImage(drawnCard), [drawnCard]);
  const imageFile = useMemo(() => {
    if (!image) return undefined;
    console.log(imageSize(image));
    return images[`${image?.category}_${image?.index}`];
  }, [image]);

  const handleClickDraw = useCallback(() => {
    if (discardCardsIndex.size >= totalCardsQuantity) {
      return;
    }

    let globalIndex;
    do {
      globalIndex = Math.floor(Math.random() * totalCardsQuantity);
    } while (discardCardsIndex.has(globalIndex));

    const card = getCardFromGlobalIndex(globalIndex, selectedCategories);
    setDrawCard(card);
    discardCardsIndex.add(globalIndex);
    setDiscardCardsIndex(new Set(discardCardsIndex));
  }, [totalCardsQuantity, discardCardsIndex, selectedCategories]);

  const handleClickCategoryCheckbox = useCallback(
    (category: QuestionCategory) => {
      selectedCategories.includes(category)
        ? setSelectedCategories(
            selectedCategories.filter((item) => item !== category)
          )
        : setSelectedCategories([category, ...selectedCategories]);
    },
    [selectedCategories]
  );

  const handleClickClearDiscardPile = useCallback(() => {
    setDiscardCardsIndex(new Set());
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.body}>
        {image && (
          <div
            className={styles.frame}
            style={{
              width: cardSize(zoomLevelKey)[0],
              height: cardSize(zoomLevelKey)[1],
              backgroundImage: `url(${imageFile})`,
              backgroundPosition: imagePosition(image, zoomLevelKey),
              backgroundSize: imageSize(image, zoomLevelKey),
            }}
          />
        )}
      </div>
      <div className={styles.footer}>
        <button onClick={handleClickDraw} className={styles.drawButton}>
          draw!
        </button>
        <Settings
          selectedCategories={selectedCategories}
          totalCardsQuantity={totalCardsQuantity}
          discardCardsQuantity={discardCardsIndex.size}
          drawnCard={drawnCard}
          onClickCategoryCheckbox={handleClickCategoryCheckbox}
          onClickClearDiscardPile={handleClickClearDiscardPile}
        />
      </div>
    </div>
  );
}

export default Main;
