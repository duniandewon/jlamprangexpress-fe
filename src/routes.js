import Dashboard from "pages/DashboardHome";
import Members from "pages/Members";

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "home",
    route: "/home",
    noCollapse: true,
    icon: <Shop size="12px" />,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Member",
    key: "member",
    route: "/member",
    noCollapse: true,
    icon: <Shop size="12px" />,
    component: <Members />,
  },
  {
    type: "collapse",
    name: "Paket",
    key: "paket",
    route: "/paket",
    noCollapse: true,
    icon: <Cube size="12px" />,
    component: <Dashboard />,
  },
];

export default routes;
