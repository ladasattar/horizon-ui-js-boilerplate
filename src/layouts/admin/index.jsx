import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children === undefined) {
        if (
          window.location.href.indexOf(
            routes[i].layout + "/" + routes[i].path
          ) !== -1
        )
          setCurrentRoute(routes[i].name);
      } else {
        for (let j = 0; j < routes[i].children.length; j++) {
          if (window.location.href.indexOf(routes[i].children[j].path) !== -1) {
            setCurrentRoute(routes[i].children[j].name);
          }
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "" || prop.layout === "/admin") {
        if (prop.children !== undefined) {
          return prop.children.map((children, key) => {
            if (
              location.pathname.split("/")[2] === children.path.split("/")[1]
            ) {
              return (
                <Route
                  path={`/${children.path}`}
                  element={children.component}
                  key={key}
                />
              );
            } else {
              return null;
            }
          });
        }
        if (prop.children === undefined) {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      {location.pathname.split("/")[2] !== "free-layout" && (
        <Sidebar open={open} onClose={() => setOpen(false)} />
      )}
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 ${
            location.pathname.split("/")[2] === "free-layout"
              ? "xl:ml-[360px]"
              : "xl:ml-[313px]"
          }`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}
                <Route path="/*" element={<Navigate replace to="/" />} />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
