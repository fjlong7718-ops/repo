import { createBrowserRouter } from "react-router";
import HomePage from "./pages/Home";
import Capabilities from "./pages/Capabilities";
import Quote from "./pages/Quote";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import HelpCenter from "./pages/HelpCenter";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Company from "./pages/Company";
import News from "./pages/News";
import Solutions from "./pages/Solutions";
import AccountLayout from "./pages/account/AccountLayout";
import Dashboard from "./pages/account/Dashboard";
import Orders from "./pages/account/Orders";
import Cart from "./pages/account/Cart";
import Checkout from "./pages/account/Checkout";
import Coupons from "./pages/account/Coupons";
import MessageCenter from "./pages/account/MessageCenter";
import MyProfile from "./pages/account/MyProfile";
import PasswordChange from "./pages/account/PasswordChange";
import { Addresses, PaymentMethods, Notifications, TeamManagement, AccountSettings } from "./pages/account/AccountStubs";
import OrderDetail from "./pages/account/OrderDetail";
import ProductDetail from "./pages/ProductDetail";
import TrustCenter from "./pages/TrustCenter";
import ServiceDetail from "./pages/ServiceDetail";
import Sustainability from "./pages/Sustainability";
import ExploreFactory from "./pages/ExploreFactory";
import Invoice from "./pages/Invoice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/capabilities",
    Component: Capabilities,
  },
  {
    path: "/products/:type",
    Component: ProductDetail,
  },
  {
    path: "/about/explore-factory",
    Component: ExploreFactory,
  },
  {
    path: "/about/sustainability",
    Component: Sustainability,
  },
  {
    path: "/about/:section",
    Component: TrustCenter,
  },
  {
    path: "/products/services/:service",
    Component: ServiceDetail,
  },
  {
    path: "/invoice/:invoiceId",
    Component: Invoice,
  },
  {
    path: "/quote/:productType",
    Component: Quote,
  },
  {
    path: "/quote",
    Component: Quote,
  },
  {
    path: "/privacy",
    Component: Privacy,
  },
  {
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/help",
    Component: HelpCenter,
  },
  {
    path: "/blog",
    Component: Blog,
  },
  {
    path: "/contact",
    Component: ContactUs,
  },
  {
    path: "/company",
    Component: Company,
  },
  {
    path: "/news",
    Component: News,
  },
  {
    path: "/solutions/:industry",
    Component: Solutions,
  },
  {
    path: "/account",
    Component: AccountLayout,
    children: [
      { index: true,                Component: Dashboard        },
      { path: "orders",             Component: Orders           },
      { path: "orders/:orderId",    Component: OrderDetail      },
      { path: "cart",               Component: Cart             },
      { path: "checkout",           Component: Checkout         },
      { path: "addresses",          Component: Addresses        },
      { path: "payment",            Component: PaymentMethods   },
      { path: "notifications",      Component: MessageCenter    },
      { path: "team",               Component: TeamManagement   },
      { path: "settings",           Component: AccountSettings  },
      { path: "profile",            Component: MyProfile        },
      { path: "password",           Component: PasswordChange   },
      { path: "coupons",            Component: Coupons          },
    ],
  },
], {
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
