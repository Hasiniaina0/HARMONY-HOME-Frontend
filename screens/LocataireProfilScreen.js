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
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { addPhoto, removePhoto } from "../reducers/user";
import { useIsFocused } from "@react-navigation/native";

export default function LocataireProfilScreen() {
  const dispatch = useDispatch();
  const [inputDate, setInputDate] = useState(undefined);
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [aPropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();

  console.log("selected images", selectedImages);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  // save la mise à jour
  const handleSaveProfil = async () => {
    fetch(`${BACKEND_URL}/updates/profil`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        numPhone,
        password,
        description,
        aPropos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil mis à jour:", data);
      });
  };

  // save photo dans cloudinary

  const formData = new FormData();
  selectedImages.forEach((photo, index) => {
    formData.append("photoFromFront[]", photo);
  });
  fetch(`${BACKEND_URL}/updates/photos`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())

    .then((data) => {
      console.log("photo maj", data);
      const cloudinaryURL = data.uri;
      console.log("cloudinaryURL", cloudinaryURL);
      // dispatch(addPhoto(cloudinaryURL));
    })
    .catch((error) => console.log(error));

  // if (!hasPermission || !isFocused) {
  //   return <View />;
  // }

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
      setSelectedImages([...selectedImages, ...result.assets]);
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
          placeholder="nouveau mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={styles.input}
          placeholder="A propos de toi ?!"
          value={aPropos}
          onChangeText={(aPropos) => setApropos(aPropos)}
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
    height: 200,
    width: 200,
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
