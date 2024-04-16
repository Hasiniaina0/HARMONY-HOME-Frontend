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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";
//import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HebergeurProfilScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [inputDate, setInputDate] = useState(undefined);
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [apropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSaveProfil = () => {
    console.log("profil enregistré", {
      nom,
      prenom,
      inputDate,
      email,
      numPhone,
      apropos,
      description,
    });
  };

  // ajouter une image à partir de la galerie du téléphone

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

    if (!result.cancelled) {
      setSelectedImages(result.assets.map((asset) => asset.uri));
    }
  };

  return (
    <View style={styles.inputsContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
        <DatePickerInput
          style={styles.date}
          locale="fr"
          label="Date de naissance"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
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
          placeholder="Qui serait votre colocataire idéal ?"
          secureTextEntry={true}
          value={apropos}
          onChangeText={(apropos) => setApropos(apropos)}
        />
        <TextInput
          style={styles.input}
          placeholder="Décrivez votre logement"
          secureTextEntry={true}
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <Text> Insérez des photos de votre logement </Text>
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
    </View>
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
    alignItems: "center",
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
  date: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
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
});
