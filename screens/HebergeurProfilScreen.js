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
import * as ImagePicker from "expo-image-picker";
//import { Avatar } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { addPhoto, addPhotoProfil } from "../reducers/user";

//import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HebergeurProfilScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [aPropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [photoProfil, setPhotoProfil] = useState("");
  const token = useSelector((state) => state.user.token);
  const [availability, setAvailability] = useState("Logement disponible");
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données de l'utilisateur:", data);
        setCity(data.city);
        setApropos(data.aPropos);
        setDescription(data.description);
        setPhotoProfil(data.photoProfil);
        setAvailability(data.available);
      });
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
        photoProfil,
        available: availability,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Profil mis à jour:", data);
        // save photo dans cloudinary
        const formData = new FormData();

        selectedImages.forEach((photo, index) => {
          formData.append(`photoFromFront-${index}`, {
            uri: photo.uri,
            name: `photo-${index}.jpg`,
            type: "image/jpeg",
          });
        });

        fetch(`${BACKEND_URL}/updates/photos/${token}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())

          .then((data) => {
            console.log("photos maj", data);
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
      setProfileImageUrl(newImage.uri);
      setSelectedImages([newImage]); // Mettre à jour selectedImages avec la nouvelle photo de profil
    }
  };

  const handleSavePhotoProfil = async () => {
    if (selectedImages.length === 0) {
      return;
    }

    // Préparer les données de l'image de profil pour l'envoi
    const formData = new FormData();
    const photoProfil = selectedImages[0]; // Prenez la première image comme photo de profil
    formData.append("photoProfil", {
      uri: photoProfil.uri,
      name: "photoProfil.jpg",
      type: photoProfil.mimeType,
    });

    // Envoyer la photo de profil au serveur
    const response = await fetch(
      `${BACKEND_URL}/updates/photoProfil/${token}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      console.log("Photo de profil mise à jour avec succès:", data);
      setProfileImageUrl(photoProfil.uri); // Mettre à jour l'URL de l'image de profil après une mise à jour réussie
    }
  };

  // Interface utilisateur du composant
  return (
    <SafeAreaView style={styles.inputsContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Bouton de retour */}
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

          {/* Toggle Switch pour choisir entre logement disponible ou indisponible */}
          <View style={styles.toggleContainer}>
            <Switch
              value={availability === "available"}
              onValueChange={() =>
                setAvailability((prev) =>
                  prev === "available"
                    ? "Logement indisponible"
                    : "Logement disponible"
                )
              }
            />
            <Text style={styles.toggleText}>
              {availability === "available"
                ? "Logement disponible"
                : "Logement indisponible"}
            </Text>
          </View>

          {/* Formulaire pour mettre à jour le profil */}
          <Text style={styles.inputTitle}>Ville :</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre ville"
            value={city}
            onChangeText={setCity}
          />
          <Text style={styles.inputTitle}>A propos de vous :</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline={true}
            placeholder="Parlez-nous de vous"
            value={aPropos}
            onChangeText={setApropos}
          />
          <Text style={styles.inputTitle}>Description de votre logement :</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline={true}
            placeholder="Décrivez votre logement"
            value={description}
            onChangeText={setDescription}
          />

          {/* Section pour ajouter des photos partagées */}
          <Text style={styles.inputTitle}>
            {" "}
            Partagez des photos de ce qui vous représente:{" "}
          </Text>
          <View style={styles.imageContainer}>
            {selectedImages.slice(0).map((image, index) => (
              // Afficher chaque image partagée
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.image}
              />
            ))}
            <View>
              <Button
                title="Ajouter une image"
                onPress={showImagePicker}
                color="#4FAAAF"
                style={styles.addImage}
              />
            </View>
          </View>

          {/* Bouton pour mettre à jour le profil */}
          <TouchableOpacity style={styles.button} onPress={handleSaveProfil}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 30,
  },
  logo: {
    height: 200,
    width: 200,
    alignItems: "center",
  },
  inputTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.3,
    marginBottom: 10,
    paddingHorizontal: 5,
    borderRadius: 1,
  },
  button: {
    backgroundColor: "#4FAAAF",
    color: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
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
    alignSelf: "center",
    borderColor: "#4FAAAF",
    borderWidth: 4,
    // backgroundColor: "gray",
  },
  back: {
    color: "#4FAAAF",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleText: {
    marginRight: 10,
  },
});
