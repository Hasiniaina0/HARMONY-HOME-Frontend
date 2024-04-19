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
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setNumPhone(data.numPhone);
        setPassword(data.password);
        setConfirmPassword(data.confirmPassword);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        )
      );
  }, []);
  // save la mise à jour
  const handleSaveProfil = () => {
    fetch(`${BACKEND_URL}/updates/information`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        email,
        numPhone,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Informations mis à jour:", data);
        // save photo dans cloudinary

        const formData = new FormData();
        selectedImages.forEach((photo, index) => {
          formData.append(`photoFromFront-${index}`, {
            uri: photo?.uri,
            name: `photo-${index}.jpg`,
            type: photo?.mimeType,
          });
        });

        fetch(`${BACKEND_URL}/updates/photos/${token}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())

          .then((data) => {
            console.log("photo maj", data);
            // const cloudinaryURL = data.uri;
            // console.log("cloudinaryURL", cloudinaryURL);
            // dispatch(addPhoto(cloudinaryURL));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error))
      .finally(() => navigation.navigate("Account"));
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

    if (!result.canceled) {
      setSelectedImages([...selectedImages, ...result.assets]);
    }
  };

  return (
    <SafeAreaView style={styles.inputsContainer}>
      <ScrollView style={styles.scrollView}>
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
          <Text style={styles.title}>
            {" "}
            Je mets à jour mes informations personnelles{" "}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            secureTextEntry={true}
            value={nom}
            onChangeText={(nom) => setNom(nom)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={prenom}
            onChangeText={(prenom) => setPrenom(prenom)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            value={numPhone}
            onChangeText={(numPhone) => setNumPhone(numPhone)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          ></TextInput>
          {/* <Text> Partage des photos de ce qui te représente </Text>
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
          </View> */}
          <TouchableOpacity style={styles.button} onPress={handleSaveProfil}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
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
