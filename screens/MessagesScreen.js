import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const user = useSelector((state) => state.user);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      fetch(`${BACKEND_URL}/chat/messages/${user.token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des messages");
          }
          return response.json();
        })
        .then((data) => {
          setConversations(data); // Mettre à jour l'état avec les messages récupérés
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages :", error);
          // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        });
    };

    fetchMessages();
  }, [user.token]);

  const handleConversationPress = (conversation) => {
    navigation.navigate("MessageScreen", { conversation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text> Mes conversations </Text>

        {conversations.map((conversation, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleConversationPress(conversation)}
          >
            <TextInput
              style={styles.input}
              placeholder="Rechercher"
              value={message}
              onChangeText={(searchMessage) => setSearchMessage(searchMessage)}
            />
            <View key={index} style={styles.conversationContainer}>
              <Text style={styles.username}>{conversation.name}</Text>
              <ScrollView style={styles.messagesContainer}>
                {conversation.messages.map((message, index) => (
                  <Text key={index}>{message.text}</Text>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  conversationContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messagesContainer: {
    maxHeight: 200,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
