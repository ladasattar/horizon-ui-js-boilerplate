import React from "react";
import Card from "components/card";

const FormLayout = (props) => {
  return (
    <div className="mt-3">
      <Card extra={"w-full p-4 h-full"}>
        {props.title !== "" && props.description !== "" && (
          <div className="mb-8 w-full">
            {props.title !== "" && (
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {props.title}
              </h4>
            )}
            {props.description !== "" && (
              <p className="mt-2 text-base text-gray-600">
                {props.description}
              </p>
            )}
          </div>
        )}
        {props.children}
      </Card>
    </div>
  );
};

FormLayout.defaultProps = {
  title: "",
  description: "",
};

export default FormLayout;
