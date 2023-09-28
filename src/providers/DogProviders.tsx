import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Requests } from "../api";
import { Dog } from "../types";
import { number } from "zod";
import { isBoolean } from "lodash-es";

type TDogsProvider = {
  dogs: Dog[];
  refetchDogs: () => void;
  removeDog: (id: number) => void;
  updateDogFavoriteStatus: (id: number, isFavorite: boolean) => void;
  activeSelector: string;
  setActiveSelector: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [activeSelector, setActiveSelector] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchDogs = () => {
    Requests.getAllDogs()
      .then(setDogs)
      .catch((error) => {
        console.error("Failed to fetch dogs:", error);
      });
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const removeDog = (id: number) => {
    setIsLoading(true);
    Requests.deleteDogRequest(id)
      .then(() => {
        refetchDogs();
      })
      .catch((error) => {
        console.error("Failed to delete dog:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //! having alot of trouble with optimistic rendering idkkk

  const updateDogFavoriteStatus = (id: number, isFavorite: boolean) => {
    const updatedDogs = dogs.map((dog) =>
      dog.id === id ? { ...dog, isFavorite } : dog
    );
    setDogs(updatedDogs);

    Requests.patchFavoriteForDog({ id, dog: { isFavorite } }).then(
      (response: Response) => {
        if (!response.ok) {
          console.error("Failed to update dog status:", response);
          setDogs((prevDogs) =>
            prevDogs.map((dog) =>
              dog.id === id ? { ...dog, isFavorite: !isFavorite } : dog
            )
          );
        }
      }
    );
  };

  return (
    <DogsContext.Provider
      value={{
        dogs,
        refetchDogs,
        removeDog,
        updateDogFavoriteStatus,
        activeSelector,
        setActiveSelector,
        setIsLoading,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
