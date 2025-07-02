import { createContext, useContext } from "react";

export type User = {
  name: string;
  email: string;
  favorites: string[]; // array of pet ids
};

export type UserContextType = {
  user: User | null;
  toggleFavorite: (id: string) => void;
  updateUser: (userData: User) => void;
  clearUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
