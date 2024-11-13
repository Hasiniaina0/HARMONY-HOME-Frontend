import PubNub from "pubnub"; // pubnub pour gérer la communication en temps réel.
import { PubNubProvider } from "pubnub-react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Chat,
  MessageList,
  MessageInput,
} from "@pubnub/react-native-chat-components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); // Obtenir les dimensions de l'écran

export default function ChatScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const currentChannel = "Harmony-Home";
  const theme = "light";

  // Initialisation de PubNub avec les clés et l'utilisateur
  const pubnub = new PubNub({
    publishKey: process.env.EXPO_PUBLIC_PUBLISH_KEY,
    subscribeKey: process.env.EXPO_PUBLIC_SUSCRIBE_KEY,
    userId: user.token,
  });

  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons
        name="keyboard-backspace"
        size={width * 0.1}
        onPress={() => navigation.goBack()}
        style={styles.back}
      />
      <Text style={styles.greetingText}> Messages 👋</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <PubNubProvider client={pubnub}>
          <Chat {...{ currentChannel, theme }}>
            <MessageList />
            <MessageInput senderInfo={true} stickyFooter={true} />
          </Chat>
        </PubNubProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  greetingText: {
    color: "black",
    fontWeight: "bold",
    fontSize: width * 0.045,
    marginLeft: width * 0.04,
  },

  back: {
    color: "#4FAAAF",
    marginLeft: width * 0.03,
    marginTop: height * 0.04,
  },

  messageContainer: {
    marginVertical: height * 0.01,
    padding: width * 0.03,
    borderRadius: 10,
  },

  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    maxWidth: width * 0.7,
  },

  otherMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    maxWidth: width * 0.7,
  },

  messageText: {
    color: "black",
    fontSize: width * 0.04,
  },
});
