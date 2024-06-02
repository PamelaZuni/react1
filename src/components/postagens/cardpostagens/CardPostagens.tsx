import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  return (
    <div
      className="border-slate-900 border 
          flex flex-col rounded overflow-hidden justify-between bubuwhite"
      // style={{ backgroundColor: "#fffff"}} can be used the inline css as well instead of bg_white
    >
      <div>
        <div className="flex w-full bg-blue-900 py-2 px-4 items-center gap-4">
          <img src={postagem.usuario?.foto} className="h-12 rounded-full" alt={postagem.usuario?.nome} />
          <h3 className="text-white text-lg font-bold text-center uppercase">{postagem.usuario?.nome}</h3>
        </div>
        <div className="p-4 ">
          <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
          {/* check if the tema in the line 24 below need to be changed since I changed the Theme line 24 to tema */}
          <p>{postagem.texto}</p>
          <p>Theme: {postagem.tema?.descricao}</p>
          <p>
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-white bg-blue-900 
                  hover:bg-indigo-300 flex items-center justify-center py-2"
        >
          <button>Edit</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-white bg-rose-300 
                  hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Delete</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
