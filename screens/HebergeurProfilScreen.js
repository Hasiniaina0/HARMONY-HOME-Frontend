import React, { useEffect } from "react";
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
  ScrollView,
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
  const [aPropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCity(data.city);
        setApropos(data.aPropos);
        setDescription(data.description);
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
    fetch(`${BACKEND_URL}/updates/profil`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        city,
        description,
        aPropos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil mis à jour:", data);
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
      .finally(() => navigation.navigate("TabNavigator", { screen: "Thread" }));
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
          <Text style={styles.title}> Je mets à jour mon profil </Text>
          <TextInput
            style={styles.input}
            placeholder="ta ville"
            secureTextEntry={true}
            value={city}
            onChangeText={(city) => setCity(city)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Parlez nous de vous"
            value={aPropos}
            onChangeText={(aPropos) => setApropos(aPropos)}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Décrivez votre logement"
            value={description}
            onChangeText={(description) => setDescription(description)}
          ></TextInput>
          <Text> Partagez des photos de ce qui vous représente </Text>
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
