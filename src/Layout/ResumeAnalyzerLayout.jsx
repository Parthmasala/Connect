import React, { useMemo } from "react";
import Navbar from "../components/common/Navbar/index.jsx";
import { getCurrentUser } from "../API/FirestoreAPI.jsx";
import ResumeAnalyzer from "../WebPages/ResumeAnalyzer.jsx";

export default function ResumeAnalyzerLayout() {
  const [currentUser, setCurrentUser] = React.useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <ResumeAnalyzer currentUser={currentUser} />
    </div>
  );
}
