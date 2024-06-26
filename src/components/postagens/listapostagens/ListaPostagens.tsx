import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaPostagens() {
  const navigate = useNavigate();

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      await buscar("/postagens", setPostagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("The token has expired, please log in again", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("You need to be logged in", "info");

      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);

  return (
    <>
      {postagens.length === 0 && <ThreeDots visible={true} height="100" width="100" color="white" wrapperStyle={{}} wrapperClass="circles-wrapper mx-auto justify-center items-center" />}
      <div
        className="container mx-auto my-4 
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {postagens.map((postagem) => (
          <CardPostagens key={postagem.id} postagem={postagem} />
        ))}
      </div>
    </>
  );
}

export default ListaPostagens;
