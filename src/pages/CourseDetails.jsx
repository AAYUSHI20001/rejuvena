import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { supabase } from '../supabaseClient'; 
import { NavLink, useNavigate } from 'react-router-dom';
import {  Plus, Star, ShieldCheck ,PlayCircle,Lock,User, CircleCheckBig} from 'lucide-react';
import './CourseDetails.css';
import { ToastContainer ,toast } from 'react-toastify';
const CourseDetails = () => {
  const { id } = useParams(); 
 const [imageUrl, setImageUrl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
   const navigate =useNavigate();
   useEffect(() => {
    checkPurchase();
  }, [id]); 
                     
  const checkPurchase = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
  
    const { data } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", user.id)   
      .eq("course_id", Number(id))
      .maybeSingle();
  
    setIsUnlocked(!!data);
  };

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
  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
  
      const { data } = await supabase
  .from("lesson_progress")
  .select("lesson_id")
  .eq("user_id", user.id)
  .eq("course_id", Number(id))
  .eq("completed", true); 
 
  
      if (data) {
        setCompletedLessons(data.map(item => Number(item.lesson_id)));
      }
    };
  
    fetchProgress();
  }, [id]);
  const handleLogout= async()=>{
    await supabase.auth.signOut();
   navigate('/');
  }
   const courseData = {
    "1": {
      title: "Beginner - Full Face & Body Activation",
     description: "This course is designed for those new to natural rejuvenation, focusing on awakening the facial muscles and improving overall circulation. By spending just a few minutes a day on basic movements and posture correction, you’ll release the daily tension held in your shoulders and face. It’s the perfect starting point to reduce morning puffiness and bring back a healthy, natural glow to your skin.",
      imageName: "face-yoga.jpg"
    },
    "2": {
      title: "Intermediate - Target & Sculpt",
      price:"12,898",
      description: "Ready to take your results to the next level? This program moves beyond the basics to focus on precision sculpting and tightening. We dive deep into techniques that target the jawline, minimize the appearance of a double chin, and smooth out fine lines. By incorporating lymphatic drainage and specialized lifting movements, this course helps define your facial contours and firm up the delicate skin around the neck for a more youthful, energized silhouette.",
      imageName: "face-technique.jpg" 
    },
    "3": {
        title: "Advanced - Full Transformation",
        price:"15,899",
        description: "Experience the ultimate shift with our most comprehensive rejuvenation protocol. This level is for those committed to a total transformation, utilizing advanced facebuilding techniques to restore skin elasticity and actively reverse signs of aging. You’ll move through a structured 30-day plan that adapts to your unique features, focusing on deep muscle toning and long-term cellular health. It’s not just a routine; it’s a complete aging-reverse strategy for a lasting, sculpted look.",
        imageName: "skin cosmetology.jpg"
    }
  };
  const courseContent = {
    "1": [
      {
        sectionTitle: "Getting Started",
        lessons: [
          { id: 1, title: "Introduction & Routine Setup", free: true },
        ]
      },
      {
        sectionTitle: "Face Activation Yoga",
        lessons: [
          { id: 2, title: "Face Warmup & Blood Circulation", free: true },
          { id: 3, title: "Eyes & Dark Circle Reduction", free: true },
          { id: 4, title: "Cheeks Lift & Glow Activation", free: true },
          {id: 5 , title: "Jawline & Double Chin Activation" , free:true},
          {id: 6 , title:"Neck Tightening Routine" , free: true}
        ]
      },
    {
      sectionTitle:"Body Activation Yoga",
      lessons :[
        { id: 7 ,title:"Posture Correction (Full Body)",free:true},
         {id: 23,title:"Core Activation(Planks , Holds)",free:true},
         {id: 24,title:"Arm and Shoulder Toning",free:true},
         {id: 25,title:"Spine Mobility Exercises",free:true},
        
      ]
    },
    {
      sectionTitle:"Face Sculpting and Anti-Aging Yoga",
      lessons :[
        { id: 14 ,title:"Forehead Wrinkle Reduction",free:true},
         {id:11 ,title:"Lymphatic Drainage Technique",free:true},
         ]
    },
    {
      sectionTitle:"Posture and Alignment Yoga",
      lessons :[
        {id:26 ,title:"Spine Alignment Exercise",free:true},
        {id:6, title:"Neck Posture",free:true}
       ]
    },
    {
      sectionTitle:"Relaxtion and Recovery",
      lessons :[
        { id: 27 ,title:"Facial Relaxtion Techniques",free:true},
        {id:28 , title:"Body Stretching",free:true},
        {id:29 , title:"Eye Relaxtion",free:true}
        ]
    },
    {
      sectionTitle:"Mindfulness and Inner Glow",
      lessons :[
        { id: 30 ,title:"Stress Reduction Techniques",free:true},
        {id:31,title:"Visualization",free:true}
           ]
    },
    ],
  
    "2": [
      {
        sectionTitle: "Targeted Face Sculpting",
        lessons: [
          { id: 10, title: "Introduction to Sculpting", free: false },
        ]
      },
      {
        sectionTitle: "Advanced Face Massage & Lymphatic Flow",
        lessons: [
          { id: 11, title: "Lymphatic Drainage Technique", free: false },
          { id: 12, title: "Jawline Sharp Definition", free: false },
          { id: 13, title: "Cheekbone Sculpting", free: false }
        ]
      },
      {
        sectionTitle: "Body Sculpt & Activation",
        lessons: [
          { id: 35, title: "Core tightening ", free: false },
          { id: 23, title: "Glute activation (bridges, holds)", free: false },
          { id: 24, title: "Arm sculpting (isometric holds)", free: false }
        ]
      },
      {
        sectionTitle: "Breath Control for Sculpting",
        lessons: [
          { id: 33, title: "Controlled Pranayama", free: false },
          { id: 34, title: "Breath holds during face exercises", free: false },
       
        ]
      },
      {
        sectionTitle: "Posture Correction & Alignment",
        lessons: [
          { id: 37, title: "Neck alignment drills", free: false },
          { id: 38, title: "Chin tuck exercises", free: false },
      
        ]
      },
      {
        sectionTitle: "Sculpting Flow Routine",
        lessons: [
          { id: 2, title: "Face warm-up", free: false },
          { id: 5, title: "Cheek + jaw sculpt", free: false },
          { id: 32, title: "Posture correction", free: false },
          { id: 36, title: "Breath hold + face lift", free: false }
        ]
      },
      {
        sectionTitle: "Recovery & Muscle Relaxation",
        lessons: [
          { id: 27, title: "Face relaxation techniques", free: false },
          { id: 39, title: "Gentle tapping", free: false },
         
        ]
      },

    ],
  
    "3": [
      {
        sectionTitle: "Transformation System",
        lessons: [
          { id: 16, title: "Transformation Plan Overview", free: false },
          { id: 41, title: "30-Day Full Transformation Roadmap", free: false },
          { id: 40, title: "Personal Face Mapping & Analysis", free: false }
        ]
      },
    
      {
        sectionTitle: "Advanced Facebuilding Techniques",
        lessons: [
          { id: 18, title: "Deep Muscle Activation", free: false },
          { id: 42, title: "Face Resistance Training", free: false },
          { id: 43, title: "Skin Elasticity Restoration", free: false },
          { id: 19, title: "Anti-Aging Protocol", free: false }
        ]
      },
    
      {
        sectionTitle: "Jawline & Neck Transformation",
        lessons: [
          { id: 44, title: "Extreme Jawline Definition", free: false },
          { id: 45, title: "Double Chin Elimination Protocol", free: false },
          { id: 46, title: "Neck Tightening Advanced Routine", free: false }
        ]
      },
    
      {
        sectionTitle: "Eye & Forehead Perfection",
        lessons: [
          { id: 47, title: "Under Eye Tightening & Dark Circle Repair", free: false },
          { id: 14, title: "Forehead Smoothing Advanced", free: false },
          { id: 48, title: "Eye Lift & Brow Elevation", free: false }
        ]
      },   
    
      {
        sectionTitle: "Full Body Sculpt Integration",
        lessons: [
          { id: 49, title: "Posture Correction Mastery", free: false },
          { id: 50, title: "Core Tightening & Vacuum Training", free: false },
          { id: 51, title: "Shoulder & Collarbone Definition", free: false },
          { id: 52, title: "Full Body Fat Burn Routine", free: false }
        ]
      },
    
      {
        sectionTitle: "Breathwork & Internal Glow",
        lessons: [
          { id: 53, title: "Advanced Pranayama for Skin Glow", free: false },
          { id: 54, title: "Oxygen Flow & Circulation Boost", free: false }
        ]
      },
    
      {
        sectionTitle: "Recovery & Anti-Aging Optimization",
        lessons: [
          { id: 55, title: "Facial Recovery Protocol", free: false },
          { id: 56, title: "Muscle Relaxation & Tension Release", free: false },
          { id: 57, title: "Sleep & Hormone Optimization", free: false }
        ]
      },
    
      {
        sectionTitle: "Daily Transformation Routine",
        lessons: [
          { id: 58, title: "Morning  Sculpt Routine", free: false },
          { id: 59, title: "Evening Full Transformation Flow", free: false },
          { id: 60, title: "Weekly Reset Routine", free: false }
        ]
      },
    
      {
        sectionTitle: "Tracking & Long-Term Results",
        lessons: [
          { id: 61, title: "Progress Tracking & Face Comparison", free: false },
          { id: 62, title: "Maintaining Results After 30 Days", free: false }
        ]
      }
    ]
  };

  const courseId = String(id);
  const currentCourse = courseData[courseId] || courseData["1"];
  const totalLessons = courseContent[id] ?.reduce((acc,section)=> acc + section.lessons.length , 0);
  const progressPercent = totalLessons ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  useEffect(() => {
 
    const { data } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(currentCourse.imageName);

    if (data) {
      setImageUrl(data.publicUrl);
    }
  }, [id, currentCourse.imageName]);
  const handlePayment = () => {
    const cleanPrice = Number(currentCourse.price.replace(/,/g, ""));
       
    const options = {
      key: "rzp_test_Scy5HaL9q0RvYh", 
      amount: cleanPrice * 100, 
      currency: "INR",
      name: "Glowmii",
      description: currentCourse.title,
  

      handler: async function () {
        toast.success("Payment Successful");
      
        // const { data: { user } } = await supabase.auth.getUser();
      
        await supabase.from("purchases").upsert([
          {
           
            course_id: Number(id)
          }
        ]);
      
        setIsUnlocked(true);
      

        setTimeout(() => {
          navigate(`/course-details/${id}`);
        }, 1500);
      }
   };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
 

  return (
    
    <div className="details-page">
      <ToastContainer position='top-right' autoClose={2000} />
      <nav className="shop-nav">
        <div className="nav-left-content">
          <div className="brand-section">
            <img src='/nav.jpg' className="logo" alt="logo" />
            <span className="heading">Glowmii</span>
          </div>

          <div className="nav-links">
            <NavLink to="/dashboard">Home</NavLink>
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
      <div  className="dropdown-item"  onClick={() => navigate("/profile")}>
        Edit Profile
      </div>
      <div className="logout-btn" onClick={handleLogout}>
        Logout
      </div>
    </div>
  )}
