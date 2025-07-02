import { useState, type ReactNode } from "react";
import { type User, UserContext } from "./UserContext";

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  // add or remove favorite
  const toggleFavorite = (id: string) => {
    if (!user) return;
    const userCopy = { ...user };
    let favorites = [...user.favorites];
    if (user?.favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
    } else favorites.push(id);
    userCopy.favorites = favorites;
    setUser(userCopy);
  };

  // Update user data
  const updateUser = (userData: User) => setUser(userData);

  // Clear user data
  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider
      value={{ user, toggleFavorite, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
