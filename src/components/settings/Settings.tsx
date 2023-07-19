import { CARD_CATEGORY } from "../../constants";
import { Card, QuestionCategory } from "../../types";
import styles from "./Settings.module.scss";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import { CategoriesCheckbox } from "./categoriesCheckbox/CategoriesCheckbox";

type Props = {
  selectedCategories: QuestionCategory[];
  totalCardsQuantity: number;
  discardCardsQuantity: number;
  drawnCard?: Card;
  onClickCategoryCheckbox: (category: QuestionCategory) => void;
  onClickClearDiscardPile: () => void;
};
export function Settings({
  selectedCategories,
  totalCardsQuantity,
  discardCardsQuantity,
  drawnCard,
  onClickCategoryCheckbox,
  onClickClearDiscardPile,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickSettingIcon = useCallback(() => setShowMenu(true), []);
  const handleClickOverlay: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target === ref.current) {
        setShowMenu(false);
      }
    },
    [],
  );

  return (
    <>
      <div className={styles.settingIcon} onClick={handleClickSettingIcon} />
      {showMenu && (
        <div
          ref={ref}
          onClick={handleClickOverlay}
          className={styles.menuContainer}
        >
          <div className={styles.menu}>
            <div className={styles.menuItem}>
              <CategoriesCheckbox
                selectedCategories={selectedCategories}
                onClickItem={onClickCategoryCheckbox}
              />
            </div>
            <div className={styles.menuItem}>
              <div>{`合计：${totalCardsQuantity} 张卡`}</div>
            </div>
            {!!drawnCard && (
              <div className={styles.menuItem}>
                {`当前卡牌：${
                  CARD_CATEGORY[drawnCard?.category].displayName
                } #${drawnCard?.index}`}
              </div>
            )}
            <div className={styles.menuItem}>
              <div>{`弃牌堆：${discardCardsQuantity} 张卡`}</div>
              <button
                onClick={onClickClearDiscardPile}
                className={styles.clearButton}
              >
                {`重置`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
