import { createContext, useContext } from "react";

export type User = {
  name: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
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
