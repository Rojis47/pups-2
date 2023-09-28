import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";

import { useDogs } from "../providers/DogProviders";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const { refetchDogs, isLoading, setIsLoading } = useDogs();

  const [userInput, setUserInput] = useState<Omit<Dog, "id">>({
    name: "",
    description: "",
    image: defaultSelectedImage,
    isFavorite: false,
  });

  const { name, description, image } = userInput;

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserInput((prev) => ({ ...prev, image: e.target.value }));
  };

  const createDog = () => {
    setIsLoading(true);
    Requests.postDog({ dog: userInput })
      .then(refetchDogs)
      .finally(() => setIsLoading(false));
  };

  const resetForm = () => {
    setUserInput({
      name: "",
      description: "",
      image: defaultSelectedImage,
      isFavorite: false,
    });
  };

  return (
    <form
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog();
        resetForm();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        value={name}
        onChange={handleUserInput}
        type="text"
        id="name"
        name="name"
        placeholder="Enter dog's name"
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        onChange={handleUserInput}
        id="description"
        name="description"
        cols={80}
        rows={10}
        placeholder="Enter dog's description"
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        value={image}
        onChange={handleImageChange}
        id="picture"
        name="picture"
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => (
          <option value={pictureValue} key={pictureValue}>
            {label}
          </option>
        ))}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
