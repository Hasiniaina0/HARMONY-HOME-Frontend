import { useSelector } from "react-redux";
import FavoritesProfilsScreen from "./FavoritesProfilsScreen";
import FavoritesAnnouncementsScreen from "./FavoritesAnnouncementsScreen";

function FavoritesScreen() {
  const user = useSelector((state) => state.user);
  console.log("user reducer in threadscreen", user);

  if (user.statut === "hebergeur") {
    return <FavoritesProfilsScreen />;
  } else {
    return <FavoritesAnnouncementsScreen />;
  }
}

export default FavoritesScreen;
