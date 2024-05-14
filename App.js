import { LogBox } from 'react-native'; 
LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen"; // Page d'acceuil
import AccountScreen from "./screens/AccountScreen"; // Page mon compte
import SignUpScreen from "./screens/SignUpScreen"; // Page d'inscription
import SignInScreen from "./screens/SignInScreen"; // Page de connexion
import LocataireProfilScreen from "./screens/LocataireProfilScreen"; // Page de profil locataire
import MessagesScreen from "./screens/MessagesScreen"; // page discussion avec 1 utilisateur
import FavoritesScreen from "./screens/FavoritesScreen";
import ChatScreen from "./screens/ChatScreen"; // chat instantanée
import ThreadScreen from "./screens/ThreadScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import DescriptionAnnouncementScreen from "./screens/DescriptionAnnouncementScreen";
import DescriptionProfilScreen from "./screens/DescriptionProfilScreen";
import HebergeurProfilScreen from "./screens/HebergeurProfilScreen";
import InformationScreen from "./screens/InformationScreen";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import option from "./reducers/option";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user, option });
const persistConfig = {
  key: "harmonyhome",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

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
        name="Annonces"
        component={ThreadScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={30} color={"white"} />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profil"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={30} color={"white"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color={"white"}
            />
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
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen
              name="DescriptionAnnouncement"
              component={DescriptionAnnouncementScreen}
            />
            <Stack.Screen
              name="DescriptionProfile"
              component={DescriptionProfilScreen}
            />
            <Stack.Screen name="MessageScreen" component={MessagesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen
              name="HebergeurProfil"
              component={HebergeurProfilScreen}
            />
            <Stack.Screen
              name="LocataireProfil"
              component={LocataireProfilScreen}
            />
            <Stack.Screen name="Preferences" component={PreferencesScreen} />
            <Stack.Screen name="Information" component={InformationScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
