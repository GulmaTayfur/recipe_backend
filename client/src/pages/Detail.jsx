import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaRegClock } from "react-icons/fa6";
import { toast } from "react-toastify";

const Title = ({ children }) => {
  return <h1 className="text-2xl font-bold mb-4 text-red-400">{children}</h1>;
};

const Detail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // veri çekme querysi
  const { isLoading, error, data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get(`api/recipes/${id}`).then((res) => res.data.recipe),
  });

  //silme isteği için mutate kullanacağız
  const deleteMut = useMutation({
    mutationFn: () => api.delete(`api/recipes/${id}`),

    onSuccess: () => {
      navigate("/");
      toast.success("Tarif kaldırıldı");
    },

    onError: () => {
      toast.error("Bir şeyler ters gitti");
    },
  });
  return (
    <div className="flex-1 bg-gray-200 p-5 h-screen overflow-auto">
      <div className="flex justify-between">
        <Link
          to={-1}
          className="flex items-center gap-4 text-xl hover:bg-gray-300 p-1 rounded-md"
        >
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <button
          disabled={isLoading}
          onClick={() => deleteMut.mutate()}
          className="bg-red-500 flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-red-600"
        >
          <FaTrashAlt />
          {isLoading ? "Yükleniyor" : "Sil"}
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="max-w-5xl m-auto my-10 flex flex-col gap-10">
          <h1 className="text-3xl font-bold">{data.recipeName}</h1>
          <div className=" flex gap-4">
            <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold">
              {data.category}
            </span>
            <span className="bg-yellow-500 py-2 px-4 rounded-lg text-white font-semibold flex items-center gap-3">
              <FaRegClock />
              {data.recipeTime}
            </span>
          </div>
          <img
            className="rounded-lg max-h-[400px]"
            src={data.image}
            alt={data.recipeName}
          />

          <div>
            <Title>Malzemeler</Title>

            <ul className="font-semibold text-lg">
              {data.ingredients.map((i) => (
                <li>{i}</li>
              ))}
            </ul>
          </div>

          <div>
            <Title>Tarif</Title>

            <ol className="font-semibold text-lg list-decimal ps-5">
              {data.instructions.map((i) => (
                <li>{i}</li>
              ))}
            </ol>
          </div>

          <div>
            <Title>Sunum Önerisi</Title>
            <p>{data.servingSuggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
