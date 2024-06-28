import { CiSearch } from "react-icons/ci";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Card from "../components/Card";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Home = () => {
  // arama isteği
  const [searchTerm, setSearchTerm] = useState("");
  //sıralama
  const [order, setOrder] = useState(null);

  const debouncedTerm = useDebounce(searchTerm, 300);

  const params = {
    search: debouncedTerm,
    order,
  };

  // api isteği
  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", debouncedTerm, order],
    queryFn: () => api.get("/api/recipes", { params }).then((res) => res.data),
  });

  return (
    <main className="flex-1 bg-gray-200 p-4 overflow-auto">
      <section>
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
            type="text"
          />
        </div>
      </section>

      <section className="">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.results} tarif bulundu</h1>

              <select
                onChange={(e) => setOrder(e.target.value)}
                className="rounded p-2"
              >
                <option selected disabled>
                  Süreye Göre
                </option>
                <option value="asc">Artan</option>
                <option value="desc">Azalan</option>
              </select>
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data.recipes.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
