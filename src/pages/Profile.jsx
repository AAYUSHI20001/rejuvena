import { useEffect,  useRef,  useState } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 
import './Profile.css';
import { Pencil, User ,UserRound , Mail,Phone , MapPinCheckInside ,Building2 ,UserCheck, Calendar ,Layers, BadgeCheck} from "lucide-react";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[phone , setPhone]=useState('');
  const[address ,setAddress]=useState('');
  const[birth , setBirth] = useState('');
  const[city , setCity]=useState('');
  const[plan, setPlan]=useState('');
  const[userName,setUserName]=useState('');
  const [avatarUrl, setAvatarUrl] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dateRef = useRef(null); /*{ useRef used  directly access to dom element i have used for birthdate input in database it fetch string
                    in ISO format date with time and html input access only date so i have set as date remove time portion }*/
  useEffect(() => {
    getProfile();   
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email);
        // setName(user.name);
        
        let { data  } = await supabase
          .from('users')
          .select('name, avatar_url,phone ,user_name,address,birth,city,plan')
          .eq('user_id', user.id)
          .maybeSingle();
  
        if (data) {
        
          setName(data.name || '');
          setPhone(data.phone || '');
          setUserName(data.user_name || '');
          setAddress(data.address || '');
          setBirth(data.birth ? data.birth.split("T")[0] : "");
          setCity(data.city || '');
          setPlan(data.plan || '');
          setAvatarUrl(data.avatar_url ?? "");
           setProfile(data);

        }
      }
    } catch (error) {
      console.error('Error loading profile:', error.message);
    } finally {
      setLoading(false);
    }
  }
  const handleLogout= async()=>{
    await supabase.auth.signOut();
   navigate('/');
  }
  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const updates = {
        user_id: user.id, 
        name: name,
        phone : phone ,
        user_name:userName,
        address:address,
        email: email,
        birth: birth || null,
        city : city,
        plan:plan,
        avatar_url: avatarUrl, 
      };

    
      let { error } = await supabase
        .from('users')
        .update(updates) 
        .eq("user_id",user.id)

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating the data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  async function uploadAvatar(e) {
    try {
      const file = e.target.files[0];
  
      if (!file) return;
  
      const {data: { user } } = await supabase.auth.getUser();
  
      const filePath = `${user.id}/${file.name}`;
  
      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });
     if (error) throw error;
     const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
  
      setAvatarUrl(data.publicUrl);
  
       const {error : updateError} = await supabase
       .from("users")
       .update({
           avatar_url:data.publicUrl
       })
       .eq("user_id",user.id);
       if(updateError) 
       throw updateError;
      toast.success("Profile Image Uploaded!");
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="profile">
      <ToastContainer position="top-right" autoClose={2000} />
    
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
      <p className="profile-username">Hello, {profile?.name || "User"}</p>
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
  
      <div className="profile-page">
     <div className="profile-layout">
     <div className="profile-top">
     <div className="profile-top-bg"> 
  <div className="avatar-ring">
    <div className="avatar-wrapper big">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt= "Profile"
        className="avatar-img"
          />
    </div>
  </div>

  <label htmlFor="avatarInput" className="change-photo-btn" >
 <Pencil size={20}/>  <div className="edit-profile"> Edit Profile</div>
  </label>
  <input
    type="file"
    id="avatarInput"
    accept="image/*"
    onChange={uploadAvatar}
    disabled={loading}
    style={{ display: "none" }} 
  />
</div>
     </div>  
     <div className="profile-right">

    <div className="profile-heading">
      <h2>{profile?.name || "User"}</h2>

       <span className="verified-text">
             <BadgeCheck size={12} /> Verified Profile
              </span>
            </div>
             <div className="profile-details">
              <div className="subtitle-wrapper">
              <p className="subtitle">Profile details </p>  
            <span className="subtitle-edit"> <Pencil size={13}/>Edit</span>
              </div>
   
      
 
       <form onSubmit={handleSave} className="profile-form">
        {/* <div className="profile-form">  */}
          <div className="input-group">
  <div className="input-group-icons">
    <UserRound  />
  </div>

  <div className="input-content">
    <label>Full Name</label>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>
</div>
  
            <div className="input-group">
            <div className="input-group-icons">
            <Mail  />
            </div>
                <div className="input-content">
              <label> Email</label>
              <input type="text" value={email} 
              onChange={(e)=>setEmail(e.target.value)} />
                  </div>
            </div>
            <div className="input-group">
      
      <div className="input-group-icons" >
        <Calendar  onClick={()=>dateRef.current?.showPicker()}
           style={{cursor:"pointer"}}/>

      </div>

      <div className="input-content">
        <label>Date of Birth</label>
           <input
           ref={dateRef}
          type="date"
          className="date-input"
          value={birth || ""}
          onChange={(e)=>setBirth(e.target.value)}

        />
      </div>
    </div>
            <div className="input-group">
            <div className="input-group-icons">
               <UserCheck  />
               </div>
               <div className="input-content"> 
              <label>Username</label> 
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                // placeholder="Enter your age"
                required
              />
                </div>
            </div>
            <div className="input-group">
           < div className="input-group-icons">
               <Phone  />
               </div>
               <div className="input-content"> 
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // placeholder="Enter your phone number"
                required
              />
              </div>
            </div>
            <div className="input-group">
            <div className="input-group-icons">
               <Layers  />
               </div>
               <div className="input-content"> 
              <label>Plan</label>
              <input
                type="text"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                // placeholder="Enter your phone number"
                required
              />
              </div>
            </div>
            <div className="input-group ">
            <div className="input-group-icons">
               <MapPinCheckInside  />
               </div>
               <div className="input-content"> 
               <label> Address</label>
               <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // placeholder="Enter your age"
                required
              />
              </div>
                 </div>
             <div className="input-group">
             <div className="input-group-icons">
               <Building2 />
               </div>
               <div className="input-content"> 
                 <label>City</label>
                   <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                // placeholder="Enter your age"
                required
              />
              </div>
                   </div>
                   <div className="save-btn-wrapper">
                   <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Processing..." : "Save Profile"}
            </button> 
               </div>
               {/* </div>      */}

          </form> 
        
          </div>
        
        </div>
  
      </div>
    </div>
    </div>
  );
}

   export default Profile;






