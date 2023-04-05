import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import { BasicInput } from "views/admin/forms/basic-inputs";
import { FileInput } from "views/admin/forms/file-input";
import { BulkInput } from "views/admin/forms/bulk-input";
import { FeaturesSwitch } from "views/admin/forms/features-switch";
import Loading from "views/admin/loading";
import Calendar from "views/admin/calendar";
import Map from "views/admin/map";
import LockedLayout from "views/admin/page-builder/locked-layout";
import FreeLayout from "views/admin/page-builder/free-layout";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdDocumentScanner,
  MdMap,
  MdCloudDownload,
  MdCalendarViewMonth,
  MdBuildCircle,
} from "react-icons/md";

const routes = [
  {
    id: 1,
    name: "Main Dashboard",
    type: "link",
    layout: "",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    id: 2,
    name: "NFT Marketplace",
    type: "link",
    layout: "",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    id: 3,
    name: "Data Tables",
    type: "link",
    layout: "",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    id: 4,
    name: "Profile",
    type: "link",
    layout: "",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    id: 5,
    name: "Sign In",
    type: "link",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    id: 6,
    name: "Forms",
    type: "accordion",
    layout: "",
    path: "/forms",
    icon: <MdDocumentScanner className="h-6 w-6" />,
    component: "",
    children: [
      {
        name: "Basic Inputs",
        type: "link",
        layout: "",
        path: "forms/form-basic-inputs",
        component: <BasicInput />,
      },
      {
        name: "File Input",
        type: "link",
        layout: "",
        path: "forms/form-file-input",
        component: <FileInput />,
      },
      {
        name: "Features Switch",
        type: "link",
        layout: "",
        path: "forms/features-switch",
        component: <FeaturesSwitch />,
      },
      {
        name: "Bulk Input",
        type: "link",
        layout: "",
        path: "forms/bulk-input",
        component: <BulkInput />,
      },
    ],
  },
  {
    id: 7,
    name: "Loading",
    type: "link",
    layout: "",
    path: "loading",
    icon: <MdCloudDownload className="h-6 w-6" />,
    component: <Loading />,
  },
  {
    id: 8,
    name: "Full Calendar",
    type: "link",
    layout: "",
    path: "full-calendar",
    icon: <MdCalendarViewMonth className="h-6 w-6" />,
    component: <Calendar />,
  },
  {
    id: 9,
    name: "Map",
    type: "link",
    layout: "",
    path: "map",
    icon: <MdMap className="h-6 w-6" />,
    component: <Map />,
  },
  {
    id: 10,
    name: "Page Builder",
    type: "accordion",
    layout: "",
    path: "/page-builder",
    icon: <MdBuildCircle className="h-6 w-6" />,
    component: "",
    children: [
      {
        name: "Locked Layout",
        type: "link",
        layout: "",
        path: "page-builder/locked-layout",
        component: <LockedLayout />,
      },
      {
        name: "Free Layout",
        type: "link",
        layout: "",
        path: "page-builder/free-layout",
        component: <FreeLayout />,
      },
    ],
  },
  {
    id: 11,
    name: "RTL Admin",
    type: "link",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
