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
            <div className={styles.discardPile}>
              <div>Discard Pile: {discardCardsQuantity} cards</div>
              <button
                onClick={onClickClearDiscardPile}
                className={styles.clearButton}
              >
                clear
              </button>
            </div>
            <div className={styles.info}>
              <div>Total: {totalCardsQuantity} cards</div>
              {!!drawnCard && (
                <div>
                  Drawing: {drawnCard?.category}-{drawnCard?.index}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
