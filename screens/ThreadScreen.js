import { useSelector } from "react-redux";
import ThreadProfilsScreen from "./ThreadProfilsScreen";
import ThreadAnnouncementsScreen from "./ThreadAnnouncementsScreen";

function ThreadScreen() {
  const user = useSelector((state) => state.user);
  console.log("user reducer in threadscreen", user);

  if (user.statut === "hebergeur") {
    return <ThreadProfilsScreen />;
  } else {
    return <ThreadAnnouncementsScreen />;
  }
}

export default ThreadScreen;
