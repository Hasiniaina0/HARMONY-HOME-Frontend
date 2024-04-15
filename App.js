import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen"; // Page d'accueil
import SignUpScreen from "./screens/SignUpScreen"; // Page d'inscription
import SignInScreen from "./screens/SignInScreen"; // Page de connexion
import ConnexionHebergeurScreen from "./screens/ConnexionHebergeurScreen";
import ConnexionLocataireScreen from "./screens/ConnexionLocataireScreen";
import MessagesScreen from "./screens/MessagesScreen"; // page message
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "fa-house";
          } else if (route.name === "Messages") {
            iconName = "fa-envelope";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
