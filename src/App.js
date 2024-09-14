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
import { useDispatch, useSelector } from "react-redux";
import ExamList from "./Components/Admin/AddExam/ExamList/ExamList";
import QuestionList from "./Components/Admin/AddQuestion/QuestionList/QuestionList";
import StudentList from "./Components/Admin/AddStudent/StudentList/StudentList";
import { useEffect } from "react";
import { onProfileSection } from "./Redux/features/profileSlice";

function App() {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onProfileSection({ token }));
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route
            path="/add-students"
            element={token ? <AddStudent /> : <Navigate to="/register" />}
          />
          <Route
            path="/students-list"
            element={token ? <StudentList /> : <Navigate to="/register" />}
          />

          <Route
            path="/add-question"
            element={token ? <AddQuestion /> : <Navigate to="/register" />}
          />
          <Route
            path="/question-list"
            element={token ? <QuestionList /> : <Navigate to="/register" />}
          />
          <Route
            path="/add-exam"
            element={token ? <AddExam /> : <Navigate to="/register" />}
          />
          <Route
            path="/exam-list"
            element={token ? <ExamList /> : <Navigate to="/register" />}
          />
          <Route path="/instruction" element={<Instruction />} />
          {/* <Route path="/exam" element={<Exam />} /> */}
          <Route path="/exam-instructions/:examId" element={<Instruction />} />
          <Route
            path="/"
            element={token ? <Result /> : <Navigate to="/register" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
