import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  let data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <section className="flex flex-col items-center bg-indigo-900 text-white py-3">
        <h2>Personal Blog Pamela Rodrigues | Copyright &copy; {data}</h2>
        <p>Acesse as Redes Sociais</p>
        <div className="flex gap-2">
          <a href="https://github.com/PamelaZuni">
            <img src="./src/assets/img/github-logo.svg" alt="Github logo" />
          </a>
          <a href="https://linkedin.com">
            <img src="./src/assets/img/linkedin-logo.svg" alt="Linkedin Profile" />
          </a>
          <a href="https://instagram.com">
            <img src="./src/assets/img/instagram-logo.svg" alt="IG Logo" />
          </a>
        </div>
      </section>
    );
  }
  return <>{component}</>;
}

export default Footer;
