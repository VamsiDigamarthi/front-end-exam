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

function App() {
  const { token } = useSelector((state) => state?.tokenWithUserRole);
  const dispatch = useDispatch();

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
            <Route path="/add-students" element={<AddStudent />} />
            <Route path="/students-list" element={<StudentList />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/question-list" element={<QuestionList />} />
            <Route path="/add-exam" element={<AddExam />} />
            <Route path="/exam-list" element={<ExamList />} />
            <Route path="/results" element={<Result />} />
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/student-feedback" element={<StudentFeedBakcs />} />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
