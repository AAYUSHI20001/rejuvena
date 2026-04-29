import React, { useEffect } from 'react'
import './Home.css';
import { supabase } from '../supabaseClient';
import {Eye , ArrowUpToLine ,Heart,Smile ,Check,Clock ,ArrowRight,Play,Sparkles,Star,Earth,LoaderPinwheel,CirclePlay,ChartColumnIncreasing,Circle} from 'lucide-react';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
function Home(){
  const[playVideo,setPlayVideo]=useState(false);
  const [playEasyMorning, setPlayEasyMorning] = useState(false);
  const [playTargeted, setPlayTargeted] = useState(false);
  const[playFullTransformation , setFullTransformation] = useState(false);
  const [activeFaceVideo, setActiveFaceVideo] = useState(null);
  const [activeFaceTag, setActiveFaceTag] = useState('');

const [testimonials, setTestimonials] = useState([]);
const navigate = useNavigate();
const handleStartCourse = async () => {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    navigate("/signup");
    return;
  }

  setPlayVideo(true); 
};
useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    

    const { data: courseData } = await supabase.from('courses').select('*');
    if (courseData) setCourses(courseData);

  
    const { data: testimonialData, error: testError } = await supabase
      .from('testimonials')
      .select('*');

    if (!testError) {
      setTestimonials(testimonialData);
    }
    
    setLoading(false);
  };

  fetchAllData();
}, []);

const faceTutorials = {
  'Upper Face': { file: 'Upper-face.mp4', label: 'Upper Face' },
  'Middle Face': { file: 'Middle-face.mp4', label: 'Middle Face' }, 
  'Lower Face': { file: 'Lower-face.mp4', label: 'Lower Face' },
  'Neck & Décolleté': { file: 'Neck-Decollete.mp4', label: 'Neck & Décolleté' }
};

