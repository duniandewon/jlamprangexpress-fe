import Dashboard from "pages/DashboardHome";
import Members from "pages/Members";
import Login from "pages/login";
import MembersDetail from "pages/MembersDetail";
import Transactions from "pages/Transactions";
import Packeges from "pages/Packeges";

// Soft UI Dashboard PRO React icons
import Shop from "examples/Icons/Shop";
import Cube from "examples/Icons/Cube";
import CreditCard from "examples/Icons/CreditCard";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "home",
    route: "/home",
    noCollapse: true,
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Member",
    key: "member",
    route: "/member",
    noCollapse: true,
    icon: <Shop size="12px" />,
    component: <Members />,
    protected: true,
  },
  {
    type: "page",
    name: "Members Detail",
    key: "members-detail",
    route: "/member/members-detail",
    component: <MembersDetail />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Transaksi",
    key: "transaction",
    route: "/transaction",
    noCollapse: true,
    icon: <CreditCard size="12px" />,
    component: <Transactions />,
    protected: true,
  },
  {
    type: "collapse",
    name: "Paket",
    key: "paket",
    route: "/paket",
    noCollapse: true,
    icon: <Cube size="12px" />,
    component: <Packeges />,
    protected: true,
  },
  {
    type: "page",
    name: "Login",
    key: "login",
    route: "/login",
    component: <Login />,
    protected: false,
  },
];

export default routes;
