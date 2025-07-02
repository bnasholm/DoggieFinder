import { Link, useNavigate } from "react-router-dom";
import { NAV_PAGES } from "./constants";
import { useUser } from "../../contexts/UserContext";
import { logoutUser } from "../../api";
import { FaPaw } from "react-icons/fa";

const Navbar = ({ activeMenu }: { activeMenu: string }) => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleLogOut = async () => {
    try {
      await logoutUser();
      clearUser();
      navigate("/login");
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className="flex justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex gap-5">
        <h2 className="text-lg font-medium text-black flex gap-2 items-center">
          <span>
            <FaPaw />
          </span>
          DoggieFinder
        </h2>
        {NAV_PAGES.map(({ id, label, href }) => (
          <Link
            key={id}
            to={href}
            className={`${
              activeMenu === label.toLowerCase() ? "font-semibold" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
      <button className="cursor-pointer" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};

export default Navbar;
