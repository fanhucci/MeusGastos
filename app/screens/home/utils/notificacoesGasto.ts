import * as Notifications from "expo-notifications";

export async function enviarNotificacaoLocal(titulo: string, corpo: string) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        sound: "default",
      },
      trigger: null, 
    });
  } catch (e) {
    console.warn("Erro ao exibir notificação:", e);
  }
}
