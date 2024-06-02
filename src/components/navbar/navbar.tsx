import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function NavBar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O usuário foi desconectado com sucesso!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div
        className="w-full flex justify-center py-4
                 bg-slate-950 text-white"
      >
        <div className="container flex justify-between text-lg">
          <Link to="/home" className="text-2xl font-bold">
            Purrs Blog
          </Link>

          <div className="flex gap-4">
            <Link to="/postagens" className="hover:underline">
              Posts
            </Link>
            <Link to="/temas" className="hover:underline">
              Theme
            </Link>
            <Link to="/cadastrartema" className="hover:underline">
              New Theme
            </Link>
            <Link to="/cadastrarpostagem" className="hover:underline">
              New Post
            </Link>
            <Link to="/perfil" className="hover:underline">
              Profile
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Exit
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <>{component}</>;
}

export default NavBar;
