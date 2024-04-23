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
  const [profileImageUrl, setProfileImageUrl] = useState("");
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
        setProfileImageUrl(data.photoProfil);
      })
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
        photo: selectedImages.map(image => ({
            uri: image.uri,
            name: `photo-${image.index}.jpg`,
            type: image.mimeType,
        })),
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


  const showImagePickerProfil = async () => {
    // Demander la permission d'accéder à la galerie
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
          console.error("Aucune image de profil sélectionnée.");
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
      const response = await fetch(`${BACKEND_URL}/updates/photoProfil/${token}`, {
          method: "POST",
          body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
          console.log("Photo de profil mise à jour avec succès:", data);
          setProfileImageUrl(photoProfil.uri); // Mettre à jour l'URL de l'image de profil après une mise à jour réussie
      } 
  };

   // Interface utilisateur du composant
   return (
    <SafeAreaView style={styles.inputsContainer}>
        <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {/* Bouton de retour */}
                <MaterialIcons name="keyboard-backspace" size={60} onPress={() => navigation.goBack()} style={styles.back} />

                {/* Section pour afficher et changer la photo de profil */}
                <View style={styles.profileImageContainer}>
                    {/* Image de profil */}
                    
                     <TouchableOpacity onPress={showImagePickerProfil}>
                      <Image
                          source={profileImageUrl ? { uri: profileImageUrl } : require("../assets/ajoutProfil.jpg")}
                          style={styles.profileImage}
                        />
                    </TouchableOpacity>
  
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSavePhotoProfil}>
                        <Text style={styles.buttonText}>Ajouter photo de profil</Text>
                </TouchableOpacity>

                {/* Formulaire pour mettre à jour le profil */}
                <Text style={styles.title}>Je mets à jour mon profil</Text>
                <TextInput style={styles.input} placeholder="Votre ville" value={city} onChangeText={setCity} />
                <TextInput style={styles.input} placeholder="Parlez-nous de vous" value={aPropos} onChangeText={setApropos} />
                <TextInput style={styles.input} placeholder="Décrivez votre logement" value={description} onChangeText={setDescription} />

                {/* Section pour ajouter des photos partagées */}
                <Text>Partagez des photos de ce qui vous représente</Text>
                <View style={styles.imageContainer}>
                    {selectedImages.slice(1).map((image, index) => (
                        // Afficher chaque image partagée
                        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                    ))}
                    <Button title="Ajouter une image" onPress={showImagePicker} color="white" />
                </View>

                {/* Bouton pour mettre à jour le profil */}
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
    backgroundColor: "white",
},
logo: {
    height: 200,
    width: 200,
    alignItems: "center",
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
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
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
    margin: 5,
},
profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    marginBottom: 20,
},
profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
},
back: {
    color: "#4FAAAF",
},
});