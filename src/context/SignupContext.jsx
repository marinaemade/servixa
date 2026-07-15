import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

const initialData = {
  role: null, // "provider" | "customer" — chosen in AccountType

  // Step 1: SignUp
  firstName: "",
  lastName: "",
  email: "",
  password: "",

  // Step 2: PersonalInfo (collected for both roles, only some fields sent to backend)
  fullName: "",
  birthDate: "",
  gender: "male",
  nationality: "",
  job: "",
  phone: "",

  // Step 3: Verification (worker ID docs — only used when role === "provider")
  nationalIdFront: null, // File
  nationalIdBack: null, // File

  // Step 5: ScopeOfWork — used to build defaultAddress for customer registration
  regions: [],

  // Step 6: LastStep
  profilePicture: null, // File
};

export const SignupProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const updateSignup = (fields) =>
    setData((prev) => ({ ...prev, ...fields }));

  const resetSignup = () => setData(initialData);

  return (
    <SignupContext.Provider value={{ data, updateSignup, resetSignup }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

export default SignupContext;