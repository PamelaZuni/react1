import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function NavBar() {
  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O usuário foi desconectado com sucesso!");
    navigate("/login");
  }

  return (
    <>
      <div
        className="w-full flex justify-center py-4
            			   bg-indigo-900 text-white"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/" className="text-2xl font-bold">
            Blog Pessoal
          </Link>
          <div className="flex gap-x-5 items-center">
            <Link to="/login">Login</Link>
            <Link to="/home">Home</Link>
            <Link to="">Postagens</Link>
            <Link to="">Temas</Link>
            <Link to="">Cadastrar Tema</Link>
            <Link to="">Perfil</Link>
            <Link to="" onClick={logout}>
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
