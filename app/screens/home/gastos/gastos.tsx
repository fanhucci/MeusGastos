import { listaScreens } from "@/app";
import { baseScreenContainer } from "@/app/theme/tema";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import GastosHeader from "./gastosHeader";
import GastosBody from "./gastosBody";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { auth } from "@/firebaseConfig";
import CarregamentoModal from "@/app/components/carregamentoModal";

type GastosScreenNavigationProp = BottomTabNavigationProp<
  listaScreens,
  "HomeTabs"
>;

export type GastosScreenProp = {
  navigation: GastosScreenNavigationProp;
};

export default function GastosScreen({ navigation }: GastosScreenProp) {
  const [pesquisa, setPesquisa] = useState("");


  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { user, atualizaUsuario } = useContext(UserContext);

  useEffect(() => {
    if (auth.currentUser && !user) {
      atualizaUsuario(auth.currentUser.uid);
    }
  }, [user]);

  if (!user) {
    return <CarregamentoModal />;
  }

  return (
    <SafeAreaView style={baseScreenContainer.screenContainer}>

      <GastosHeader
        getter={pesquisa}
        setter={setPesquisa}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

 
      <GastosBody
        filtro={pesquisa}
        dataInicial={startDate}
        dataFinal={endDate}
      />
    </SafeAreaView>
  );
}
