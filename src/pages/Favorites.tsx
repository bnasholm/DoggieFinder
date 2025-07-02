import { useEffect, useState } from "react";
import DogCard from "../components/cards/DogCard";
import { useUser } from "../contexts/UserContext";
import type { Dog } from "../types";
import { fetchDogsByIds } from "../api";
import MainLayout from "../components/layouts/MainLayout";
import { matchByIds } from "../api/match";

const Favorites = () => {
  const [error, setError] = useState<string | undefined>();
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Dog[]>();
  const [matchCreated, setMatchCreated] = useState(false);
  const handleMatch = async () => {
    if (!user || !user.favorites || user.favorites.length === 0) return;
    try {
      await matchByIds(user.favorites);
      setMatchCreated(true);
      // reset button text after 2.5 s
      setTimeout(() => setMatchCreated(false), 2500);
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDogsInfo = async () => {
      if (!user || !user.favorites || user.favorites.length === 0) return;
      try {
        const dogInfo = await fetchDogsByIds(user.favorites);
        setFavorites(dogInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogsInfo();
  }, [user]);

  return (
    <MainLayout activeMenu="favorites">
      <div className="col-span-3 h-full my-5 rounded grid grid-cols-5 gap-4">
        {!favorites || favorites.length == 0 ? (
          <div className="col-span-3">
            <p className="p-4">You have not favorited any dogs.</p>
          </div>
        ) : (
          <>
            {favorites.map((dog: Dog) => {
              return <DogCard key={dog.id} dog={dog} />;
            })}
          </>
        )}
        {error && <p className="text-red">{error}</p>}
        {!!favorites && favorites.length > 0 && (
          <div className="col-span-5">
            <button
              className="px-3 py-1 rounded border text-sm bg-white text-gray-800 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              onClick={handleMatch}
            >
              {matchCreated ? "Match created" : `Create match(es)!`}
            </button>
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </MainLayout>
  );
};

export default Favorites;
