import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddStudent from "./Components/Admin/AddStudent/AddStudent";
import AddQuestion from "./Components/Admin/AddQuestion/AddQuestion";
import Register from "./Components/Auth/Register/Register";
import AddExam from "./Components/Admin/AddExam/AddExam";
import Instruction from "./Components/Students/Instruction/Instruction";
// import Exam from "./Components/Students/Exam/Exam";
import Result from "./Components/Admin/Result/Result";
import ExamList from "./Components/Admin/AddExam/ExamList/ExamList";
import QuestionList from "./Components/Admin/AddQuestion/QuestionList/QuestionList";
import StudentList from "./Components/Admin/AddStudent/StudentList/StudentList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onProfileSection } from "./Redux/features/profileSlice";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Home from "./Components/Admin/Home/Home";
import Feedback from "./Components/Admin/Feedback/Feedback";
import StudentFeedBakcs from "./Components/Admin/Feedback/Components/StudentFeedBacks/StudentFeedBakcs";
import Material from "./Components/Admin/Material/Material";
import AllMaterials from "./Components/Admin/Material/Components/AllMaterials/AllMaterials";
import StudentMaterial from "./Components/Students/StudentMaterial/StudentMaterial";
import Quize from "./Components/Students/Quize/Quize";

function App() {
  const { token, role } = useSelector((state) => state?.tokenWithUserRole);
  const dispatch = useDispatch();

  // const
  console.log(token);

  useEffect(() => {
    dispatch(onProfileSection({ token }));
  }, [dispatch, token]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/exam-instructions/:examId" element={<Instruction />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/add-students"
              element={
                role === "admin" ? (
                  <AddStudent />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/students-list"
              element={
                role === "admin" ? (
                  <StudentList />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/add-question"
              element={
                role === "admin" ? (
                  <AddQuestion />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/question-list"
              element={
                role === "admin" ? (
                  <QuestionList />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/add-exam"
              element={
                role === "admin" ? (
                  <AddExam />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/exam-list"
              element={
                role === "admin" ? (
                  <ExamList />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/results"
              element={
                role === "admin" ? (
                  <Result />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/"
              element={
                role === "admin" ? (
                  <Home />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/feedback"
              element={
                role === "admin" ? (
                  <Feedback />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/materials"
              element={
                role === "admin" ? (
                  <Material />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/all-materials"
              element={
                role === "admin" ? (
                  <AllMaterials />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            <Route
              path="/student-feedback"
              element={
                role === "admin" ? (
                  <StudentFeedBakcs />
                ) : (
                  <Navigate to="/student-materials" />
                )
              }
            />
            {/* students routes */}
            <Route
              path="/student-materials"
              element={
                role === "student" ? <StudentMaterial /> : <Navigate to="/" />
              }
            />
            <Route
              path="/quize"
              element={role === "student" ? <Quize /> : <Navigate to="/" />}
            />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
