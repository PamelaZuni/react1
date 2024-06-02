import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar(`/temas`, setTemas, {
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
      ToastAlerta("You must be logged in", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Post successfully updated", "success");
      } catch (error: any) {
        console.log(error);
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Error updating Post", "error");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Post created successfully", "success");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Error when creating the Post", "error");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center text-white">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? "Edit Post" : "Create Post"}</h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="titulo">Post Title</label>
          <input type="text" placeholder="Title" name="titulo" required className="border-2 border-slate-700 rounded p-2 text-black" value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Post Text</label>
          <input type="text" placeholder="Text" name="texto" required className="border-2 border-slate-700 rounded p-2 text-black" value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <p>Post Theme</p>
          <select name="tema" id="tema" className="border p-2 border-slate-800 rounded text-black" onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>
              Select a Theme
            </option>

            {temas.map((tema) => (
              <>
                <option value={tema.id}>{tema.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200
                          hover:bg-blue-900 text-white font-bold w-1/2 
                          mx-auto py-2 flex justify-center"
          disabled={carregandoTema}
        >
          {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>{id !== undefined ? "Update" : "Create"}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
