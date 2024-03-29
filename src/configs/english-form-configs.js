export const ENGLISH_FORMCONFIG = [
  {
    id: 1,
    type: "FormHeader",
    title: " PM Street Vendor’s AtmaNirbhar Nidhi(PM SVANidhi)",
    subtitle: "(Common Loan Application Form)",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/welcome-note.wav",
  },
  {
    id: 2,
    type: "TextField",
    question: "What is your application number?",
    label: "Application Number",
    for: "application_number",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_1.wav",
  },
  {
    id: 3,
    type: "TextField",
    question: "What is the applicant name?",
    label: "Applicant Name",
    for: "applicant_name",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_2.wav",
  },
  {
    id: 4,
    type: "TextField",
    question: "What is the name of the bank or the lender?",
    label: "Name of Bank/Lender",
    for: "name_of_bank",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_3.wav",
  },
  {
    id: 5,
    type: "TextField",
    question: "What is the name of your father or spouse?",
    label: "Father/Spouse Name",
    for: "father_spouse_name",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_4.wav",
  },
  {
    id: 6,
    type: "TextField",
    question: "What is your marital status? Single, Married, or Divorced",
    label: "Marital Status",
    for: "marrital_status",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_5.wav",
  },
  {
    id: 7,
    type: "TextField",
    question: "What is your gender? Male or Female.",
    label: "Gender",
    for: "gender",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_6.wav",
  },
  {
    id: 8,
    type: "TextField",
    question: "What is your contact number?",
    label: "Mobile Number",
    for: "mobile_number",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_7.wav",
  },
  {
    id: 9,
    type: "TextField",
    question: "What is your Social Category? General, OBC or SC/ST.",
    label: "Social Category",
    for: "social_cat",
    value: "",
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_8.wav",
  },
  {
    id: 10,
    type: "TextField",
    question: "Are you vending in the same state you belong to? Yes or No",
    label: "Vending in the same state",
    for: "samestate",
    value: "",
    isCheckbox: true,
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_9.wav",
  },
  {
    id: 11,
    type: "TextField",
    question: "Are you vending in the same district you belong to? Yes or No",
    label: "Vending in the same district",
    for: "samedistrict",
    value: "",
    isCheckbox: true,
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_10.wav",
  },
  {
    id: 11,
    type: "TextField",
    question: "Do you belong to Minority category? Yes or No",
    label: "Minority",
    for: "minority",
    value: "",
    isCheckbox: true,
    audioUrl: process.env.PUBLIC_URL + "/audios/english/question_11.wav",
  },
];
