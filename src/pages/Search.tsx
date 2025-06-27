import { useEffect, useState } from "react";
import Input from "../components/forms/Input";
import MainLayout from "../components/layouts/MainLayout";
import { useDebounce } from "../hooks/useDebounce";
import { fetchDogsByIds, getAllDogBreeds, searchDogs } from "../api/search";
import MultiSelect from "../components/forms/MultiSelect";
import TagInput from "../components/forms/TagInput";

type FormValues = {
  breeds: string[];
  zipCodes: string[];
  ageMin: string;
  ageMax: string;
};

const initialValues: FormValues = {
  breeds: [],
  zipCodes: [],
  ageMin: "",
  ageMax: "",
};

const Search = () => {
  const [results, setResults] = useState<any>();
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const debouncedValues = useDebounce(formValues, 500);
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const breeds = await getAllDogBreeds();
        setBreeds(breeds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      console.log("Debounced form values:", debouncedValues);
      const searchDogsRes = await searchDogs(debouncedValues);
      const dogInfo = await fetchDogsByIds(searchDogsRes.resultIds);
      setResults(dogInfo);
      //fetchDogsByIds
    };
    fetchDogs();
  }, [debouncedValues]);

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
                  ageMin: e.target.value,
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
                  ageMax: e.target.value,
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
        <div className="col-span-3 border h-full my-5 rounded">
          {results?.map((result) => {
            return <img src={result.img} />;
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
