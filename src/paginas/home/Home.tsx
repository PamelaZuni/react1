import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
  return (
    <>
      <div className="bg-indigo-900 flex justify-center">
        <div className="container grid grid-cols-2 text-white">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p className="text-xl">Expresse aqui seus pensamentos e opniões</p>

            <div className="flex justify-around gap-4">
              <div className="flex justify-around gap-4">
                <ModalPostagem />
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <img src="https://i.imgur.com/fyfri1v.png" alt="Imagem Página Home" className="w-2/3" />
          </div>
        </div>
      </div>

      <ListaPostagens />
    </>
  );
}

export default Home;

// function Home() {
//   return (
//     <>
//       <div className="bg-indigo-900 h-[calc(100vh-88px)] flex justify-center">
//         <div className=" container grid grid-cols-2 text-white items-center">
//           <div className=" gap-4 flex flex-col items-center  justify-center py-4">
//             <h2 className=" text-5xl font-bold">Seja Bem Vindo!</h2>
//             <p className="text-xl">Expresse aqui seus pensamentos e opniões</p>
//             <div
//               className="rounded text-white border-white  bg-indigo-400
//               border-solid border-2 py-2 px-4"
//             >
//               Nova postagem
//             </div>
//           </div>
//           <div className="flex ">
//             <img src="https://imgur.com/VpwApCU.png" alt="Imagem da Página da Home" width="400px" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Home;
