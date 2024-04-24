import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Chat,
  MessageList,
  MessageInput,
} from "@pubnub/react-native-chat-components";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const currentChannel = "Harmony-Home";
  const theme = "light";

  // const myUser = {
  //   id: user.token,
  //   name: user.nom,
  //   // profileUrl: user.photoProfil,
  // };

  const pubnub = new PubNub({
    publishKey: process.env.EXPO_PUBLIC_PUBLISH_KEY,
    subscribeKey: process.env.EXPO_PUBLIC_SUSCRIBE_KEY,
    userId: user.token,
  });

  return (
    <SafeAreaView>
      <MaterialIcons
        name="keyboard-backspace"
        size={60}
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
            <MessageInput senderInfo={true} />
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
    fontSize: 18,
    marginLeft: 15,
  },
  back: {
    color: "#4FAAAF",
  },
});