</div>

</div>
      </nav>
      <div className="details-container">
     
        <div className="details-gallery">
          <div className="side-thumbs">
            <img src={imageUrl} alt="Thumb" className="active-thumb" />
          </div>
          <div className="main-image">
            {imageUrl ? (
              <img src={imageUrl} alt={currentCourse.title} />
            ) : (
              <div className="image-loader">Loading...</div>
            )}
            <div className="image-nav">
   
            </div>
          </div>
        </div>

        <div className="details-info">

          <h1>{currentCourse.title}</h1> 
          
          <div className="rating-row">
          <h4 className="progress-text">Progress: {progressPercent}%</h4>
 
<div className="progress-bar">
  <div
    className="progress-fill"
 style={{width :` ${progressPercent}% `}}
  ></div>
</div>
            <div className="stars">
               <Star  size={16} fill="#22c55e" color="#22c55e" />
               <Star  size={16} fill="#22c55e" color="#22c55e" />
               <Star  size={16} fill="#22c55e" color="#22c55e" />
               <Star  size={16} fill="#22c55e" color="#22c55e" />
                    <Star  size={16} fill="#22c55e" color="#22c55e" />
            </div>
            <span>Verified Course</span>
          </div>
         
          <button
  className="unlock-btn-main"
  onClick={() => {
    if (id === "1" || isUnlocked) {
      navigate(`/course/${id}/lesson/1`);
    } else {
      handlePayment();
    }
  }}
