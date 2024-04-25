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
  Switch,
} from "react-native";
//import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { addPhotoProfil } from "../reducers/user";

export default function LocataireProfilScreen() {
  const [aPropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [photoProfil, setPhotoProfil] = useState("");
  const [isDisponible, setIsDisponible] = useState(false);
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCity(data.city);
        setApropos(data.aPropos);
        setDescription(data.description);
        setPhotoProfil(data.photoProfil);
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
          console.log("Boucle forEach photo uri", photo.uri);
          formData.append(`photoFromFront-${index}`, {
            uri: photo.uri,
            name: `photo-${index}.jpg`,
            type: "image/jpeg",
          });
        });
        console.log(" selectedImages", selectedImages);
        // console.log("formData" , formData.get("photoFromFront-0"));

        const regex = new RegExp("^http(s?)://");
        const photoProfilChanged = !regex.test(photoProfil);

        if (photoProfilChanged) {
          formData.append(`photoProfil`, {
            uri: photoProfil,
            name: "photo.jpg",
            type: "image/jpeg",
          });
        }
        console.log("photoProfil", photoProfil);
        // console.log("formData" , formData.get("photoProfil"));

        fetch(`${BACKEND_URL}/updates/photos/${token}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())

          .then((data) => {
            console.log("photo maj", data);
            dispatch(addPhotoProfil(data.photoProfil));
            dispatch(addPhoto(data.photos));
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

  // Fonction pour choisir une image de profil à partir de la galerie
  const showImagePickerProfil = async () => {
    // Demander la permission d'accéder à la galerie
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Vous avez refusé l'accès aux photos");
      return;
    }

    // Lancer la galerie pour choisir une image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      multiple: false, // Permet de choisir une seule image pour la photo de profil
    });

    // Remplacer l'image de profil actuelle par la nouvelle image sélectionnée
    if (!result.canceled && result.assets.length > 0) {
      const newImage = result.assets[0];
      setPhotoProfil(newImage.uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fond8.jpg")}
      style={styles.backgroundImage}
    >
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
          <ScrollView style={styles.scrollView}>
            {/* Section pour afficher et changer la photo de profil */}
            <View style={styles.profileImageContainer}>
              {/* Image de profil */}
              <TouchableOpacity onPress={showImagePickerProfil}>
                <Image
                  source={
                    photoProfil[0]
                      ? { uri: photoProfil[0] }
                      : require("../assets/photoProfil.png")
                  }
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.toggleContainer}>
              <Switch value={isDisponible} onValueChange={setIsDisponible} />
              <Text style={styles.toggleText}>
                {isDisponible
                  ? "Je cherche un logement"
                  : "Je ne cherche plus un logement"}
              </Text>
            </View>

            <Text style={styles.inputTitle}> Ville : </Text>
            <TextInput
              style={styles.input}
              placeholder="Ta ville"
              value={city}
              onChangeText={(city) => setCity(city)}
            ></TextInput>
            <Text style={styles.inputTitle}> A propos de toi : </Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Parles nous de toi !"
              value={aPropos}
              onChangeText={(aPropos) => setApropos(aPropos)}
              multiline={true} // Permet d'écrire sur plusieurs lignes
            ></TextInput>
            <Text style={styles.inputTitle}> Tes motivations : </Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Quelles sont tes motivations ?"
              value={description}
              onChangeText={(description) => setDescription(description)}
              multiline={true} // Permet d'écrire sur plusieurs lignes
            ></TextInput>

            <Text style={styles.inputTitle}>
              {" "}
              Partage des photos de ce qui te représente :{" "}
            </Text>
            <View style={styles.imageContainer}>
              {selectedImages.map((image, index) => (
                // Afficher chaque image partagée
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.image}
                />
              ))}
              <Button
                title="Ajouter une image"
                onPress={showImagePicker}
                color="#4FAAAF"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSaveProfil}>
              <Text style={styles.buttonText}>Mettre à jour</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 20,
    color: "#eb7134",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#4FAAAF",
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255,  0.3)",
  },
  button: {
    backgroundColor: "#4FAAAF",
    color: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255,  0.3)",
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    margin: 1,
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 10,
  },
  back: {
    color: "#eb7134",
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleText: {
    marginRight: 10,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
});
