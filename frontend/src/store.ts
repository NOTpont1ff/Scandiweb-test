import { create } from "zustand";
import { deleteFilm } from "./services/filmService";

type FilmStore = {
  selectedItems: number[];
  toggleSelection: (FilmID: number) => void;
  toggleDelete: () => void;
};

export const useFilmStore = create<FilmStore>((set, get) => ({
  selectedItems: [],
  
  toggleSelection: (FilmID: number) => {
    const { selectedItems } = get();
    
    const updatedSelectedItems = selectedItems.includes(FilmID)
      ? selectedItems.filter((id) => id !== FilmID)
      : [...selectedItems, FilmID];

    set({ selectedItems: updatedSelectedItems });

    console.log("Selected items:", updatedSelectedItems);
  },

  toggleDelete: () => {
    
    const { selectedItems } = get();

    if (selectedItems.length > 0) {
      console.log("Deleting items:", selectedItems);


      set({ selectedItems: [] });
      deleteFilm(selectedItems);
    } else {
      console.warn("No items selected for deletion.");
    }
  },
}));
