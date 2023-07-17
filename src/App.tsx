import { useCallback, useMemo, useState } from "react";
import styles from "./App.module.scss";
import { Card, QuestionCategory } from "./types";
import { CARD_CATEGORY } from "./constants";
import {
  getCardFromGlobalIndex,
  getSpritesImage,
  imagePosition,
  imageSize,
} from "./utils";
import { images } from "./assets/images/sprites";

function App() {
  // TODO: set
  const [selectedCategories] = useState<QuestionCategory[]>([
    "normal",
    "act",
    "ippon",
  ]);
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

  const handleClickClearDiscardPile = useCallback(() => {
    setDiscardCardsIndex(new Set());
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appBody}>
        {image && (
          <div
            className={styles.frame}
            style={{
              backgroundImage: `url(${imageFile})`,
              backgroundPosition: imagePosition(image),
              backgroundSize: imageSize(image),
            }}
          />
        )}
      </div>
      <div className={styles.appFooter}>
        <button onClick={handleClickDraw} className={styles.drawButton}>
          draw!
        </button>
        <div className={styles.subFooter}>
          <div className={styles.discardPile}>
            <div>Discard Pile: {discardCardsIndex.size} cards</div>
            <button
              onClick={handleClickClearDiscardPile}
              className={styles.clearButton}
            >
              clear
            </button>
          </div>
          <div className={styles.info}>
            <div>Total: {totalCardsQuantity} cards</div>
            {image && (
              <div>
                Drawing: {drawnCard?.category}-{drawnCard?.index}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
