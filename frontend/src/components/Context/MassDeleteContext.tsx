import React, { createContext, useState, ReactNode, useEffect } from "react";
import { deleteFilm } from "../../services/filmService";

type DeleteContextType = {
  toggle: () => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
};

export const DeleteContext = createContext<DeleteContextType | null>(null);

const MassDeleteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggle = () => {
    if (selectedItems.length > 0) {
      deleteFilm(selectedItems);
      console.log(selectedItems);
    } else {
      console.warn("No items selected for deletion.");
    }
  };

  return (
    <DeleteContext.Provider value={{ setSelectedItems, toggle }}>
      {children}
    </DeleteContext.Provider>
  );
};

export default MassDeleteProvider;
