import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
    const { granted } = await Notifications.getPermissionsAsync(); // Verificar se o dispositivo está autorizado
    
    if (!granted) {
        await Notifications.requestPermissionsAsync(); // Solicitar autorização
    }

    if(granted) {
        const pushToken = await Notifications.getExpoPushTokenAsync(); // Obter token
        console.log('DALEEE', pushToken.data);
        return pushToken.data;
    }
    
    
}