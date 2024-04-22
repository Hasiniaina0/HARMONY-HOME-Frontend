import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PreferencesScreen() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ville"
            placeholderTextColor="#4FAAAF"
          />
          <TextInput
            style={styles.input}
            placeholder="Durée de location souhaitée"
            placeholderTextColor="#4FAAAF"
          />
        </View>
        <Picker
          selectedValue={selectedValue}
          label="Sélectionner un type de logement"
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Maison" value="maison" />
          <Picker.Item label="Appartement" value="appartement" />
          <Picker.Item label="Villa" value="villa" />
          <Picker.Item label="Manoir" value="manoir" />
          <Picker.Item label="Château" value="chateau" />
          <Picker.Item label="Cabane" value="cabane" />
          <Picker.Item label="Hutte" value="hutte" />
          <Picker.Item label="Camping-car" value="campingcar" />
        </Picker>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  picker: {
    width: "80%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
