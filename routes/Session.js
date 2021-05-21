import EncryptedStorage from 'react-native-encrypted-storage';


async function storeUserSession() {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                age : 21,
                token : "ACCESS_TOKEN",
                username : "emeraldsanto",
                languages : ["fr", "en", "de"]
            })
        );

        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
    }
}