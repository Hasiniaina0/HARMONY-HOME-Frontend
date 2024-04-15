import { View, Image, TouchableOpacity, TextInput, CheckBox, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";


export default function ConnexionLocataireScreen  ({navigation}) {
  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [email, setEmail] = useState((''));
  const [numPhone, setNumPhone] = useState((''));
  const [mdp, setMdp] = useState((''));
  const [mdpConfirm, setMdpConfirm] = useState((''));
  const dispatch = useDispatch();

  const handleConnection = () => {

    if (mdp !== mdpConfirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    fetch("http://192.168.1.145:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom,  
        prenom,
        email,
        numPhone,
        password: mdp,
        confirmPassword: mdpConfirm
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token }));
          setNom("");
          setPrenom("");
          setEmail("");
          setNumPhone("");
          setMdp("");
          setMdpConfirm("");
          navigation.navigate("SignUp");
        }
      });

  };

  return (
    <View style={styles.container}>
     
      <View style={styles.bottomContainer}>
      <View>
            <Text>Se connecter avec :</Text>
      </View>
        <View style={styles.connectWithContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/facebook-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <View>
            <Text>Ou créer:</Text>
      </View>
        <View style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder="Nom" value = {nom}   onChangeText={nom => setNom(nom)} />
          <TextInput style={styles.input} placeholder="Prénom" value ={prenom} onChangeText={prenom => setPrenom(prenom)}/>
            {/* <DatePickerInput style={styles.date}
                locale="en"
                label="date de naissance"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
            /> */}
          <TextInput style={styles.input} placeholder="Email" value = {email} onChangeText={email => setEmail(email)} />
          <TextInput style={styles.input} placeholder="Numéro de téléphone" value = {numPhone} onChangeText={numPhone => setNumPhone(numPhone)}/>
          <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} value={mdp} onChangeText={mdp => setMdp(mdp)} />
          <TextInput style={styles.input} placeholder="Confirmation mot de passe" secureTextEntry={true} value = {mdpConfirm} onChangeText={mdpConfirm => setMdpConfirm(mdpConfirm)} />
          {/* <View style={styles.checkBoxContainer}>
            <CheckBox />
            <Text style={styles.checkBoxText}>J'accepte les termes et les conditions générales</Text>
          </View> */}
        </View>
        <TouchableOpacity style={styles.connectButton} onPress={() => handleConnection()}>
          <Text style={styles.connectButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',

  },
  logoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  date: {
    
    marginTop:400,
  },
  text:{
    marginBottom:20,


  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
    width:'90%',
  },
  connectWithContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  inputsContainer: {
    width: '90%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkBoxText: {
    marginLeft: 10,
  },
  connectButton: {
    backgroundColor: '#4FAAAF',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft:15,
    paddingRight:15,
    marginTop: 30,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 16,
  },
});