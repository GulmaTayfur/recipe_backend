import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { toast } from "react-toastify";

const Layout = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
};

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const navigate = useNavigate();

  // api isteği
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/recipes", newRecipe),

    // api isteği başarılı olursa
    onSuccess: () => {
      toast.success("Yeni tarif oluşturuldu");
      navigate("/");
    },

    // api isteği başarısız olursa
    onError: () => {
      toast.error("Tarif oluşturulamadı");
    },
  });

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    //bütün input ve textarealardaki verilerden nesne oluştur
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    //select alanlarındaki verileri nesneye ekle
    newRecipe = {
      ...newRecipe,
      ingredients,
      instructions,
      image: `https://picsum.photos/5${Math.round(Math.random() * 89) + 10}`,
    };

    //api isteği atarken veriyi kaydet
    mutate(newRecipe);
  };
  return (
    <div className="flex-1 bg-gray-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className="font-bold text-3xl text-red-400">Yeni Tarif Oluştur</h1>

        <Layout label={"Tarif Başlığı"}>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            type="text"
            name="recipeName"
            required
          />
        </Layout>

        <Layout label={"Tarif Kategorisi"}>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            type="text"
            name="category"
            required
          />
        </Layout>
        <Layout label={"Tarif Süresi"}>
          <input
            className="rounded-md p-2 focus:outline-red-400"
            type="number"
            name="recipeTime"
            required
            min={3}
            max={500}
          />
        </Layout>
        <Layout label={"Malzemeler"}>
          <Select
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
            isMulti
            required
          />
        </Layout>
        <Layout label={"Tarif Adımları (Sırasına dikkat edin)"}>
          <Select
            onChange={(options) =>
              setInstructions(options.map((opt) => opt.value))
            }
            isMulti
            required
          />
        </Layout>
        <Layout label={"Sunum Önerisi"}>
          <textarea
            className="rounded-md p-2 focus:outline-red-400"
            type="text"
            name="servingSuggestion"
            required
          />
        </Layout>
        <div className="flex justify-end gap-6">
          <Link
            to={"/"}
            className="bg-gray-400 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500"
          >
            İptal
          </Link>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-red-400 px-4 rounded-md text-white font-semibold text-lg hover:bg-red-500"
          >
            {isLoading ? "Yükleniyor" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
