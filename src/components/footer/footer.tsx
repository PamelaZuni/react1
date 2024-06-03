import { ReactNode, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Envelope } from "@phosphor-icons/react";
import EnvelopeOpen from "../../assets/img/envelope-open.svg";
import Linkedin from "../../assets/img/linkedin-logo.svg";
import Github from "../../assets/img/github-logo.svg";

function Footer() {
  let data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <section className="flex flex-col items-center bg-slate-950 text-white py-3">
        <h2>Purrs Blog by Pamela Rodrigues | Copyright &copy; {data}</h2>
        <p>Contact </p>
        <div className="flex gap-2">
          <a href="https://github.com/PamelaZuni">
            <img src={Github} alt="Github logo" />
          </a>
          <a href="https://linkedin.com">
            <img src={Linkedin} alt="Linkedin Profile" />
          </a>
          <a href="https://mail.google.com/mail/u/1/#inbox?compose=GTvVlcRzBWVKNlwpkBtrqpmmMknbHtDRDBVRsFpdvKCGKNscNvMHHtPKHkVWlLwMzvHdRPbVhNtlW">
            <img src={EnvelopeOpen} alt="IG Logo" />
          </a>
        </div>
      </section>
    );
  }
  return <>{component}</>;
}

export default Footer;
