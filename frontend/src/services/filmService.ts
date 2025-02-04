import { FilmData } from "../types/Film";

const API_BASE = "http://localhost/app/Connection";


export const fetchFilms = async (): Promise<FilmData[]> => {
  const response = await fetch(`${API_BASE}/Recive.php`);
  return response.json();
};


export const submitFilm = async (formData: { name: string; price: string; category: string; URL: string}) => {
  await fetch(`${API_BASE}/Submit.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return fetchFilms(); 
};


export const deleteFilm = async (filmID: number) => {
  await fetch(`${API_BASE}/Delete.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ID: filmID }),
  });
  return fetchFilms(); 
};
