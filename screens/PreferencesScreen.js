import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DescriptionAnnouncementScreen() {

    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View> 
                <TextInput
                style={styles.input}
                placeholder="Localisation"
                
            />
            </View>
        </KeyboardAvoidingView>
    
)

}