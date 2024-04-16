import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import ImagePicker from "react-native-image-picker";
//import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";

export default function HebergeurProfilScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [inputDate, setInputDate] = useState(undefined);
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [apropos, setApropos] = useState("");
  const [description, setDescription] = useState("");

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

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

  // ajouter une image à partir de la gallerie du téléphone

  const handleSelectImage1 = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.error) {
        console.error("Erreur lors de la sélection d'image:", response.error);
      } else {
        console.log("Image sélectionnée:", response.uri);
        setSelectedImage1(response.uri);
      }
    });
  };

  const handleSelectImage2 = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.error) {
        console.error("Erreur lors de la sélection d'image:", response.error);
      } else {
        console.log("Image sélectionnée:", response.uri);
        setSelectedImage2(response.uri);
      }
    });
  };

  return (
    <View style={styles.inputsContainer}>
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
        placeholder="Qui serait votre colocataire idéal ?"
        secureTextEntry={true}
        value={apropos}
        onChangeText={(apropos) => setApropos(apropos)}
      />
      <TextInput
        style={styles.input}
        placeholder="Parlez nous de vous !"
        secureTextEntry={true}
        value={description}
        onChangeText={(description) => setDescription(description)}
      />
      <Text> Insérez des photos de votre logement </Text>
      <View style={styles.image}>
        {selectedImage1 && (
          <Image
            source={{ uri: selectedImage1 }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button title="Ajouter une image" onPress={handleSelectImage1} />
        {selectedImage2 && (
          <Image
            source={{ uri: selectedImage2 }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Button title="Ajouter une image" onPress={handleSelectImage2} />
      </View>
      <Button
        style={styles.maj}
        title="Mettre à jour"
        onPress={handleSaveProfil}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
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
  },
});
