import { ZOOM_LEVELS } from "../../../constants";
import { ZoomLevel } from "../../../types";
import styles from "./ZoomLevelRadio.module.scss";

type Props = {
  selectedZoomLevel: ZoomLevel;
  onClickItem: (level: ZoomLevel) => void;
};

export function ZoomLevelRadio({ selectedZoomLevel, onClickItem }: Props) {
  const allZoomLevelList: ZoomLevel[] = ["s", "m", "l", "fullSize"];
  return (
    <div className={styles.wrapper}>
      <div>{`图片大小`}</div>
      <div className={styles.zoomLevelList}>
        {allZoomLevelList.map((zoomLevel) => (
          <ZoomLevelRadioItem
            key={zoomLevel}
            zoomLevel={zoomLevel}
            isChecked={selectedZoomLevel === zoomLevel}
            onClick={() => onClickItem(zoomLevel)}
          />
        ))}
      </div>
    </div>
  );
}

function ZoomLevelRadioItem({
  zoomLevel,
  isChecked,
  onClick,
}: {
  zoomLevel: ZoomLevel;
  isChecked: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className={styles.item}>
      <div data-checked={isChecked} className={styles.checkbox} />
      <span className={styles.label}>{ZOOM_LEVELS[zoomLevel].displayName}</span>
    </div>
  );
}
