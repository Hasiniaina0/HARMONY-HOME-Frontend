import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { login, logout } from "../reducers/user";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const ADRESS_IP = process.env.ADRESS_IP;

  const handleConnection = () => {
    fetch(`http://192.168.1.108:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token }));
          setEmail("");
          setPassword("");
          navigation.navigate("SignUp");
        }
      });
  };

  return (
    <ImageBackground style={styles.backgroundImage}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
          <Text style={styles.slogan}>sages dans une colocation pleine</Text>
          <Text style={styles.slogan}>de vie et de partage</Text>

          <View>
            <Text>Email:</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View>
              <Text>Email:</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <View>
              <Text>Mot de passe</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry={true}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => handleConnection()}
          >
            <Text style={styles.signInButtonText}>Connexion</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 360,
    height: 320,
  },
  slogan: {
    fontSize: 16,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    width: "90%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signInButton: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontSize: 15,
  },
});
