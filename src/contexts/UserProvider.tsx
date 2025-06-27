import { useState, type ReactNode } from "react";
import { type User, UserContext } from "./UserContext";

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  // Update user data
  const updateUser = (userData: User) => setUser(userData);

  // Clear user data
  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