>
  {id === "1"
    ? "Start Learning for Free"
    : isUnlocked
    ? "Start Learning"
    : "Unlock Full Course"}
</button>



          <div className="description-box">
          <div className="lesson-section">
    <h3>Course Content</h3>

  {courseContent[id]?.map((section, index) => (
  <div key={index} className="section-block">


<div
  className={`section-header ${openSection === index ? "active" : ""}`}
  onClick={() => setOpenSection(openSection === index ? null : index)}
>
  <div className="section-left">
    <h4>{section.sectionTitle}</h4>
    <span className="lesson-count">
      {section.lessons.length} lessons
    </span>
  </div>

  <Plus
    size={18}
    // className={`icon ${openSection === index ? "rotate" : ""}`}
  />
</div>

   
    {openSection === index && (
                <div>
                  {section.lessons.map((lesson) => {

const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className="lesson-item"
                        onClick={() => {
                          if (lesson.free || isUnlocked) {
                            navigate(`/course/${id}/lesson/${lesson.id}`);
                          }
                        }}
                      >
                        <div className="lesson-left">
                          {lesson.free || isUnlocked ? (
                            <PlayCircle size={18} color="#22c55e" />
                          ) : (
                            <Lock size={18} color="#22c55e" />
                          )}

                          <span>{lesson.title}</span>

                          {isCompleted && (
                            <span className="completed-text"><CircleCheckBig  size ={17}style={{color:"#22c55e"}}/></span>
                          )}
                        </div>

                        <div>
                          {isCompleted
                            ? "Completed"
                            : lesson.free || isUnlocked
                            ? "Pending"
                            : "Locked"}
                        </div>
                      </div>
                    );
                  })}
  </div>
)}
  </div>
))}
</div>
            <h3>Description</h3>
            <p>{currentCourse.description}</p>
          </div>

          <div className="accordion-item">
            <div className="flex-align">
              <ShieldCheck size={18} className="icon-gap" />
              <span>Includes Certification</span>
            </div>
            <Plus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;