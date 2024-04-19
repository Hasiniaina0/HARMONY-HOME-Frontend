import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen"; // Page d'acceuil
import AccountScreen from "./screens/AccountScreen"; // Page mon compte
import SignUpScreen from "./screens/SignUpScreen"; // Page d'inscription
import SignInScreen from "./screens/SignInScreen"; // Page de connexion
import LocataireProfilScreen from "./screens/LocataireProfilScreen"; // Page de profil locataire
import MessagesScreen from "./screens/MessagesScreen"; // page message
import FavoritesScreen from "./screens/FavoritesScreen";
import ThreadScreen from "./screens/ThreadScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
// import UpdateProfilScreen from "./screens/UpdateProfilScreen";
import HebergeurProfilScreen from "./screens/HebergeurProfilScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import { Ionicons } from "@expo/vector-icons";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPosition: "bottom",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#4FAAAF" },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#eb4034",
      }}
    >
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={"white"}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Thread"
        component={ThreadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={30} color={"white"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={30} color={"white"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favoris"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={30} color={"white"} />
          ),
        }}
      ></Tab.Screen>
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
            name="HebergeurProfil"
            component={HebergeurProfilScreen}
          />
          <Stack.Screen
            name="LocataireProfil"
            component={LocataireProfilScreen}
          />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          {/* <Stack.Screen name="UpdateProfil" component={UpdateProfilScreen} /> */}
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
