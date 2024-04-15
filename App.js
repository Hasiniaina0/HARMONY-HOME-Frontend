
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Page d'accueil
import ConnexionScreen from './screens/ConnexionScreen'; // Page d'inscription
import ConnexionHebergeurScreen from './screens/ConnexionHebergeurScreen';
import ConnexionLocataireScreen from './screens/ConnexionLocataireScreen';

const Stack = createNativeStackNavigator();


export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connexion" component={ConnexionScreen}/>
        <Stack.Screen name="ConnexionHebergeur" component={ConnexionHebergeurScreen}/>
        <Stack.Screen name="ConnexionLocataire" component={ConnexionLocataireScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

