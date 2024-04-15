import { View, Image, TouchableOpacity, TextInput, CheckBox, Text, StyleSheet } from 'react-native';

export default function ConnexionHebergeurScreen  () {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoButton}>
        <Image source={require('../assets/ajoutProfil.jpg')} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
       
          <View>
            <Text styles= {styles.text}>Se connecter avec :</Text>
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
            <Text styles={styles.text}>Ou créer</Text>
          </View>
        <View style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder="Nom" />
          <TextInput style={styles.input} placeholder="Prénom" />
          <TextInput style={styles.input} placeholder="Date de naissance" />
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Numéro de téléphone" />
          <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} />
          <TextInput style={styles.input} placeholder="Confirmation mot de passe" secureTextEntry={true} />
          {/* <View style={styles.checkBoxContainer}>
            <CheckBox />
            <Text style={styles.checkBoxText}>J'accepte les termes et les conditions générales</Text>
          </View> */}
        </View>
        <TouchableOpacity style={styles.connectButton}>
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
  tex:{
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