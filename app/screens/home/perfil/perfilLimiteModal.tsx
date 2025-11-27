import UserInputText from "@/app/components/userInputText";
import { UserContext } from "@/contexts/userContext";
import { useContext, useState, useEffect } from "react";
import { Modal, View } from "react-native";
import SubmitButton from "@/app/components/submitButton";
import { ref, update } from "firebase/database";
import { db } from "@/firebaseConfig";
import { cores } from "@/app/theme/referencias/colors";

export default function PerfilLimiteModal({ setter, getter }) {
    const { user, atualizaUsuario } = useContext(UserContext);

    const [limite, setLimite] = useState(user?.limite || 0);

    useEffect(() => {
        if (getter) {
            setLimite(user?.limite || 0);
        }
    }, [getter]);

    async function salvarLimite() {
        const refUsuario = ref(db, `usuarios/${user?.uid}`);

        await update(refUsuario, {
            limite: Number(limite)
        });

        atualizaUsuario(user?.uid);
        setter(false);
    }

    function fecharModal() {
        setter(false);
    }

    return (
        <Modal
            visible={getter}
            transparent={true}
            animationType="none"
            onRequestClose={fecharModal}
        >
            <View style={{
                        flex:1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                <View
                    style={{
                        width: "80%",
                        height: "20%",
                        borderRadius: 30,
                        backgroundColor: cores.tertiaryLight,
                        alignSelf: "center",
                        marginTop: "30%",
                        padding: 20,
                        justifyContent:"space-around",
                    }}
                >
                    <UserInputText
                        label="Limite"
                        onChangeText={setLimite}
                        teclado="default"
                        tipo="tertiary"
                        valor={String(limite)}
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-around",transform:[{scale:0.8}]}}>
                        <SubmitButton titulo="Cancelar" funcao={fecharModal} tipo="tertiary" />
                        <SubmitButton titulo="Salvar" funcao={salvarLimite} tipo="secondary" />
                    </View>
                    
                </View>
            </View>
        </Modal>
    );
}
