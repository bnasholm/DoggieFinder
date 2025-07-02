import Navbar from "../navigation/Navbar";
import { useUser } from "../../contexts/UserContext";

const MainLayout = ({
  activeMenu,
  children,
}: {
  activeMenu: string;
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
