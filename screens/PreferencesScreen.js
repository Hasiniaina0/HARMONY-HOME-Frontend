import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import WheelPickerExpo from "react-native-wheel-picker-expo";

export default function PreferencesScreen() {
  const [citySearch, setCitySearch] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [duration, setDuration] = useState("");
  const [smoke, setSmoke] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [visit, setVisit] = useState(false);
  const [car, setCar] = useState(false);
  const [pool, setPool] = useState(false);
  const [prmAccess, setPrmAccess] = useState(false);
  const [garden, setGarden] = useState(false);
  const [balcon, setBalcon] = useState(false);
  const user = useSelector((state) => state.user);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCitySearch(data.options.citySearch);
        setAccommodationType(data.options.accommodationType);
        setDuration(data.options.duration);
        setSmoke(data.options.smoke);
        setAnimals(data.options.animals);
        setVisit(data.options.visit);
        setCar(data.options.car);
        setPool(data.options.pool);
        setPrmAccess(data.options.prmAccess);
        setGarden(data.options.garden);
        setBalcon(data.options.balcon);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des préférences de l'utilisateur:",
          error
        )
      );
  }, []);
  // save la mise à jour
  const handleSaveOptions = () => {
    fetch(`${BACKEND_URL}/updates/options`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        citySearch,
        accommodationType,
        duration,
        smoke,
        animals,
        visit,
        car,
        pool,
        prmAccess,
        garden,
        balcon,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Options mis à jour:", data);
      })
      .catch((error) => console.log(error))
      .finally(() => navigation.navigate("AccountScreen"));
  };

  const typeChoices = [
    "Maison",
    "Appartement",
    "Villa",
    "Manoir",
    "Château",
    "Cabane",
    "Hutte",
    "Camping-car",
    "Mobile-home",
  ];
  const COLORS = {
    primary: "#f0f0f0",
    secondary: "#f0f0f0", // Remplace "YourSecondaryColor" par la couleur que tu souhaites utiliser
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          {user.statut === "locataire" && (
            <TextInput
              style={styles.input}
              placeholder="Ville"
              placeholderTextColor="#4FAAAF"
              value={citySearch}
              onChangeText={(citySearch) => setCitySearch(citySearch)}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Durée de location souhaitée"
            placeholderTextColor="#4FAAAF"
            value={duration}
            onChangeText={(duration) => setDuration(duration)}
          />
        </View>
        <View style={styles.pickerContainer}>
          <Text>Type de logement :</Text>
          <WheelPickerExpo
            height={150}
            width={150}
            selectedStyle={{ borderColor: COLORS.secondary, borderWidth: 1 }}
            initialSelectedIndex={1}
            backgroundColor={COLORS.primary}
            items={typeChoices.map((typeChoice) => ({
              label: typeChoice,
              value: typeChoice.toLowerCase(),
            }))}
            onChange={({ item }) => setAccommodationType(item.value)}
          />
        </View>
        <View style={styles.switchContainer}>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Fumeur autorisé</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={smoke ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setSmoke(value)}
              value={smoke}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Animaux autorisés</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={animals ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setAnimals(value)}
              value={animals}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Visite autorisée</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={visit ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setVisit(value)}
              value={visit}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Véhicule disponible</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={car ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setCar(value)}
              value={car}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Piscine</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={pool ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setPool(value)}
              value={pool}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Accès PMR</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={prmAccess ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setPrmAccess(value)}
              value={prmAccess}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Jardin</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={garden ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setGarden(value)}
              value={garden}
            />
          </View>
          <View style={styles.switchInput}>
            <Text style={styles.switchText}>Terrasse</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={balcon ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setBalcon(value)}
              value={balcon}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveOptions}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
  },
  switchContainer: {
    marginTop: 50,
  },
  switchInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchText: {
    marginRight: 50,
    color: "#4FAAAF",
  },
  button: {
    backgroundColor: "#4FAAAF",
    color: "white",
    marginTop: 30,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
