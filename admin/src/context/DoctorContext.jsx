import { createContext, useState } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [doctorData, setDoctorData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    dToken,
    setDToken,
    doctorData,
    setDoctorData,
    backendUrl,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
