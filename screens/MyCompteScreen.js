import React, { useState } from 'react';
import { View, Text, TextInput, Picker, TouchableOpacity,Platform,KeyboardAvoidingView } from 'react-native';
import { Checkbox }from '@ant-design/react-native'
;
import { Ionicons } from '@expo/vector-icons';

export default function MyCompteScreen() {

    return(
        
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>Photo</Text>
                <Text>Prénom</Text>
            </View>
            <View style={styles.container-text}>
                <Text style={styles.text}>Mes informations personnelles</Text>
                <Text style={styles.text}>Mes profil</Text>
                <Text style={styles.text}>Mes préférences</Text>
                <Text style={styles.text}>Mes avis</Text>
                <Text style={styles.text}>Informations légales- RGPD</Text>
                <Text style={styles.text}>Contactez-nous</Text>
            </View>
        </View>
    )
}