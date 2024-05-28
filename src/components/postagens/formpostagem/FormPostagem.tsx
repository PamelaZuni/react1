import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import Tema from "../../../models/Tema";

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
      alert("Você precisa estar logado");
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
        const postagemAtualizada = {
          id: postagem.id,
          titulo: postagem.titulo,
          texto: postagem.texto,
          theme: {
            id: postagem.tema?.id,
          },
        };
        await atualizar(`/postagens`, postagemAtualizada, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        alert("Postagem atualizada com sucesso");
      } catch (error: any) {
        console.log(error);
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar a Postagem");
        }
      }
    } else {
      try {
        console.log(postagem); //testing
        const newPostagem = {
          titulo: postagem.titulo,
          texto: postagem.texto,
          theme: {
            id: postagem.tema?.id,
          },
        };
        console.log("postagem.tema?.id", postagem.tema?.id);
        // const { data, ...newPostagem } = postagem;
        await cadastrar(`/postagens`, newPostagem, setPostagem, {
          //testing
          headers: {
            Authorization: token,
          },
        });

        alert("Postagem cadastrada com sucesso");
      } catch (error: any) {
        console.log(error); //testing here
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar a Postagem");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}</h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input type="text" placeholder="Titulo" name="titulo" required className="border-2 border-slate-700 rounded p-2" value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>
          <input type="text" placeholder="Texto" name="texto" required className="border-2 border-slate-700 rounded p-2" value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select name="tema" id="tema" className="border p-2 border-slate-800 rounded" onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>
              Selecione um Tema
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
          className="rounded disabled:bg-slate-200 bg-indigo-400 
                          hover:bg-indigo-800 text-white font-bold w-1/2 
                          mx-auto py-2 flex justify-center"
          disabled={carregandoTema}
        >
          {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;

// import { RotatingLines } from "react-loader-spinner";
// import { buscar, deletar } from "../../../services/Service";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../contexts/AuthContext";
// import { useNavigate, useParams } from "react-router-dom";
// import Postagem from "../../../models/Postagem";

// function DeletarPostagem() {
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

//   const { id } = useParams<{ id: string }>();

//   const { usuario, handleLogout } = useContext(AuthContext);
//   const token = usuario.token;

//   async function buscarPorId(id: string) {
//     try {
//       await buscar(`/postagens/${id}`, setPostagem, {
//         headers: {
//           Authorization: token,
//         },
//       });
//     } catch (error: any) {
//       if (error.toString().includes("403")) {
//         handleLogout();
//       }
//     }
//   }

//   useEffect(() => {
//     if (token === "") {
//       alert("Você precisa estar logado");
//       navigate("/login");
//     }
//   }, [token]);

//   useEffect(() => {
//     if (id !== undefined) {
//       buscarPorId(id);
//     }
//   }, [id]);

//   async function deletarPostagem() {
//     setIsLoading(true);

//     try {
//       await deletar(`/postagens/${id}`, {
//         headers: {
//           Authorization: token,
//         },
//       });

//       alert("Postagem apagada com sucesso");
//     } catch (error: any) {
//       if (error.toString().includes("403")) {
//         handleLogout();
//       } else {
//         alert("Erro ao deletar a postagem.");
//       }
//     }

//     setIsLoading(false);
//     retornar();
//   }

//   function retornar() {
//     navigate("/postagens");
//   }

//   return (
//     <div className="container w-1/3 mx-auto">
//       <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>

//       <p className="text-center font-semibold mb-4">Você tem certeza de que deseja apagar a postagem a seguir?</p>

//       <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
//         <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">Postagem</header>
//         <div className="p-4">
//           <p className="text-xl h-full">{postagem.titulo}</p>
//           <p>{postagem.texto}</p>
//         </div>
//         <div className="flex">
//           <button className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2" onClick={retornar}>
//             Não
//           </button>
//           <button
//             className="w-full text-slate-100 bg-indigo-400
//                       hover:bg-indigo-600 flex items-center justify-center"
//             onClick={deletarPostagem}
//           >
//             {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Sim</span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeletarPostagem;
