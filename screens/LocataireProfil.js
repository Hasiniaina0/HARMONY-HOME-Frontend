import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
} from "react-native";

import { DatePickerInput } from "react-native-paper-dates";

const [nom, setNom] = useState("");
const [prenom, setPrenom] = useState("");
const [inputDate, setInputDate] = useState(undefined);
const [email, setEmail] = useState("");
const [numPhone, setNumPhone] = useState("");
const [apropos, setApropos] = useState("");
const [description, setDescription] = useState("");

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

export default function HomeScreen() {
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
      <DatePickerInput
        style={styles.date}
        locale="fr"
        label="date de naissance"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setPrenom(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de téléphone"
        value={numPhone}
        onChangeText={(numPhone) => setPrenom(numPhone)}
      />
      <TextInput
        style={styles.input}
        placeholder="A propos de toi ?!"
        secureTextEntry={true}
        value={apropos}
        onChangeText={(apropos) => setPrenom(apropos)}
      />
      <TextInput
        style={styles.input}
        placeholder="Parle nous de toi !"
        secureTextEntry={true}
        value={description}
        onChangeText={(description) => setPrenom(description)}
      />
      <Text> Partage des photos de ce qui te représente </Text>
      <Button title="Mettre à jour" onPress={handleSaveProfile} />
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
});
