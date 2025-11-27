import { db } from "@/firebaseConfig";
import { get, ref } from "firebase/database";
import { createContext, useState, ReactNode } from "react";
import { Alert } from "react-native";

export type TotaisCategorias = {
    total:number;
    categorias:Record<string,number>
};

export type Usuario = {
    uid:string;
    fotoUrl:string;
    nome:string;
    email:string;
    limite:number;
    totais:{
        diario:TotaisCategorias;
        semanal:TotaisCategorias;
        mensal:TotaisCategorias;
    };
};

type UserContextType = {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    atualizaUsuario:(id:string | null)=>void;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    atualizaUsuario:()=>{}
});

type Props = {
    children: ReactNode;
};

export default function UserProvider({ children }: Props) {

    const [user, setUser] = useState<Usuario | null>(null);

    const atualizaUsuario = async (id:string|null):Promise<void> =>{

        if(!id){

            Alert.alert("Erro!","Usuario vazio!");
            return;
        }

        const referencia = ref(db,`usuarios/${id}`);
        
        const snap = await get(referencia);

        if(!snap.exists()){
            Alert.alert("Erro!","Usuario não encontrado!");
            return;
        }

        setUser(snap.val());
    }

    return (
        <UserContext.Provider value={{ user, setUser, atualizaUsuario }}>
            {children}
        </UserContext.Provider>
    );
}
