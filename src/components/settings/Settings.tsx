import { Card } from "../../types";
import styles from "./Settings.module.scss";
import { MouseEventHandler, useCallback, useRef, useState } from "react";

type Props = {
  totalCardsQuantity: number;
  discardCardsQuantity: number;
  drawnCard?: Card;
  onClickClearDiscardPile: () => void;
};
export function Settings({
  totalCardsQuantity,
  discardCardsQuantity,
  drawnCard,
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
              <div>合计：{totalCardsQuantity} 张卡</div>
            </div>
            {!!drawnCard && (
              <div className={styles.menuItem}>
                当前卡牌：{drawnCard?.category}-{drawnCard?.index}
              </div>
            )}
            <div className={styles.menuItem}>
              <div>弃牌堆：{discardCardsQuantity} 张卡</div>
              <button
                onClick={onClickClearDiscardPile}
                className={styles.clearButton}
              >
                重置
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
