import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import './LessonView.css';

const LessonView = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  const videoMapping =  {
    "1":{
    "1": "Full_Face_Body_Video_A_woman_with_light_brown_hair_tied_in_a_bun_pD4ILGtC.mp4",
    "2": "Full_Face_Body_Video_A_woman_with_brown_hair_fair_complexion_and_mQzhD3ik.mp4",
    "3": "Full_Face_Body_Video_A_woman_with_brown_hair_tied_back_wearing_a_5UN3503q.mp4",
    "4": "Full_Face_Body_Video_A_woman_with_brown_hair_and_brown_eyes_wearing_a_G3Iwj_vD.mp4",
    "5": "Full_Face_Body_Video_In_a_cinematic_style_a_woman_with_brown_hair_EpJa4n1z.mp4",
    "6": "Full_Face_Body_Video_A_woman_with_dark_hair_tied_back_performs_a_neck_ipg6URCF.mp4",
    "7": "Firefly Posture Correction (Full Body) make a video 654207.mp4",
    "8": "Firefly Morning 5-Minute Wake-up Glow create a video 654207.mp4",
    "9": "lesson-9.mp4",
    "23":"lesson-23.mp4",
    "24":"lesson-24.mp4",
    "25":"lesson-25.mp4",
    "26":"lesson-26.mp4",
    "14":"lesson-14.mp4",
    "11":'lesson-11.mp4',
    "27":'lesson-27.mp4',
    "28":'lesson-28.mp4',
    "29":'lesson-29.mp4',
    "30":'lesson-30.mp4',
    "31":'lesson-31.mp4'
    
   
    },
    "2":{
      "10": "lesson-10.mp4"  ,
      "11":  "lesson-11.mp4" ,
       "12": "lesson-12.mp4" ,
       "13": "lesson-13.mp4" ,
       "14":  "lesson-14.mp4",
       "15":  "lesson-15.mp4",
       "23":"lesson-23.mp4",
       "24":"lesson-24.mp4",
       "32":"lesson-32.mp4",
       "33":"lesson-33.mp4",
       "27":"lesson-27.mp4",
       "34":"lesson-34.mp4",
       "2": "Full_Face_Body_Video_A_woman_with_brown_hair_fair_complexion_and_mQzhD3ik.mp4",
       "5": "Full_Face_Body_Video_In_a_cinematic_style_a_woman_with_brown_hair_EpJa4n1z.mp4",
       "35":"lesson-35.mp4",
       "36":"lesson-36.mp4",
       "37":"lesson-37.mp4",
       "38":"lesson-38.mp4",
       "39":"lesson-39.mp4"
       
    },
    "3":{
      "16": "lesson-16.mp4",
      "17":"lesson-17.mp4",
      "18":"lesson-18.mp4",
      "19":"lesson-22.mp4",
      "20":"lesson-20.mp4",
      "21":"lesson-21.mp4",
      "40":"lesson-40.mp4",
      "41":"lesson-41.mp4",
      "42":"lesson-42.mp4",
      "43":"lesson-43.mp4",
      "44":"lesson-44.mp4",
      "45":"lesson-45.mp4",
      "46":"lesson-46.mp4",
      "47":"lesson-47.mp4",
      "14":"lesson-14.mp4",
      "48":"lesson-48.mp4",
      "49":"lesson-49.mp4",
       "50":"lesson-50.mp4",
       "51":"lesson-51.mp4",
       "52":"lesson-52.mp4",
       "53":"lesson-53.mp4",
       "54":"lesson-54.mp4",
       "55":"lesson-55.mp4",
       "56":"lesson-56.mp4",
       "57":"lesson-57.mp4",
       "58":"lesson-58.mp4",
       "59":"lesson-59.mp4",
       "60":"lesson-60.mp4",
       "61":"lesson-61.mp4",
       "62":"lesson-62.mp4"
    }
  };
  const lessonTitles = {
    "1": {
      "1": "Introduction & Routine Setup",
      "2": "Face Warmup & Blood Circulation",
      "3": "Eyes & Dark Circle Reduction",
      "4": "Cheeks Lift & Glow Activation",
      "5": "Jawline & Double Chin Activation",
      "6": "Neck Tightening Routine",
      "7": "Posture Correction (Full Body)",
      "8": "Morning 5-Minute Wake-up Glow",
      "9": "Hydration & Sleep",
      "23": "Core Activation(Planks, Holds)",
      "24":"Arm and Shoulder Toning",
      "25":"Spine Mobility Exercises",
      "11": "Lymphatic Drainage Technique",
      "14": "Forehead Wrinkle Reduction",
      "26":"Spine Alignment Exercise",
      "27":"Facial Relaxtion Techniques",
      "28":"Body Stretching",
      "29":"Eye Relaxtion",
      "30":"Stress Reduction Techniques",
      "31":"Visualization"
    },
    "2": {
      "10": "Introduction to Sculpting",
      "11": "Lymphatic Drainage Technique",
      "12": "Jawline Sharp Definition",
      "13": "Cheekbone Sculpting",
      "14": "Forehead Wrinkle Reduction",
      "15": "Neck Lift & Tightening",
      "32":"Posture correction",
      "23": "Glute activation (bridges, holds)",
      "24": "Arm sculpting (isometric holds)",
      "33":"Controlled Pranayama",
      "27":"Face Relaxation Techniques",
      "34":"Breath holds during face exercises",
      "2":"Face warm-up",
      "5":"Cheek + jaw sculpt",
      "35":"Core tightening",
      "36":"Breath hold + face lift",
      "37":"Neck alignment drills",
      "38":"Chin tuck exercises",
      "39":"Gentle tapping"
    
    },
    "3": {
      "16": "Transformation Plan Overview",
      "17": "Advanced Facebuilding Technique",
      "18": "Deep Muscle Activation",
      "19": "Anti-Aging Protocol",
      "20": "Full Face Sculpt Routine",
      "21": "30-Day Transformation Plan",
       "40":"Personal Face Mapping & Analysis",
       "41":"30-Day Full Transformation Roadmap",
       "42":"Face Resistance Training",
       "43":"Skin Elasticity Restoration",
       "44":"Extreme Jawline Definition",
       "45":"Double Chin Elimination Protocol",
       "46":"Neck Tightening Advanced Routine",
       "47":"Under Eye Tightening & Dark Circle Repair",
       "14":"Forehead Smoothing Advanced",
       "48":"Eye Lift & Brow Elevation",
       "49":"Posture Correction Mastery",
       "50":"Core Tightening & Vacuum Training",
       "51":"Shoulder & Collarbone Definition",
       "52":"Full Body Fat Burn Routine",
        "53":"Advanced Pranayama for Skin Glow",
        "54":"Oxygen Flow & Circulation Boost",
        "55":"Facial Recovery Protocol",
        "56":"Muscle Relaxation & Tension Release",
        "57":"Sleep & Hormone Optimization",
        "58":"Morning Sculpt Routine",
        "59":"Evening Full Transformation Flow",
        "60":"Weekly Reset Routine",
        "61":"Progress Tracking & Face Comparison",
        "62":"Maintaining Results After 30 Days"
    }
  };
  const lessonOrderMap = {
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
  const currentTitle = lessonTitles[id]?.[lessonId] || "Lesson";
  const markLessonComplete = async () => {
    const user = (await supabase.auth.getUser()).data.user;
  
    if (!user) return;
  
    await supabase.from('lesson_progress').upsert([
      {
        user_id: user.id,
        course_id: String(id),
        lesson_id: String(lessonId),
        completed: true,
      }
    ]);
  
 
    setCompletedLessons((prev) =>
    prev.includes(Number(lessonId)) ? prev : [...prev, lessonId]
    );
  };
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
  
      const fileName = videoMapping[id]?.[lessonId];
  
      if (fileName) {
        const { data } = supabase.storage
          .from('course-videos')
          .getPublicUrl(fileName);
  
        setVideoUrl(data.publicUrl);
      } else {
        setVideoUrl(null);
      }
  
      setLoading(false);
    };
  
    fetchVideo();
  }, [id, lessonId]);

 
  

  useEffect(() => {
    const fetchProgress = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
  
      const { data } = await supabase
  .from("lesson_progress")
  .select("lesson_id")
  .eq("user_id", user.id)
  .eq("course_id", String(id)) 
  .eq("completed", true);

if (data) {
  setCompletedLessons(data.map(item => Number(item.lesson_id))); 
}
    };
  
    fetchProgress();
  }, [id]);
  
  const handleNext = async () => {
    await markLessonComplete();
  
    const currentIndex = lessonOrder.indexOf(Number(lessonId));
  
    // if (currentIndex === -1) {
    //   console.error("Lesson not found in order");
    //   return;
    // }
  
    const nextLessonId = lessonOrder[currentIndex + 1];
  
    if (nextLessonId) {
      navigate(`/course/${id}/lesson/${nextLessonId}`);
    }
  };
  const lessonOrder = lessonOrderMap[id] || [];

  return (
    <div className="lesson-player-page">
      <div className="video-header">
        <button onClick={() => navigate(`/course-details/${id}`)} className="back-btn">
          <ChevronLeft size={20} /> Back to Course
        </button>
        <h3>
   {currentTitle}
</h3>
      </div>
      {/* {completedLessons.includes(lessonId) && (
  <p className="completed-badge"></p>
)} */}

      <div className="main-video-container">
        {loading ? (
          <div className="video-placeholder">Loading Video...</div>
        ) : (
          <video 
            key={videoUrl} 
            controls 
            autoPlay 
            className="video-element"
            controlsList="nodownload"
            onEnded={markLessonComplete}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="video-footer">
        {/* <div className="lesson-info">
          <h4>Now Playing</h4>
          <p>Follow the instructions carefully for maximum results.</p>
        </div> */}
        
        {lessonOrder.indexOf(Number(lessonId)) < lessonOrder.length - 1 && (
  <button className="next-lesson-btn" onClick={handleNext}>
    Next Lesson <ChevronRight size={18} />
  </button>
)}
      </div>
    </div>
  );
};

export default LessonView;