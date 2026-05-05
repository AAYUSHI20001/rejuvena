import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Lock} from 'lucide-react';
import { supabase } from '../supabaseClient';
import "./MemberArea.css";

const MembersArea = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [unlockedCourses, setUnlockedCourses] = useState([]);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("name, avatar_url")
        .eq("user_id", user.id)
        .single();

      if (data) setProfile(data);
    }

    getProfile();
  }, []);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const courses = [
    {
      id: 1,
      title: "Beginner - Full Face & Body Activation",
       subtitle:"Start your natural rejuvenation journey",
      goal: "Glow in 7–14 days",
      image: "face-yoga.jpg",
     
    },
    {
      id: 2,
      title: "Intermediate - Target & Sculpt",
      subtitle:"Fix specific problem areas",
      goal: "Defined face shape",
      image: "face-technique.jpg",
   
    },
    {
      id: 3,
      title: "Advanced - Full Transformation",
      subtitle:"Deep rejuvenation & long-term results",
      goal: "Complete transformation",
      image: "skin cosmetology.jpg",
     
    }
  ];
  useEffect(() => {
    const fetchPurchases = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
  
      const { data, error } = await supabase
        .from("purchases")
        .select("course_id")
        .eq("user_id", user.id);
  
      if (data) {
        const courseIds = data.map(item => item.course_id);
        setUnlockedCourses(courseIds);
      }
    };
  
    fetchPurchases();
  }, []);
  const courseContent = {
    "1": [
      1, 2, 3, 4, 5, 6,
      7,
      23, 24, 25,
      14, 11,
      26,
      27, 28, 29,
      30, 31
    ],
    "2": [
      10,
      11, 12, 13,
      14, 15,
      23, 24,
      32,
      33, 34,
      37, 38,
      2, 5,
      35, 36,
      27, 39
    ],
    "3": [
      16, 41, 40,
      18, 42, 43, 19,
      44, 45, 46,
      47, 14, 48,
      49, 50, 51, 52,
      53, 54,
      55, 56, 57,
      58, 59, 60,
      61, 62
    ]
  };
  
  const getLessonCount = (courseId) => {
    return courseContent[courseId]?.length || 0;
  };

  return (
    <div className="members-container">


      <nav className="shop-nav">
        <div className="nav-left-content">
          <div className="brand-section">
            <img src='/nav.jpg' className="logo" alt="logo" />
            <span className="heading">Glowmii</span>
          </div>

          <div className="nav-links">
            {/* <NavLink to="/dashboard">Home</NavLink> */}
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/memberArea">My Courses</NavLink>
          </div>
        </div>

        <div className="nav-user">

<div className="profile-section">
  <div
    className="profile-icon"
    onClick={() => setProfileOpen(!profileOpen)}
  >
    {profile?.avatar_url ? (
      <img
        src={profile.avatar_url}
        alt="avatar"
        className="avatar-img-sm"
      />
    ) : (
      <User size={20} />
    )}
  </div>

  {profileOpen && (
    <div className="profile-dropdown">
      <p>Hello, {profile?.name || "User"}</p>
      <hr />
      <div className="dropdown-item" onClick={() => navigate("/profile")}>
        Edit Profile
      </div>
      <div  className="logout-btn" onClick={handleLogout}>
        Logout
      </div>
    </div>
  )}
</div>

</div>
      </nav>
      <main className="members-content">
         <h1 className="members-title">My Courses</h1>
          <div className="course-grid"> 
          {courses.map((course) => {
  const isUnlocked =
    course.id === 1 || unlockedCourses.includes(course.id);

  return (
    <div
      key={course.id}
      className={`course-card-v2 ${
        isUnlocked ? "clickable-card" : "locked-card"
      }`}
      onClick={() => navigate(`/course-details/${course.id}`)}
    >
      <div className="course-thumb">
        <img src={course.image} alt={course.title} />

        {!isUnlocked && (
          <div className="course-lock-overlay">
            <Lock size={40} color="#fff" />
          </div>
        )}
      </div>

      <div className="course-info">
        <div className="course-header">
          <h3>{course.title}</h3>
          <p className="subtitle">{course.subtitle}</p>
        </div>
        <span className="lesson-mini">
      {getLessonCount(course.id)} lessons
    </span>
        <div className="course-footer">
          <span className="price">{course.goal}</span>
             
          {!isUnlocked ? (
            <button
              className="unlock-btn-v2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course-details/${course.id}`);
              }}
            >
              Unlock Now
            </button>
          ) : (
            <button
              className="unlock-btn-v2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course-details/${course.id}`);
              }}
            >
              Start Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
})}
    </div> 
  </main> 
 </div>
 ); 
}; 
 export default MembersArea;
      