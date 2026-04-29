// import React, { useState, useEffect } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { supabase } from '../supabaseClient';
// import { Earth, LoaderPinwheel, User , Lock } from 'lucide-react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [unlockedCourses, setUnlockedCourses] = useState([]);

//   useEffect(() => {
//     getProfile();
//     fetchPurchases();
//   }, []);


//   async function getProfile() {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data } = await supabase
//       .from("users")
//       .select("name, avatar_url")
//       .eq("user_id", user.id)
//       .single();

//     if (data) setProfile(data);
//   }


//   async function fetchPurchases() {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data } = await supabase
//       .from("purchases")
//       .select("course_id")
//       .eq("user_id", user.id);

//     if (data) {
//       setUnlockedCourses(data.map(item => item.course_id));
//     }
//   }


//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate('/');
//   };

 
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

 
//   const courses = [
//     {
//       id: 1,
//       title: "Beginner - Full Face & Body Activation",
//       duration: "10 mins",
//       image: "face-yoga.jpg",
//     },
//     {
//       id: 2,
//       title: "Intermediate - Target & Sculpt",
//       duration: "15 mins",
//       image: "face-technique.jpg",
//     },
//     {
//       id: 3,
//       title: "Advanced - Full Transformation",
//       duration: "20 mins",
//       image: "skin cosmetology.jpg",
//     }
//   ];

//   return (
//     <div className="rejuvena-shop-container">


//       <nav className="shop-nav">
//         <div className="nav-left-content">
//           <div className="brand-section">
//             <img src='/nav.jpg' className="logo" alt="logo" />
//             <span className="heading">Rejuvena</span>
//           </div>

//           <div className="nav-links">
//             <NavLink to="/dashboard">Home</NavLink>
//             <NavLink to="/profile">Profile</NavLink>
//             <NavLink to="/memberArea">My Courses</NavLink>
//           </div>
//         </div>

//         <div className="nav-user">
//           <div className="profile-section">
//             <div
//               className="profile-icon"
//               onClick={() => setProfileOpen(!profileOpen)}
//             >
//               {profile?.avatar_url ? (
//                 <img src={profile.avatar_url} alt="" className="avatar-img-sm" />
//               ) : (
//                 <User size={20} />
//               )}
//             </div>

//             {profileOpen && (
//               <div className="profile-dropdown">
//                 <p>Hello, {profile?.name || "User"}</p>
//                 <hr />
//                 <div  className="dropdown-item" onClick={() => navigate("/profile")}>
//                   Edit Profile
//                 </div>
//                 <div className="logout-btn" onClick={handleLogout}>
//                   Logout
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

     
//       <div className="dashboard-main">

//         <h1 className="greeting">
//           {getGreeting()}, {profile?.name || "User"} 
//         </h1>

//         <p className="subtext">
//           Your body is ready for today's gentle flow.
//         </p>

      
//         <div className="stats-card">
//           <div>
//             <p>ACTIVE MINUTES</p>
//             <h2>42 / 60</h2>
//           </div>
//           <div>
//             <p>STREAK</p>
//             <h2>12 days</h2>
//           </div>
//         </div>

    
//         <div className="quick-card">
//           <h3>⚡ Quick Start</h3>
//           <p>Continue your last session</p>
//           <button onClick={() => navigate("/memberArea")}>
//             Resume Now
//           </button>
//         </div>

      
//         <h2 className="section-title">Recommended for You</h2>
//         <div className="course-grid">
//   {courses.map((course) => {
//     const isUnlocked =
//       course.id === 1 || unlockedCourses.includes(course.id);

//     return (
//       <div
//         key={course.id}
//         className={`course-card-v2 ${
//           isUnlocked ? "clickable-card" : "locked-card"
//         }`}
//         onClick={() =>
//           navigate(
//             isUnlocked
//               ? `/course/${course.id}/lesson/1`
//               : `/course-details/${course.id}`
//           )
//         }
//       >
//         <div className="course-thumb">
//           <img src={course.image} alt={course.title} />

//           {!isUnlocked && (
//             <div className="course-lock-overlay">
//               <Lock size={40} color="#fff" />
//             </div>
//           )}
//         </div>

//         <div className="course-info">
//           <div className="course-header">
//             <h3>{course.title}</h3>
//           </div>

//           <div className="course-footer">
//             <span className="price">{course.duration}</span>

//             <button
//               className="unlock-btn-v2"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(
//                   isUnlocked
//                     ? `/course/${course.id}/lesson/1`
//                     : `/course-details/${course.id}`
//                 );
//               }}
//             >
//               {isUnlocked ? "Start Learning" : "Unlock Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   })}
// </div>
//       </div>

 
//       <footer>
//         <div className='footer-section'>
//           <div className='footer-container'>
//             <div className='footer-heading-container'>

//               <div className='footer-heading'>
//                 <img src='/nav.jpg' alt='' />
//                 <h1 style={{ fontSize: "20px" }}>Rejuvena</h1>
//               </div>

//               <div className='footer-links'>
//                 <span>Privacy Policy</span>
//                 <span>Terms of Use</span>
//                 <span>Contact Support</span>
//               </div>

//               <div className='footer-icon-container'>
//                 <div className='earth-icon'>
//                   <Earth size={15} />
//                 </div>
//                 <div className='spin-wheel'>
//                   <LoaderPinwheel size={15} />
//                 </div>
//               </div>

//             </div>

//             <div className='footer-subheading-container'>
//               <p>
//                 © 2024 Rejuvena. All rights reserved.
//                 Professional results achieved through consistent practice.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard


 