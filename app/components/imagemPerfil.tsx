import { Alert, Image, Pressable, View } from "react-native";

import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import * as ImagePicker from "expo-image-picker";
import { ref as dbRef, set } from "firebase/database";
import { db, storage } from "@/firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";


export default function ImagemPerfil({}) {

    const { user, atualizaUsuario } = useContext(UserContext);

    async function abreGaleria() {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissao.status !== "granted") {
            Alert.alert("Permissão negada", "Preciso acessar suas fotos!");
            return null;
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!resultado.canceled) {
            const uri = resultado.assets[0].uri;
            return uri;
        }

        return null;
    }

    async function salvaImagem(uri: string) {
    try {
        console.log("SALVANDO:", uri);

        // 1. Pegar blob da imagem
        const response = await fetch(uri);
        const blob = await response.blob();

        // 2. Referência no Storage
        const fotoRef = ref(storage, `fotosPerfil/${user.uid}.jpg`);

        // 3. Upload do blob
        await uploadBytes(fotoRef, blob);

        // 4. Pegar URL
        const url = await getDownloadURL(fotoRef);

        // 5. Atualizar usuário
        const usuarioRef = dbRef(db, `usuarios/${user.uid}`);
        await set(usuarioRef, {
            ...user,
            fotoUrl: url,
        });

        console.log("URL FINAL:", url);

    } catch (error) {
        console.error("Erro ao salvar foto:", error);
        Alert.alert("Erro", "Não foi possível salvar a foto.");
    }
}

    async function trocaImagem() {

        const uri = await abreGaleria();

        if (!uri) {
            Alert.alert("Erro", "Nenhuma imagem selecionada!");
            return;
        }

        await salvaImagem(uri);

        atualizaUsuario(user?.uid);

        Alert.alert("Sucesso!","Imagem de perfil atualizada!")
    }

    return (
        <Pressable
            onPress={trocaImagem}
            style={{ width: 150, height: 150, justifyContent: "center", alignItems: "center" }}
        >
            <Image
                source={{ uri: user?.fotoUrl }}
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 100
                }}
            />
        </Pressable>
    );
};
