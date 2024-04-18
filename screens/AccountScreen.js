import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AccountScreen() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.title}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/profil.png")}
                  style={styles.profil}
                  alt="profil de l'utilisateur"
                />
              </View>

              <Text style={styles.textNom}>Prénom de l'utilisateur</Text>
            </View>
            <View style={styles.containeText}>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Mes informations personnelles
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Mes profil
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Mes préférences
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Mes avis
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Informations légales- RGPD
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Contactez-nous
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
  },
  imageContainer: {
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
  },
  containerText: {
    flex: 1,
  },
  textNom: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 30,
    textAlign: "center",
  },
  text: {
    color: "blue",
    marginLeft: 40,
    marginBottom: 20,
    fontSize: 16,
  },
  profil: {
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
