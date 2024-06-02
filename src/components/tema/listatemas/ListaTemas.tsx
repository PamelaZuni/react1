import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import CardTemas from "../cardtemas/CardTemas";
import { ThreeDots } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
  const navigate = useNavigate();

  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar(`/temas`, setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        alert("O token expirou!");
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
    buscarTemas();
  }, [temas.length]);

  return (
    <>
      {temas.length === 0 && <ThreeDots visible={true} height="100" width="100" color="white" wrapperStyle={{}} wrapperClass="dna-wrapper mx-auto justify-center items-center" />}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div
            className="grid grid-cols-1 md:grid-cols-2
                                    lg:grid-cols-3 gap-8"
          >
            <>
              {temas.map((tema) => (
                <>
                  <CardTemas key={tema.id} tema={tema} />
                </>
              ))}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
export default ListaTemas;
