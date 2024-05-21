function Footer() {
  return (
    <>
      <section className="flex flex-col items-center bg-indigo-900 text-white py-3">
        <h2>Personal Blog Pamela Rodrigues | Copyright &copy;</h2>
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
    </>
  );
}

export default Footer;
