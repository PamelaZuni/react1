import { RotatingLines } from "react-loader-spinner";
import { buscar, deletar } from "../../../services/Service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("You need to be logged in", "error");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Post deleted successfully", "success");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "error");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="container w-1/3 mx-auto text-white">
      <h1 className="text-4xl text-center my-4">Delete Post</h1>

      <p className="text-center font-semibold mb-4">Would you like to delete this post?</p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-blue-900 text-white font-bold text-2xl">Post</header>
        <div className="p-4 bg-white">
          <p className="text-xl h-full text-black">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button className="text-slate-100 bg-red-300 hover:bg-red-700 w-full py-2" onClick={retornar}>
            No
          </button>
          <button
            className="w-full text-slate-100 bg-blue-900 
                      hover:bg-indigo-300 flex items-center justify-center"
            onClick={deletarPostagem}
          >
            {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Yes</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
