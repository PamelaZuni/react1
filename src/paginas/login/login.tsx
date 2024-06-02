import { Link, useNavigate } from "react-router-dom";
import "./login.css";
// import "./Login.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  console.log(JSON.stringify(usuarioLogin));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
          <h2 className="text-white text-5xl ">Login</h2>
          <div className="flex flex-col w-full text-white">
            <label htmlFor="usuario">User</label>
            <input type="text" id="usuario" name="usuario" placeholder="Usuario" className="border-2 border-slate-700 rounded p-2" value={usuarioLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
          <div className="flex flex-col w-full text-white">
            <label htmlFor="senha">Password</label>
            <input type="password" id="senha" name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2" value={usuarioLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-900 flex justify-center
                                   hover:bg-indigo-300 text-white w-1/2 py-2"
          >
            {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Login</span>}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Not have an account yet? {""}
            <Link to="/cadastro" className="text-blue-900 hover:underline">
              Register
            </Link>
          </p>
        </form>
        <div className="fundoLogin hidden lg:block">
          <img src="./src/assets/img/login-cat.png" alt="Cat purrs" />
        </div>
      </div>
    </>
  );
}

export default Login;
