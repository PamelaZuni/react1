import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
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
        ToastAlerta("The token has expired!", "error");
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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("Theme Updated Successfully!", "success");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          ToastAlerta("The token has expired!", "error");
          handleLogout();
        } else {
          ToastAlerta("Error Updating the Theme!", "error");
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: { Authorization: token },
        });
        ToastAlerta("Theme Created Successfully!", "success");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          ToastAlerta("The token has expired!", "error");
          handleLogout();
        } else {
          ToastAlerta("Error Regostering the Theme!", "error");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  console.log(JSON.stringify(tema));

  return (
    <div className="container flex flex-col items-center justify-center mx-auto text-white">
      <h1 className="text-4xl text-center my-8">{id === undefined ? "Create a new Theme" : "Edit Theme"}</h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Theme Description</label>
          <input type="text" placeholder="Describe your topic here" name="descricao" className="border-2 border-slate-700 rounded p-2 text-black" value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <button
          className="rounded  bg-blue-900
                             hover:bg-indigo-300 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>{id === undefined ? "Create" : "Update"}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormTema;
