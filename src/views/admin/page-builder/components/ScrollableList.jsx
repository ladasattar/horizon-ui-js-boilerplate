/* eslint-disable */
import React from "react";
import { HiX } from "react-icons/hi";
import Widget from "components/widget/Widget";
import { MdBarChart } from "react-icons/md";
import { Draggable } from "./Draggable";

const ScrollableList = ({ open }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed top-0 left-0 !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span className="absolute top-4 right-4 block cursor-pointer xl:hidden">
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Element <span className="font-medium">List</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto grid grid-cols-2 gap-3 px-3 pt-1">
        <Draggable
          children={
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Earnings"}
              subtitle={"$340.5"}
            />
          }
        />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default ScrollableList;
