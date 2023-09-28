import { DogCard } from "./DogCard";
import { useDogs } from "../providers/DogProviders";

export const Dogs = () => {
  const {
    dogs,
    removeDog,
    updateDogFavoriteStatus,
    activeSelector,
    isLoading,
  } = useDogs();

  let filteredDogs = dogs;
  if (activeSelector === "favorite") {
    filteredDogs = dogs.filter((dog) => dog.isFavorite);
  } else if (activeSelector === "unfavorite") {
    filteredDogs = dogs.filter((dog) => !dog.isFavorite);
  }

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          isLoading={isLoading}
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => removeDog(dog.id)}
          onHeartClick={() => updateDogFavoriteStatus(dog.id, true)}
          onEmptyHeartClick={() => updateDogFavoriteStatus(dog.id, false)}
        />
      ))}
    </>
  );
};
