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

export default function LocataireProfilScreen() {
  const [aPropos, setApropos] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [profileImageUrl, setProfileImageUrl] = useState("");
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
        setProfileImageUrl(data.photoProfil);
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
        photoProfil: profileImageUrl, // Utiliser `profileImageUrl` au lieu de `photoProfil`
        // photo: selectedImages.map((image) => ({
        //   uri: image.uri,
        //   name: `photo-${image.index}.jpg`,
        //   type: image.mimeType,
        // })),
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

  // Fonction pour choisir une image de profil à partir de la galerie
  const showImagePickerProfil = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Vous avez refusé l'accès aux photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      multiple: false, // Autorise une seule image
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImage = result.assets[0];
      setProfileImageUrl(newImage.uri);
    }
  };

  // Fonction pour enregistrer la photo de profil mise à jour
  const handleSavePhotoProfil = async () => {
    if (!profileImageUrl) {
      return;
    }

    const formData = new FormData();
    formData.append("photoProfil", {
      uri: profileImageUrl,
      name: "photoProfil.jpg",
      type: "image/jpeg",
    });

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
        <ScrollView style={styles.scrollView}>
          {/* Section pour afficher et changer la photo de profil */}
          <View style={styles.profileImageContainer}>
            {/* Image de profil */}
            <TouchableOpacity onPress={showImagePickerProfil}>
              <Image
                source={
                  profileImageUrl
                    ? { uri: profileImageUrl }
                    : require("../assets/ajoutProfil.png")
                }
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSavePhotoProfil}
          >
            <Text style={styles.buttonText}>Ajouter photo de profil</Text>
          </TouchableOpacity>

          {/* Toggle Switch pour choisir entre Logement disponible ou non */}
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
          {selectedImages.slice(1).map((image, index) => (
                        // Afficher chaque image partagée
              <Image key={index} source={{ uri: image.uri }} style={styles.image} />
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
    paddingHorizontal: 10,
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
    marginRight: 10,
  },
  back: {
    color: "#4FAAAF",
  },
});
