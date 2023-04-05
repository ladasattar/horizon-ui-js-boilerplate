/* eslint-disable */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { FaAngleDown } from "react-icons/fa";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();
  let navigate = useNavigate();

  const { routes } = props;
  const [open, setOpen] = React.useState(0);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName, routeType) => {
    if (location.pathname === "/" && routeName === "") return true;
    else {
      if (routeType === "accordion")
        return (
          location.pathname.split("/")[3] === routeName &&
          routeType === "accordion"
        );
      if (location.pathname.split("/")[2] === undefined)
        return (
          location.pathname.split("/")[1] === routeName && routeType === "link"
        );
      else
        return (
          location.pathname.split("/")[2] === routeName.split("/")[1] &&
          routeType === "link"
        );
    }
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  React.useEffect(() => {
    const pathname = "/" + window.location.pathname.split("/")[1];

    routes.find((route) => {
      if (pathname === route.path) {
        if (route.type === "accordion") setOpen(route.id);
      }
    });
  }, []);

  const createLinks = (routes) => {
    return routes.map((route) => {
      if (
        route.layout === "/admin" ||
        route.layout === "" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        if (route.type === "link")
          return (
            <Link
              key={route.id}
              to={route.layout + "/" + route.path}
              onClick={() => setOpen(0)}
            >
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={route.id}
                >
                  <span
                    className={`${
                      activeRoute(route.path, route.type) === true
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 flex ms-4 ${
                      activeRoute(route.path, route.type) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p>
                </li>
                {activeRoute(route.path, route.type) ? (
                  <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-0 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
          );
        if (route.type === "accordion")
          return (
            <Accordion
              open={open === route.id}
              icon={
                <FaAngleDown
                  className={`absolute right-5 ml-auto h-5 w-5 shrink-0 ${
                    open === route.id
                      ? "rotate-[-180deg] text-brand-500"
                      : "rotate-0 text-gray-600"
                  } transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                />
              }
              key={route.id}
              className="max-w-[292px]"
            >
              <AccordionHeader
                onClick={() => handleOpen(route.id)}
                className={`!text-neutral-800 ${
                  open === route.id
                    ? "text-primary bg-white dark:bg-navy-800"
                    : ""
                } dark:bg-transparent group -mt-2 flex w-full cursor-pointer items-center border-0 bg-white px-8 text-left text-base transition [overflow-anchor:none] hover:z-[2] dark:bg-navy-800 dark:text-white `}
              >
                <div className="flex items-center">
                  <span
                    className={`${
                      open === route.id
                        ? "text-brand-500 dark:!text-white"
                        : "text-gray-600"
                    } transition-all duration-300`}
                  >
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 flex ${
                      open === route.id
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    } transition-all duration-300 ms-4`}
                  >
                    {route.name}
                  </p>
                </div>
              </AccordionHeader>
              <AccordionBody className="!py-2">
                {route.children.map((child, index) => {
                  return (
                    <div
                      className="relative mb-3 flex hover:cursor-pointer"
                      key={index}
                      onClick={() => {
                        navigate(child.layout + "/" + child.path);
                      }}
                    >
                      <li
                        className="my-[3px] flex cursor-pointer items-center px-8"
                        key={index}
                      >
                        <p
                          className={`leading-1 flex ms-10 ${
                            activeRoute(child.path, child.type) === true
                              ? "font-bold text-navy-700 dark:text-white"
                              : "font-medium text-gray-600"
                          }`}
                        >
                          {child.name}
                        </p>
                      </li>
                      {activeRoute(child.path, child.type) ? (
                        <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-6 dark:bg-brand-400" />
                      ) : null}
                    </div>
                  );
                })}
              </AccordionBody>
            </Accordion>
            // <a
            //   onClick={(e) => {
            //     e.stopPropagation();
            //     toggleAccordion(route.path, route.id);
            //   }}
            //   className="relative flex"
            //   key={route.id}
            // >
            //   <div className="mb-3 flex-1 hover:cursor-pointer">
            //     <li>
            //       <button
            //         type="button"
            //         className={`text-neutral-800 ${
            //           activeAccordion && accordionKey === route.id
            //             ? "text-primary bg-white dark:bg-navy-800"
            //             : ""
            //         } dark:bg-transparent group my-[3px] flex w-full cursor-pointer items-center border-0 bg-white px-8 text-left text-base transition [overflow-anchor:none] hover:z-[2] dark:bg-navy-800 dark:text-white `}
            //       >
            //         <span
            //           className={`${
            //             activeAccordion && accordionKey === route.id
            //               ? "text-brand-500"
            //               : "text-gray-600"
            //           } dark:text-white`}
            //         >
            //           {route.icon ? route.icon : <DashIcon />}{" "}
            //         </span>
            //         <p
            //           className={`leading-1 flex ${
            //             activeAccordion && accordionKey === route.id
            //               ? "font-bold text-navy-700"
            //               : "font-medium text-gray-600"
            //           } ms-4 dark:text-white`}
            //         >
            //           {route.name}
            //         </p>
            //         <FaAngleDown
            //           className={`absolute right-5 ml-auto h-5 w-5 shrink-0 ${
            //             activeAccordion && accordionKey === route.id
            //               ? "rotate-[-180deg] text-brand-500"
            //               : "rotate-0 text-gray-600"
            //           } transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            //         />
            //       </button>
            //     </li>
            //     <div
            //       className={`!visible relative top-3 left-6 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            //         activeAccordion && accordionKey === route.id
            //           ? "max-h-[128rem]"
            //           : "max-h-0"
            //       } w-full border-0`}
            //     >
            //       {route.children.map((child, route.id) => {
            //         return (
            //           <div
            //             className="relative mb-3 flex hover:cursor-pointer"
            //             key={route.id}
            //             onClick={() => {
            //               navigate(child.layout + "/" + child.path);
            //             }}
            //           >
            //             <li
            //               className="my-[3px] flex cursor-pointer items-center px-8"
            //               key={route.id}
            //             >
            //               <p
            //                 className={`leading-1 flex ms-4 ${
            //                   activeRoute(child.path, child.type) === true
            //                     ? "font-bold text-navy-700 dark:text-white"
            //                     : "font-medium text-gray-600"
            //                 }`}
            //               >
            //                 {child.name}
            //               </p>
            //             </li>
            //             {activeRoute(child.path, child.type) ? (
            //               <div className="absolute top-px h-9 w-1 rounded-lg bg-brand-500 end-6 dark:bg-brand-400" />
            //             ) : null}
            //           </div>
            //         );
            //       })}
            //     </div>
            //   </div>
            // </a>
          );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
