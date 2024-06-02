import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("You need to be logged in", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="container mx-auto m-4 rounded-2xl overflow-hidden">
      <img className="w-full h-72 object-cover border-b-8 border-white" src="https://cdn.pixabay.com/photo/2020/06/21/15/14/cats-paw-5325371_1280.png" alt="Profile Capa" />

      <img className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10" src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

      <div
        className="relative mt-[-6rem] h-72 flex flex-col    
         
                    bg-black text-white text-2xl items-center justify-center"

        // changed the h-80  at line 24 before it was h-72 - testing
      >
        <p>Name: {usuario.nome} </p>
        <p>Email: {usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;
