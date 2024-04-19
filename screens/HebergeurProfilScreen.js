// import React from "react";
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
import * as ImagePicker from "expo-image-picker";
//import { Avatar } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

//import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HebergeurProfilScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [password, setPassword] = useState("");
  const [apropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const EXPO_PUBLIC_BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  // save la mise à jour
  const handleSaveProfil = async () => {
    fetch(`${BACKEND_URL}/updates/profil`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        email,
        numPhone,
        password,
        description,
        apropos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil mis à jour:", data);
        navigation.navigate("TabNavigator", { screen: "Thread" });
      });

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
  };
  // if (!hasPermission || !isFocused) {
  //   return <View />;
  // }

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

        {/* <Avatar
          bg="green.500"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        ></Avatar> */}

        <Image source={require("../assets/logo.png")} style={styles.logo} />
        {/* <Text> Bienvenue {users.name} </Text> */}
        <Text style={styles.title}> Je mets à jours mes informations </Text>

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
          value={apropos}
          onChangeText={(apropos) => setApropos(apropos)}
        />
        <TextInput
          style={styles.input}
          placeholder="Décrivez votre logement"
          value={description}
          onChangeText={(description) => setDescription(description)}
        />
        <TextInput
          style={styles.input}
          placeholder="nouveau mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Text> Insérez des photos de votre logement </Text>
        <View style={styles.imageContainer}>
          {selectedImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
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
  // date: {
  //   height: 40,
  //   borderColor: "black",
  //   borderWidth: 0.5,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  //   backgroundColor: "white",
  // },
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
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  back: {
    color: "#4FAAAF",
  },
});
