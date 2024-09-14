import { configureStore } from "@reduxjs/toolkit";
import token from "./features/LoginSlice";
import batchWiseStudent from "./features/BatchWiseStudentData";
import allExamSection from "./features/allExamSection";
import resultData from "./features/ResultSection";
import profile from "./features/profileSlice";
const store = configureStore({
  reducer: {
    tokenWithUserRole: token,
    batchWiseStudent: batchWiseStudent,
    allExamSection: allExamSection,
    resultData: resultData,
    profile: profile,
  },
});

export default store;