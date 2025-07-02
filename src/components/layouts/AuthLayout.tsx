import { FaPaw } from "react-icons/fa";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
      <h2 className="text-lg font-medium text-black flex gap-2 items-center">
        <span>
          <FaPaw />
        </span>
        DoggieFinder
      </h2>
      {children}
    </div>
  );
};

export default AuthLayout;
