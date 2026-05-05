import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 
import './Profile.css';
import { PencilLine, User } from "lucide-react";

function Profile({ session }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const[gender , setGender]=useState('');
 
  const[phone , setPhone]=useState('');
  const [avatarUrl, setAvatarUrl] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email);
        
        let { data, error } = await supabase
          .from('users')
          .select('name, age, avatar_url,phone ,gender')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setName(data.name || '');
          setAge(data.age || '');
          setPhone(data.phone || '');
          setGender(data.gender || '');
          setAvatarUrl(data.avatar_url ?? "");
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
      // if (!user) throw new Error("No user logged in");

      const updates = {
        user_id: user.id, 
        name: name,
        age: age ? parseInt(age) : null,
        phone : phone ,
        email: email,
        gender:gender,
        avatar_url: avatarUrl, 
      };

    
      let { error } = await supabase
        .from('users')
        .upsert(updates, { onConflict: 'user_id' });

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
      
      setLoading(true); 
      const { data: { user } } = await supabase.auth.getUser();
  
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}.${fileExt}`;
  
  
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });
  
      if (uploadError) throw uploadError;
  
     
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
  
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`;
  
   
      setAvatarUrl(publicUrl);
  
    
      const { error: dbError } = await supabase
        .from("users")
        .upsert({
          user_id: user.id,
          avatar_url: publicUrl,
          email: user.email, 
          phone:user.phone,
          gender:user.gender
        }, { onConflict: 'user_id' }); 
  
      if (dbError) throw dbError;
  
      toast.success("Profile image updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
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
      <div className="profile-page">
      <div className="profile-layout">
  
      
      <div className="profile-top">

  
  <div className="avatar-ring">
    <div className="avatar-wrapper big">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt="profile"
        className="avatar-img"
       
      />
    </div>
  </div>

  <label htmlFor="avatarInput" className="change-photo-btn" >
 <PencilLine  />
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
  
     
        <div className="profile-right">
          <h2>User Profile</h2>
          <p className="subtitle">Update your details</p>
  
          <form onSubmit={handleSave}>
  
            <div className="input-group">
              <label>Email*</label>
              <input type="text" value={email} disabled />
            </div>
  
            <div className="input-group">
              <label>Full Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-group">
              <label>Phone Number*</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
  
            <div className="input-group">
              <label>Age*</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                required
              />
            </div>
            <div className="input-group gender-group">
  <label>Please Select Your Gender*</label>
  
  {/* <div className="radio-options"> */}
    <div className="radio-item">
      <input 
        type="radio" 
        name="gender" 
        value={gender} 
        onChange={(e) => setGender(e.target.value)} 
        required
      />
      <label htmlFor="male">Male</label>
    
    </div>

    <div className="radio-item">
      <input 
        type="radio" 
        name="gender" 
        value={gender}
        onChange={(e) => setGender(e.target.value)} 
        required
      />
      <label htmlFor="female">Female</label>
    </div>
  {/* </div> */}
</div>
  
          
  
  
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Processing..." : "Save Profile"}
            </button>
          </form>
        </div>
  
      </div>
    </div>
    </div>
  );
}

export default Profile;