import { Dog } from "./types";
const checkResponseStatus = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const BASE_URL = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> => {
  return fetch(BASE_URL + "/dogs")
    .then(checkResponseStatus)
    .then((dogs) => dogs as Dog[]);
};

const postDog = ({ dog }: { dog: Omit<Dog, "id"> }) => {
  return fetch(BASE_URL + "/dogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog),
  }).then(checkResponseStatus);
};

const deleteDogRequest = (id: number) => {
  return fetch(BASE_URL + `/dogs/${id}`, {
    method: "DELETE",
  }).then(checkResponseStatus);
};

const patchFavoriteForDog = ({
  id,
  dog,
}: {
  id: number;
  dog: Partial<Dog>;
}) => {
  return fetch(BASE_URL + `/dogs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog),
  }).then(checkResponseStatus);
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
