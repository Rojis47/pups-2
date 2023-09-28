import { ReactNode } from "react";
import { useDogs } from "../providers/DogProviders";

export type SectionProps = {
  children: ReactNode;
};

const Selector = ({
  selectorType,
  label,
}: {
  selectorType: string;
  label: string;
}) => {
  const { dogs, activeSelector, setActiveSelector } = useDogs();
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);
  const isFavorite = selectorType === "favorite";
  const isUnfavorite = selectorType === "unfavorite";
  return (
    <div
      className={`selector ${activeSelector === selectorType ? "active" : ""}`}
      onClick={() =>
        setActiveSelector(
          activeSelector === selectorType ? "all" : selectorType
        )
      }
    >
      {label}
      {isFavorite && <span className="count">{favoriteDogs.length}</span>}
      {isUnfavorite && <span className="count">{unfavoriteDogs.length}</span>}
    </div>
  );
};

export const Section = ({ children }: SectionProps) => {
  const selectors = [
    { label: "favorites", selectorType: "favorite" },
    { label: "unfavorite", selectorType: "unfavorite" },
    { label: "create dog", selectorType: "create" },
  ];

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <div className="selectors">
          {selectors.map(({ label, selectorType }) => (
            <Selector
              key={selectorType}
              label={label}
              selectorType={selectorType}
            />
          ))}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
