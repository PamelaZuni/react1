import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  // function getHours() {
  //   let res= ''
  //   const hora = new Date() .getHours() + 1
  //   if (hora >= 0 && hora < 6){
  //     res = "Boa Madrugada!"
  //   }
  //   else if (hora >= 6 && hora < 12) {
  //     res= "Bom dia!"
  //   }
  //   else if (hora >= 12 && hora < 18) {
  //     res= "Boa tarde!"
  //   }
  //   else {
  //     res= "Boa noite!"

  //   }
  //   return res

  // }
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login(`/usuarios/logar`, userLogin, setUsuario);
      ToastAlerta("Usuário autenticado com sucesso!", "sucesso");
      setIsLoading(false);
    } catch (error) {
      ToastAlerta("Dados do Usuário inconsistentes!", "erro");
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>{children}</AuthContext.Provider>;
}
