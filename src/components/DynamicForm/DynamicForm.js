import React from "react";
import DynamicTextField from "../TextField/DynamicTextField";
import HeaderCard from "../Header/HeaderCard";
import FinalForm from "../FinalForm/FinalForm";

const DynamicForm = ({ lang, formConfig }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [formData, setFormData] = React.useState(formConfig);
  const [isFieldsCompleted, setisFieldsCompleted] = React.useState(false);

  const handleNext = (nextValue) => {
    let newArr = [...formData];
    if (formData[currentIndex].type !== "FormHeader")
      newArr[currentIndex].value = nextValue;
    setFormData(newArr);

    if (currentIndex < formConfig.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === formConfig.length - 1) {
      setisFieldsCompleted(true);
    }
  };

  const getCurrentComponent = () => {
    const currentConfig = formConfig[currentIndex];
    switch (currentConfig.type) {
      case "FormHeader":
        return <HeaderCard configValue={currentConfig} onNext={handleNext} />;
      case "TextField":
        return (
          <DynamicTextField
            lang={lang}
            configValue={currentConfig}
            onNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isFieldsCompleted ? (
        <FinalForm formData={formData} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            background: "#edf0f5",
            flexDirection: "column",
          }}
        >
          {getCurrentComponent()}
        </div>
      )}
    </>
  );
};

export default DynamicForm;
