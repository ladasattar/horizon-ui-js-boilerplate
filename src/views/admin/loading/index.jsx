import React, { useState } from "react";
import Card from "components/card";
import Switch from "components/switch";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = (props) => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    formState: { errors },
  } = useForm();

  const SampleElement = () => (
    <div className="mb-8 mt-10">
      {loading ? (
        <div className="grid grid-cols-1 gap-1">
          <Skeleton height={30} borderRadius={50} width={350} />
          <Skeleton height={15} borderRadius={50} width={200} />
          <div className="mt-1" />
          <Skeleton circle height={80} width={80} />
          <div className="mt-2 flex flex-col gap-0.5">
            <Skeleton height={15} borderRadius={50} />
            <Skeleton height={15} borderRadius={50} />
            <Skeleton height={15} borderRadius={50} width={100} />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            This is Heading for Sample Element
          </h4>
          <p className="mt-2 text-base text-gray-600">
            This is description for Sample Element
          </p>
          <div className="avatar mt-5 h-20 w-20 overflow-hidden rounded-full">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              alt="Avatar"
            />
          </div>
          <p className="mt-2 text-gray-800">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            ultricies, lorem a ultricies tincidunt, nunc urna ultricies nisl,
            vel tincidunt nunc lorem eget dolor. Nullam ultricies, lorem a
            ultricies tincidunt, nunc urna ultricies nisl, vel tincidunt nunc
            lorem eget dolor.
          </p>
        </div>
      )}
    </div>
  );

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
        <div className="flex flex-col">
          <div className="flex items-center">
            <Switch
              name="switch_1"
              checked={loading}
              errors={errors}
              register={register}
              validationSchema={{
                onChange: (e) => {
                  setLoading(e.target.checked);
                },
              }}
            />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Loading
            </p>
          </div>
          {<SampleElement />}
        </div>
      </Card>
    </div>
  );
};

Loading.defaultProps = {
  title: "Loading sample page",
  description: "Loading sample page",
};

export default Loading;
