import { useMemo, useState } from "react";
import "./App.css";
import { QuestionCategory } from "./types";
import { CARD_CATEGORY } from "./constants";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<
    QuestionCategory[]
  >(["normal", "act", "ippon"]);

  const totalCardsQuantity = useMemo(
    () =>
      selectedCategories.reduce(
        (accumulator, currentValue) =>
          accumulator + (CARD_CATEGORY[currentValue]?.quantity ?? 0),
        0
      ),
    [selectedCategories]
  );

  return (
    <div className="App">
      <header className="App-header">
        <p>Total cards: {totalCardsQuantity}</p>
      </header>
    </div>
  );
}

export default App;
