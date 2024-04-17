import { useSelector } from "react-redux";
import HebergeurProfilScreen from "./HebergeurProfilScreen";
import LocataireProfilScreen from "./LocataireProfilScreen";

function AccountScreen() {
  const user = useSelector((state) => state.user);

  if (user.statut === "hebergeur") {
    return <HebergeurProfilScreen />;
  } else {
    return <LocataireProfilScreen />;
  }
}

export default AccountScreen;
