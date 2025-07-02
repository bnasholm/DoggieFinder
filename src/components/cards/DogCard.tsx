import type { Dog } from "../../types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

const DogCard = ({ dog }: { dog: Dog }) => {
  const { user, toggleFavorite } = useUser();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 max-w-xs">
      <img
        src={dog.img}
        alt={dog.name || "Dog"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {dog.name || "Unnamed Dog"}
          </h3>
          <button
            onClick={() => toggleFavorite(dog.id)}
            className="text-red-500 text-xl"
          >
            {user?.favorites.includes(dog.id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">Breed: {dog.breed}</p>
        <p className="text-sm text-gray-600">
          Age: {dog.age} year{dog.age !== 1 ? "s" : ""}
        </p>
        <p className="text-sm text-gray-600">Zip Code: {dog.zip_code}</p>
      </div>
    </div>
  );
};

export default DogCard;
