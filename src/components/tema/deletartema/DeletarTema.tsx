import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  const navigate = useNavigate();

  // Receber os dados do Tema, que será cadastrado ou atualizado
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("You must be logged in!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/temas");
  }

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Theme was successfully deleted!", "deleted");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Error Deleting Theme!", "error");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container w-1/3 mx-auto text-white">
      <h1 className="text-4xl text-center my-4">Delete the Theme</h1>
      <p className="text-center font-semibold mb-4">Are you sure you want to delete the following theme?</p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-blue-900 text-white font-bold text-2xl">Theme</header>
        <p className="p-8 text-3xl text-black bg-slate-200 h-full">{tema.descricao}</p>
        <div className="flex">
          <button className="text-slate-100 bg-red-300 hover:bg-red-600 w-full py-2" onClick={retornar}>
            No
          </button>
          <button
            className="w-full text-slate-100 bg-blue-900
                                 hover:bg-indigo-300 flex items-center justify-center"
            onClick={deletarTema}
          >
            {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Yes</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarTema;