const getUrl = (name) => supabase.storage.from('videos').getPublicUrl(name).data.publicUrl;
  const getFaceVideo = (fileName) => {
    const { data } = supabase.storage.from('videos').getPublicUrl(fileName);
    return data.publicUrl;
  };
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  },[])
  const basicCourse = courses.find(c => c.title === 'Look Younger(basic)');
  const easyMorningCourse = courses.find(c => c.title === 'Easy Morning');
  const targetedCourse = courses.find(c => c.title === 'Targeted Advanced');
  const fulltransformation = courses.find(c=>c.title ==='Full Transformation');

  return (
<>
  
   <section className='home-section'>
    <div className='home-container'>
   <div className='left-container'>
     
    <div className="hero-text"> 
    <p style={{ color: "#4CE680",
              backgroundColor: "#4CE6801A",
              width:"182.55px",
              height:"24px",
              borderRadius:"9999px",
              paddingTop:"4px",
              paddingRight:"16px",
              paddingBottom:"4px",
              paddingLeft:"16px",
              gap:"8px",
             lineHeight:"16px",
             letterSpacing:"0.6px",
             textTransform:"uppercase",
              fontWeight: "770",
              fontSize: "12px",
              fontFamily: "'Manrope', sans-serif",
               position:"unset"
           
    }}><Circle style={{width:"8px",height:"8px",borderRadius:"9999px",color:"#4CE680"}} fill="#4CE680"/> FREE 30-DAY ACCESS</p>

    <h1>Glowmii<br/>


    Your  <span className="highlight">Beauty</span> <br />
    Naturally</h1>
   <p> Unlock radiant skin and a youthful glow with our 
   expert-led DIY natural rejuvenation techniques. Try our 
    main course free for 30 days!  </p>
    <div className='hero-btns'>
   <button className="hero-btn">
    <span> < a href = "/signup"style={{textDecoration:"none",color:"black"}}>Start Free Trial </a>
      </span></button>
   <button className="learn-btn">
    <span>Learn More
      </span></button>
   </div>
    </div>
    </div>
    <div className='home-image-container'>
      <div className='container-img '>
      <img src="/heroimg.jpg" alt="img"  className='hero-img'/>
      </div>

    </div>
    </div>
    </section>

      <section className='address-section'>
        <div className='address-container'>

      
      <div className="address-header">
      <h2>Address Aging at the Source</h2>
      <p>Target common concerns with proven natural movements</p>
      </div>
      <div className='card-container'>
        <div className='card'>
          <div className='icon'><Smile size={30} /></div>
          <h3>Expression <br />Wrinkles</h3>
          <p>Soften deep forehead <br />lines
            and brow furrows<br /> naturally.
          </p>
          </div>
          <div className='card'>
            <div className='icon'><Eye size={30} /></div>
            <h3>Crow's Feet</h3>
            <p>Brighten and smooth<br />
             the delicate area <br />
              around your eyes.</p>
          </div>
          <div className='card'>
            <div className='icon'><ArrowUpToLine size={30}  /></div>
      <h3>Sagging Cheeks</h3>
      <p>Lift and sculpt your
        <br />
         facial contours without <br />
          invasive procedures.</p>
          </div>
          <div className='card'>
            <div className='icon' ><Heart size={30} /></div>
          <h3>Loss of Elasticity</h3>
          <p>Restore natural <br />
          firmness through daily 
          <br />facial yoga practices.</p>
          </div>
      </div>
      </div>
      
      </section >
      <section className='personal-section'>
        <div className='personal-container'>

      
      <div className='personal-images'>
          <img src='/lotion.jpg' alt='lotion' className='img-small' />
          <div className='img-large-container'>
          <img src='/lotion2.jpg' alt='lotion' className='img-large' />
          </div>

        </div>
        <div className='personal-content'> 
        <h2>Your Personal Natural
        Beauty Expert</h2>
        <p>Rejuvena offers a holistic approach to beauty.We 
          combine ancient wisdom modern techniques 
          to give you a natural alternative to cosmetic surgery.</p>
        
            <p style={{fontWeight:"500",color:"#334155",fontSize:"18px,",lineHeight:'28px',width:"268.59",height:"28px"}}><Check size={20} style={{color: "rgb(85, 213, 127)",
              backgroundColor: "rgba(16, 230, 88, 0.09)",
              borderRadius: "305px",marginRight:"12px"}}/>
              Lymphatic Drainage Techniques</p>
            <p style={{fontWeight:"500",color:"#334155",fontSize:"18px,",lineHeight:'28px',width:"268.59",height:"28px"}}><Check size={20} style={{color: "rgb(85, 213, 127)",
              backgroundColor: "rgba(16, 230, 88, 0.09)",
              borderRadius: "305px",marginRight:"12px"}}/>Sculpting Facial Massages</p>
            <p style={{fontWeight:"500",color:"#334155",fontSize:"18px,",lineHeight:'28px',width:"268.59",height:"28px"}}><Check size={20} style={{color: "rgb(85, 213, 127)",
              backgroundColor: "rgba(16, 230, 88, 0.09)",
              borderRadius: "305px",marginRight:"12px"}}/>Facebuilding Exercises</p>
            </div>
            </div>
      </section> 
      <section className='structure-section'>
  <div className='structure-content'>
    <div className='structure-header'>
    <h2> Structured Programs</h2>
    <p>From basic foundation to targeted transformation.</p>
    </div>

<div className='structure-container'>
  <div className='container-left' >
  {playVideo && basicCourse?.video_url ? (
                <video
                key={basicCourse.video_url}
                  className="course-video"
                  src={basicCourse.video_url}
                  autoPlay
                  muted    
    playsInline 
                  controls
                  onEnded={()=> {
                    setTimeout(() => {
                      setPlayVideo(false);
                    }, 1000);
                  }}
                />
              ) : (
    <>
  
    <div className='container-inside'>

    <button className='left-btn'>Most Popular</button>
    <h3 className='course-title'>Look Younger(basic)</h3>
    <p className='course-paragraph'>The Foundation of your glowmii journey.
    Learn lymphatic drainage,sculpting techniques, and vacuum massage for a 
    complete facial reset. </p>
  <div className='play-icon' onClick={()=>setPlayVideo(true)}>
  <Play  style={{color:"#4CE680",width:"22px",height:"28px",margin:"27px"}} strokeWidth={4} 
   />
</div>
<div className='img-tag-container3'>
  <div className='img-tag-progress3'>

  </div>
</div>
  </div>

   <div className='card-actions'>
     <button className='start-btn' onClick={handleStartCourse}>Start Course</button>
    <span className='duration-tag'><Clock size={18} color='#4CE680'/>21 Days</span>
    </div>
  
  </>
  )}
  </div>
  <div className='card-right'>
  <div className='image-container' style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '12px' }}>
    {playEasyMorning && easyMorningCourse?.video_url ? (
      <video
        key={easyMorningCourse.video_url}
        src={easyMorningCourse.video_url}
        autoPlay
        muted
        playsInline
        controls
        onEnded={() => setPlayEasyMorning(false)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ) : (
      <div onClick={() => setPlayEasyMorning(true)} style={{ cursor: 'pointer', height: '100%' }}>
        <img src='/lotion.jpg' alt="lotion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="circle-icon">
          <CirclePlay style={{ width: "30px", height: "30px" }} strokeWidth={2.5} />
        </div>
        <div className='img-tag-container2'>
<div className='img-tag-progress2'></div>
</div> 
      </div>
    )}
  </div>

  <div className='right-grid'>
    <div className='text-content'>
      <h3>Easy Morning</h3>
      <p>Express body course designed to improve mobility, posture, and wake up your system in just 10 minutes.</p>
    </div>
    <button className='explore-btn' onClick={() => setPlayEasyMorning(true)}>Explore Program</button>
  </div>
  
</div>

<div className='card-contain'>
  <div className='img-tag' style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
    {playTargeted ? (
      <video
       
        key={activeFaceVideo || targetedCourse?.video_url}
        src={activeFaceVideo || targetedCourse?.video_url}
        autoPlay
        muted
        playsInline
        controls
        onEnded={() => {
          setPlayTargeted(false);
          setActiveFaceVideo(null);
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ) : (
      <div onClick={() => setPlayTargeted(true)} style={{ cursor: 'pointer', height: '100%' }}>
        <img src='/heroimg.jpg' alt='heroimg' className='img' style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        <CirclePlay size={30} className='circle-icon' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white'  }} />
      </div>
    )}
  </div>

  <div className='img-tag-container'>
    <div className='img-tag-progress'></div>
  </div>

  <div className='card-content'>
    <h3 className='card-title'>Targeted Advanced <br />Focus</h3>
    <div className='tag-list' style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
  {Object.keys(faceTutorials).map((tagName) => {
    const isActive = activeFaceTag === tagName;
    return (
      <span 
        key={tagName}
        className={`tag-item-pro ${isActive ? 'active-pro' : ''}`} 
        onClick={() => {
          setPlayTargeted(true);
          setActiveFaceTag(tagName);
          setActiveFaceVideo(getFaceVideo(faceTutorials[tagName].file));
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          <span className={`status-dot ${isActive ? 'dot-active' : ''}`}></span>
          <span className='tag-text'>{tagName}</span>
        </div>
        
        <ArrowRight 
          size={18} 
          className={`tag-arrow ${isActive ? 'arrow-active' : ''}`}
        />
      </span>
    );
  })}
</div>
  </div>
  
</div> 
<div className='card-bottom-right'>
  <div className="image-container" style={{ position: 'relative', overflow: 'hidden' }}>
   
    {playFullTransformation && fulltransformation?.video_url ? (
      <video
        key={fulltransformation.video_url}
        src={fulltransformation.video_url}
        autoPlay 
        controls
        playsInline
        onEnded={() => setFullTransformation(false)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
      />
    ) : (
      
      <div onClick={() => setFullTransformation(true)} style={{ cursor: 'pointer', height: '100%' }}>
        <img src='/full-transformation.jpg' alt='full-transformation' />
        <CirclePlay 
          size={40} 
          className='circle-icon' 
          style={{ 
            position: 'absolute',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            color: 'white' 
          }} 
        />
         <div className='img-tag-container'>
    <div className='img-tag-progress'></div>
  </div>
      </div>
    )}
  </div>
  
  <div className="card-content">
    <h3>Full Transformation</h3>
    <h4>Comprehensive 30-Day Plan</h4>
    <p>
A complete 30-day transformation system designed to elevate your natural beauty. Blend facial workouts, targeted sculpting, and body activation techniques for a balanced, radiant, and youthful appearance.
</p>
    <button type="button"> 
       <a href="/signup" className='journey-btn'>Enroll Your Journey</a>
    </button>
  </div>
</div>
</div>
  </div>
      </section>
   <section className='visual-section'>
    <div className='visual-container'>
  <div className='img-grid-container'>
    <div className='card-wrapper before'>
    <img src="/before.jpg" alt="before" className='img-before'/> 
   
    <div className='label-tag'>
    <span style={{fontFamily:"'Manrope',san-serif",fontWeight:"700",fontSize:"10px",lineHeight:"15px",letterSpacing:"1px",textTransform:"uppercase",textAlign:"center",width:"84.55px",height:"15px",left:"59px"}}>DAY 1 - BEFORE</span>
    </div>
    <div className='detail-card-ai-analysis'>
      <ChartColumnIncreasing style={{width:"18px",height:"18px",position:"absolute",top:"28px",left:"28px",color:"#4CE680"}}/>
     <span >AI analysis</span>
     <h5>Symmetry improved by 14%</h5>
      </div>
    </div>
        

      <div className='card-wrapper-after'>
      <img src="/after.jpg" alt="before" className='img-after'/>
       <div className='label1-tag'>
       <span style={{fontFamily:"'Manrope',sans-serif",fontSize:"10px",width:"85.69px",height:"15px",fontWeight:"700",lineHeight:"15px",textTransform:"uppercase",color:"#112117",position:"absolute"}}>DAY 30 - AFTER</span>
       </div>
       <div className='detail-card-feedback'>
        <div className='detail-card-icon'style={{display:"flex",width:"168px",height:"9.5px",gap:"4px"}}>
        <Star style={{width:"10px",height:"9.5px",color:"#4CE680"}}/>     <Star  style={{width:"10px",height:"9.5px",color:"#4CE680"}}/>      <Star  style={{width:"10px",height:"9.5px",color:"#4CE680"}}/>     <Star  style={{width:"10px",height:"9.5px",color:"#4CE680"}}/>     <Star  style={{width:"10px",height:"9.5px",color:"#4CE680"}}/>
        </div>
  
       <span>"The AI helps me see changes I didn't even notice!"</span> 
        </div>
      </div>

</div>

  
<div className='visual-content'>
   
 <h2>Visual Your Progress with AI</h2>
   <p>Our intelligent AI Photo Diary tracks your journey 
   automatically.Just snap a photo,and our assistant 
    analyses your progress,creating stunning before/after collages to keep you motivated.</p>
<div className='smart-section'>
  <div className='smart-section-container'>


  <h4><Sparkles style={{color:"#4CE680",width:'22px',height:'22px'}}/>Smart Tracking</h4>
  <p>Automatically aligns scales photos for accurate comparisons.</p>
  </div>
</div>
</div>
</div>
    </section> 
    
    <section className='real-section'>
  <div className='real-content'>
    <h2>Real Results from Real Women</h2>
    <p>Join our community of thousands who have rediscovered their natural glow.</p>

    <div className='real-container'>
      {testimonials && testimonials.length > 0 ? (
        testimonials.map((item) => (
          <div 
            className='real-card' 
            key={item.id}
            onMouseEnter={(e) => e.currentTarget.querySelector('video').play()}
            onMouseLeave={(e) => e.currentTarget.querySelector('video').pause()}
          >
            <div className='card-img'>
              <div className='card-img-frame'>  
                <video 
                  src={item.video_url} 
                  className="real-result-video"
                  muted 
                  loop 
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                <div className="real-circle-icon">
                  <CirclePlay style={{width:"30px",height:"30px"}} strokeWidth={2.5}/>
                </div>
                
                <div className='real-line-container'>
                  <div className='real-line-progress'></div>
                </div>
              </div>
            </div>
    
            <div className='star-container'>
              {[...Array(item.rating || 5)].map((_, i) => (
                <span key={`${item.id}-star-${i}`} className='star-icon'>
                  <Star strokeWidth={3} style={{width:"11.67px",height:"11.08px"}}/>
                </span>
              ))}
            </div>

            <span className='real-card-text'>
              {item.content ? `"${item.content}"` : '"Experience the transformation with our natural methods."'}
            </span>
            
            <div className='name-tag'>
              <h5>{item.name}</h5>
            </div>
          </div>
        ))
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  </div>
</section>

    <section  className="invest-section">
      <div className='invest-content'>
      <div className='invest-card'>
        <h2>Invest In Your Future Self</h2>
        <p >Join thousands of women who have transformed their skin and confidence 
        naturally.Get full access to all courses and the AI Diary.</p>
     
        <div className='parent-container'>
        <div className='annual-card'>
        <h5>Annual Membership</h5>
        
       <div className='price-container'>
        <span className='dollar'>$18.99</span>

        <span className='month-tag'>/month</span>

     
       </div>
       <div className='bill-container'>
       <span className='bill-tag'>Billed annually,auto-renews.</span>
       </div>

    
        <button className='annual-container'><span className='annual-btn'><a href ="/signup">Start 30-Day Free Trial</a></span></button>   

        </div>
        </div>
       <div>
       <h5 className='cancel'>Cancel anytime during your trial period.No commitment.</h5>
       </div>

      </div>
      </div>
    </section>
  
  <footer>
    <div className='footer-section'>
      <div className='footer-container'>
        <div className='footer-heading-container' >
        <div className='footer-heading'>
           <img src ='/nav.jpg' alt=''/>
        <h1 style={{fontSize:"20px"}}>Glowmii  </h1>
        
        </div>
       <div className='footer-links'>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
        <span>Contact Support</span>
       </div>

    <div className='footer-icon-container'>
      <div className='earth-icon'>
      <Earth  size={15} /> 
      </div >
     <div className='spin-wheel'>
     <LoaderPinwheel  size={15} />
     </div>


    </div>
 
        </div>
       <div className=' footer-subheading-container'>
            <p>&copy; 2026 Glowmii  .All rights resesrved.
              Professional results achieved through consistent practice.
            </p>
         </div>
      </div>

    </div>
  </footer>
 </>
  );
}

export default Home;