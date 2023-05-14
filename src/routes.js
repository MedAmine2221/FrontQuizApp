import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Quizz from "layouts/quizz/Quizz";
import Quizzniv from "layouts/quizzniv/Quizzniv";
import ChatBot from "layouts/chatbot/ChatBot";
import Profils from "layouts/profils/index";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Forum",
    key: "dashboard",
    icon: <Icon fontSize="small">forum</Icon>,
    route: "/Forum",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Liste des compétences",
    key: "Liste des compétences",
    icon: <Icon fontSize="small">code</Icon>,
    route: "/Liste_competences",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Mes certificats",
    key: "Mes certificats",
    icon: <Icon fontSize="small">emoji_events</Icon>,
    route: "/Mes_certificats",
    component: <Billing />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "ChatBot",
    key: "ChatBot",
    icon: <Icon fontSize="small">android</Icon>,
    route: "/ChatBot",
    component: <ChatBot />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    route: "/Quizz",
    component: <Quizz />,
  },
  {
    route: "/Niveau/Quizz",
    component: <Quizzniv />,
  },
  {
    route: "/Profils",
    component: <Profils />,
  },
  {
    type: "collapse",
    name: "Déconnecter",
    key: "Déconnecter",
    icon: <Icon fontSize="small">exit_to_app</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
