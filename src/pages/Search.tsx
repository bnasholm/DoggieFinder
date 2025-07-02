import { useEffect, useMemo, useState } from "react";
import Input from "../components/forms/Input";
import MainLayout from "../components/layouts/MainLayout";
import { useDebounce } from "../hooks/useDebounce";
import { fetchDogsByIds, getAllDogBreeds, searchDogs } from "../api/search";
import MultiSelect from "../components/forms/MultiSelect";
import TagInput from "../components/forms/TagInput";
import type { Dog } from "../types";
import DogCard from "../components/cards/DogCard";
import Pagination from "../components/navigation/Pagination";

type FormValues = {
  breeds: string[];
  zipCodes: string[];
  ageMin: number;
  ageMax: number;
};

const initialValues: FormValues = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: 25,
};

const sortOptions = [
  { label: "Name (A–Z)", value: "name:asc" },
  { label: "Name (Z–A)", value: "name:desc" },
  { label: "Age (Youngest)", value: "age:asc" },
  { label: "Age (Oldest)", value: "age:desc" },
  { label: "Breed (A–Z)", value: "breed:asc" },
];

const Search = () => {
  const [error, setError] = useState<string | undefined>();
  const [allDogs, setAllDogs] = useState<Dog[]>();
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const debouncedValues = useDebounce(formValues, 500);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name:asc");
  const [currentPage, setCurrentPage] = useState(1);
  const RESULTS_PER_PAGE = 12;
  const [totalResults, setTotalResults] = useState(0);
  const totalPages = useMemo(
    () => Math.ceil(totalResults / RESULTS_PER_PAGE),
    [totalResults]
  );

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const breeds = await getAllDogBreeds();
        setBreeds(breeds);
      } catch (error) {
        setError("Something went wrong");
        console.log(error);
      }
    };
    fetchDogBreeds();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedValues]);

  useEffect(() => {
    const fetchDogs = async () => {
      const offset = (currentPage - 1) * RESULTS_PER_PAGE;
      try {
        const searchDogsRes = await searchDogs({
          ...debouncedValues,
          sort: sortBy,
          from: offset,
          size: RESULTS_PER_PAGE,
        });
        setTotalResults(searchDogsRes.total);
        const dogInfo = await fetchDogsByIds(searchDogsRes?.resultIds);
        setAllDogs(dogInfo);
      } catch (error) {
        setError("Something went wrong");
        console.log(error);
      }
    };
    fetchDogs();
  }, [currentPage, debouncedValues, sortBy]);

  return (
    <MainLayout activeMenu="search">
      <div className="grid grid-cols-4 gap-8">
        <div className="my-5">
          <form className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              {breeds.length > 0 && (
                <MultiSelect
                  label="Dog Breeds"
                  options={breeds}
                  selected={formValues.breeds}
                  onChange={(breeds) =>
                    setFormValues((prev) => ({ ...prev, breeds }))
                  }
                />
              )}
            </div>

            <Input
              label="Min Age"
              type="number"
              placeholder="Any"
              min={0}
              max={25}
              value={formValues.ageMin}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  ageMin: Number(e.target.value),
                }))
              }
            />

            <Input
              label="Max Age"
              type="number"
              placeholder="Any"
              min={0}
              max={25}
              value={formValues.ageMax}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  ageMax: Number(e.target.value),
                }))
              }
            />

            <div className="col-span-2">
              <TagInput
                label="Zip Codes"
                placeholder="Enter a zip code and press Enter"
                values={formValues.zipCodes}
                onChange={(zipCodes) =>
                  setFormValues((prev) => ({ ...prev, zipCodes }))
                }
              />
            </div>
          </form>
        </div>

        <div className="col-span-3 h-full my-5 rounded grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="sortBy"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">{`${totalResults} Results`} </div>
          {!allDogs?.length && <p className="p-4">No dogs found.</p>}
          {allDogs?.map((dog: Dog) => {
            return <DogCard key={dog.id} dog={dog} />;
          })}
          <div className="col-span-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
