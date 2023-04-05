import React from "react";
import Card from "components/card";
import Widget from "components/widget/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

const LockedLayout = (props) => {
  return (
    <div className="mt-3">
      <Card extra={"w-full p-4 h-full"}>
        <div className="mb-8 w-full">
          {props.title !== "" && (
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {props.title}
            </h4>
          )}
          {props.description !== "" && (
            <p className="mt-2 text-base text-gray-600">{props.description}</p>
          )}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Link to={"edit"}>
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Earnings"}
              subtitle={"$340.5"}
            />
          </Link>
          <Link to={"edit"}>
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Spend this month"}
              subtitle={"$642.39"}
            />
          </Link>
          <Link to={"edit"}>
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Sales"}
              subtitle={"$574.34"}
            />
          </Link>
          <Link to={"edit"}>
            <Widget
              icon={<MdDashboard className="h-6 w-6" />}
              title={"Your Balance"}
              subtitle={"$1,000"}
            />
          </Link>
          <Link to={"edit"}>
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"New Tasks"}
              subtitle={"145"}
            />
          </Link>
          <Link to={"edit"}>
            <Widget
              icon={<IoMdHome className="h-6 w-6" />}
              title={"Total Projects"}
              subtitle={"$2433"}
            />
          </Link>
        </div>
      </Card>
    </div>
  );
};

LockedLayout.defaultProps = {
  title: "Page Builder",
  description: "Page Builder Example",
};

export default LockedLayout;
