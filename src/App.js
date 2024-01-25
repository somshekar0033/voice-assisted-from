import "./App.css";
import React, { useState } from "react";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import { ENGLISH_FORMCONFIG as EnglishFormConfig } from "./configs/english-form-configs";
import { HINDI_FORMCONFIG as HindiFormConfig } from "./configs/hindi-form-configs";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function App() {
  const [showDynamicForm, setShowDynamicForm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [formConfig, setformConfig] = useState(EnglishFormConfig);
  const handleButtonClick = () => {
    setShowDynamicForm(true);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    switch (event.target.value) {
      case "English":
        setformConfig(EnglishFormConfig);
        break;

      case "Hindi":
        setformConfig(HindiFormConfig);
        break;

      default:
        break;
    }
  };

  return (
    <>
      {!showDynamicForm ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Start
          </Button>
          <Select
            label="Language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{ marginLeft: "10px" }}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
          </Select>
        </div>
      ) : (
        <DynamicForm lang={selectedLanguage}formConfig={formConfig} />
      )}
    </>
  );
}

export default App;
