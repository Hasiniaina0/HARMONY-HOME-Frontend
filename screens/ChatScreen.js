import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import {
  Chat,
  MessageList,
  MessageInput,
} from "@pubnub/react-native-chat-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ChatScreen() {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.greetingText}> Messages 👋</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* SafeAreaView and KeyboardAvoidingView are React Native utilities that 
      allow your app to be rendered within the safe area boundaries of a device */}
        <PubNubProvider client={pubnub}>
          {/* PubNubProvider is a part of the PubNub React SDK and allows you to access 
              PubNub instance in components down the tree. */}
          <Chat {...{ currentChannel, theme }}>
            {/* Chat is an obligatory state provider. It allows you to configure some 
                common component options, like the current channel and the general theme 
                for the app. */}
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
});
