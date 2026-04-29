import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/protected/ProtectedRoute';
import Signup from './pages/Signup';
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/Dashboard';
import MembersArea from './pages/MemberArea';
import CourseDetails from './pages/CourseDetails'; 
import LessonView from './pages/LessonView';

function MainLayout({ session }) {
  const location = useLocation();


  const hideNavbarPaths = ['/dashboard', '/memberArea', '/course-details','/LessonView'];
  const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      
      <Routes>
        <Route 
          path="/" 
          element={session ? <Dashboard /> : <Home />} 

        />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/memberArea" element={<MembersArea/>} />
   
        
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/course/:id/lesson/:lessonId" element={<LessonView />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/course/:id/lesson/:lessonId" element={<LessonView />} />

      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;