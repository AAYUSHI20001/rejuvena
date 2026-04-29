import React, { useState } from 'react';
import './Signup.css';
import {Eye ,EyeOff} from 'lucide-react';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import {supabase} from "../supabaseClient";
function Signup() {
  const[form,setForm]=useState({
    email:"",
    name:"",
    password:"" 
 });
 const [error, setError] = useState({ name: "", email: "", password: "" });
const[passwordVisible,setPasswordVisible]=useState(false);
  const navigate=useNavigate();
   const togglePasswordVisibility =()=>{
    setPasswordVisible(!passwordVisible);
   };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let newErrors = { name: "", email: "", password: "" };
    let hasError = false;
  
    const emailRegex = /^\S+@\S+\.\S+$/;  
       
    if (form.name.trim().length < 3) {
      newErrors.name = "Username must be at least 3 characters long";
      hasError = true;
    }
  
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
      hasError = true;
    }
  
    if (form.password.length < 6) { 
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }
  
    setError(newErrors);
    if (hasError) 
      return; 
    const {data ,error} =  await supabase.auth.signUp({ 
       email : form.email ,
      password:form.password,
      options:{
         emailRedirectTo : window.location.origin + "/login",
         data:{
          name:form.name,
         }
      }});
      if(error){
        toast.error(error.message);
        return;
      }
    if (data?.user) {
  
const { error: dbError } = await supabase
.from("users")
.insert([ 
  {
    user_id: data.user.id,       
    email: data.user.email,
    // name: form.name,
  },
], { onConflict: 'email' }); 
    
      if (dbError) {
        console.error("DB Insert Error:", dbError.message);
        toast.warning("Account created, but profile setup failed. Please contact support.")
        return;
      }
    }
    toast.success("Check your email to confirm your account!");



  setTimeout(() => {
    navigate("/login");
  }, 1500);
};
  
//   try{
//     const response = await
//     fetch("https://api.escuelajs.co/api/v1/users",
//     {
//       method:"POST",
//   headers:{
//     "Content-type":"application/json",
//     "Accept":"application/json"
//   },
//    body:
//   JSON.stringify({
//     name:form.name,
//   email:form.email,
//   password:form.password,
//   avatar:"https://picsum.photos/800"
    
//   })
//   });
// const data = await response.json();
// if(response.ok){
//  console.log("API response",data);
//    toast.success("Account created successfully!");
//    setTimeout(()=>{
//     navigate('/login')
//    },1500);
//   }else{
//     toast.error("SignUp failed",data.error)
//   }
//   }catch(error){
//   console.log("Error",error);
//   toast.error("Signup failed!Something went wrong");;
//   }
//   }
   

  return (
     <div className='main-container'>
  <ToastContainer position='top-right' autoClose={2000}/>
  <div className='left-contain'>
  <img src="/heroimg.jpg" alt="heroimg" />
 
</div>
          <div className='right-container'>
            <h1>Create an account</h1>
            <p className='top-link'>Already have an account?
            <a href='/login' className='login-link'>Log in</a>
            </p>
            <form className='signup-box' onSubmit={handleSubmit}>
         
<div className="form-group">
  <label className="email">User name</label>
  <input 
    type="text"
    value={form.name}
    onChange={e => {
      setForm({ ...form, name: e.target.value });
      setError({ ...error, name: "" }); 
    }}
    required 
  />
  {error.name && <p style={{ color: "red", fontSize: "15px" }}>{error.name}</p>}
</div>

<div className="form-group">
  <label className="email">Email address</label>
  <input
    type="email"
    value={form.email}
    onChange={e => {
      setForm({ ...form, email: e.target.value });
      setError({ ...error, email: "" });
    }}
    required 
  />
  {error.email && <p style={{ color: "red", fontSize: "15px" }}>{error.email}</p>}
</div>
<div className="form-group password-group">
  <label className="password">Password</label>
  <div style={{ position: 'relative' }}>
    <input 
      type={passwordVisible ? 'text' : 'password'}
      value={form.password}
      onChange={e => {
        setForm({ ...form, password: e.target.value });
        setError({ ...error, password: "" }); 
      }}
      required
    />
    <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", position: "absolute", right: "12px", top: "10px", color: "gray" }}>
      {passwordVisible ? <EyeOff size={20}/> : <Eye size={20} />}
    </span>
  </div>
  {error.password && <p style={{ color: "red", fontSize: "15px" }}>{error.password}</p>}
</div>
                <p className='password-text'>Use 8 or more characters with a mix of letters , numbers & symbols</p>
                <p className='link-text'>By creating an account you agree to our<br />
                 <a href="#"className="link-term">Terms of use</a> and <a href="#"className='link-privacy'>Privacy Policy</a></p>
                   
                
                        <button className='signup-btn' >Create an account</button>
                        
                        <div>
                        <p className='bottom-link'>Already have an account?
                            <a href='/login' className='login-link'>Log in</a>
                        </p>
                    </div>
            </form>
            </div>  

        
         
        </div>
  )
}

export default Signup;
