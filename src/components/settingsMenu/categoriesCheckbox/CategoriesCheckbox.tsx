import { ALL_CATEGORIES, CARD_CATEGORY } from "../../../constants";
import { QuestionCategory } from "../../../types";
import styles from "./CategoriesCheckbox.module.scss";

type Props = {
  selectedCategories: QuestionCategory[];
  onClickItem: (category: QuestionCategory) => void;
};

export function CategoriesCheckbox({ selectedCategories, onClickItem }: Props) {
  const allCategoryList = [...ALL_CATEGORIES];
  return (
    <div className={styles.wrapper}>
      <div>{`问题类别`}</div>
      <div className={styles.categoryList}>
        {allCategoryList.map((category) => (
          <CategoriesCheckboxItem
            key={category}
            category={category}
            isChecked={selectedCategories.includes(category)}
            onClick={() => onClickItem(category)}
          />
        ))}
      </div>
    </div>
  );
}

function CategoriesCheckboxItem({
  category,
  isChecked,
  onClick,
}: {
  category: QuestionCategory;
  isChecked: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className={styles.item}>
      <div data-checked={isChecked} className={styles.checkbox} />
      <span className={styles.label}>
        {CARD_CATEGORY[category].displayName}
      </span>
    </div>
  );
}
