import { useCallback, useMemo, useState } from "react";
import styles from "./App.module.scss";
import { Card, QuestionCategory } from "./types";
import { CARD_CATEGORY } from "./constants";
import { getCardFromGlobalIndex, getSpritesImage } from "./utils";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<
    QuestionCategory[]
  >(["normal", "act", "ippon"]);
  const [drawnCard, setDrawCard] = useState<Card | undefined>(undefined);
  const [discardCardsIndex, setDiscardCardsIndex] = useState<number[]>([]);

  const totalCardsQuantity = useMemo(
    () =>
      selectedCategories.reduce(
        (accumulator, currentValue) =>
          accumulator + CARD_CATEGORY[currentValue].quantity,
        0
      ),
    [selectedCategories]
  );

  const handleClickDraw = useCallback(() => {
    if (discardCardsIndex.length >= totalCardsQuantity) {
      return;
    }

    let globalIndex;
    do {
      globalIndex = Math.floor(Math.random() * totalCardsQuantity);
    } while (discardCardsIndex.includes(globalIndex));

    const card = getCardFromGlobalIndex(globalIndex, selectedCategories);
    setDrawCard(card);
    setDiscardCardsIndex([...discardCardsIndex, globalIndex]);
  }, [totalCardsQuantity, discardCardsIndex, selectedCategories]);

  const image = useMemo(() => getSpritesImage(drawnCard), [drawnCard]);
  console.log(image);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <span>Total cards: {totalCardsQuantity}</span>
        <button onClick={handleClickDraw} className={styles.button}>
          draw!
        </button>
        <span>
          card drawn: {drawnCard?.category} {drawnCard?.index}
        </span>
      </header>
      <body className={styles.appBody}>
        {!!image && (
          <div
            className={styles.frame}
            style={{
              // backgroundImage: `url("./assets/images/sprites/act_0.png")`,
              backgroundPosition: `-${image.position[0]}px -${image.position[1]}px`,
            }}
          />
        )}
      </body>
    </div>
  );
}

export default App;
