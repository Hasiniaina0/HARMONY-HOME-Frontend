import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen"; // Page d'accueil
import SignUpScreen from "./screens/SignUpScreen"; // Page d'inscription
import SignInScreen from "./screens/SignInScreen"; // Page de connexion
import ConnexionHebergeurScreen from "./screens/ConnexionHebergeurScreen";
import ConnexionLocataireScreen from "./screens/ConnexionLocataireScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />

        <Stack.Screen
          name="ConnexionHebergeur"
          component={ConnexionHebergeurScreen}
        />
        <Stack.Screen
          name="ConnexionLocataire"
          component={ConnexionLocataireScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
