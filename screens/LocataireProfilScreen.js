import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
//import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

export default function LocataireProfilScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [inputDate, setInputDate] = useState(undefined);
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [apropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  // save la mise à jour
  const handleSaveProfil = () => {
    fetch(`${BACKEND_URL}/users/profil`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        numPhone,
        password,
        description,
        apropos,
      }),
    });

    const data = response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Une erreur est survenue lors de la mise à jour du profil"
      );
    }

    console.log("Profil mis à jour:", data);
  };

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Vous avez refusé l'accès aux photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      multiple: true,
    });

    if (!result.canceled) {
      setSelectedImages([
        ...selectedImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.inputsContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MaterialIcons
          name="keyboard-backspace"
          size={60}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}> Je mets à jours mes informations </Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={(nom) => setNom(nom)}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={(prenom) => setPrenom(prenom)}
        />
        {/* <DatePickerInput
        style={styles.date}
        locale="fr"
        label="date de naissance"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
      /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          value={numPhone}
          onChangeText={(numPhone) => setNumPhone(numPhone)}
        />
        <TextInput
          style={styles.input}
          placeholder="A propos de toi ?!"
          value={apropos}
          onChangeText={(apropos) => setApropos(apropos)}
        />
        <TextInput
          style={styles.input}
          placeholder="Parle nous de toi !"
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <Text> Partage des photos de ce qui te représente </Text>
        <View style={styles.imageContainer}>
          {selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.image}
            />
          ))}
          <Button
            title="Ajouter une image"
            onPress={showImagePicker}
            color="white"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSaveProfil}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 300,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  maj: {
    color: "white",
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    alignSelf: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "gray",
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4FAAAF",
    color: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
