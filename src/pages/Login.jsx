import {  useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Eye , EyeOff} from 'lucide-react';
import   '../App.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

 function Login(){
  const [form, setForm] = useState({
    email:"",
    password:""
});

const[error,setError] = useState(null);
const[passwordVisible,setPasswordVisible]=useState(false);
const navigate = useNavigate();
const togglePasswordVisibilty=()=>{
    setPasswordVisible(!passwordVisible); 
};
const handleForgotPassword = async () => {
  if (!form.email) {
    setError("Please enter your email address first.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(
    form.email,
    {
      redirectTo: `${window.location.origin}/update-password`,
    }
  );

  if (error) {
    toast.error(error.message);
  } else {
    toast.success("Password reset link sent to your email!");
  }
};
const handleGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {

      redirectTo: window.location.origin, 
    },
  });

  if (error) {
    toast.error(error.message);
  }
};
const handleSubmit= async(e) =>{
   e.preventDefault();
//  const {data,error}= await supabase.from('users').insert(form).select().single()
//    console.log("Data",data);
const emailRegex =/\S+@\S+\.\S/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if(!emailRegex.test(form.email)){
    setError('Invalid email address.');
    return;
  }
  //  if(!passwordRegex.test(form.password)){
  //   setError("Password must be at least 6 characters long and include uppercase, lowercase, and a number."
  //   );
  //   return;
  //  }
  setError(null);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });
 
  if (error) { 
    toast.error(error.message);
    return;
  }

  toast.success("Login successful!");


  const { data: profile, error: profileError } = await supabase
  .from('users')
  .select('*')
  .eq('user_id', data.user.id)
  .maybeSingle();

// if (profileError) {
//   console.log(profileError);
// }

  setTimeout(() => {
    navigate("/memberArea");
  }, 1500);



// try{
//   const response = await fetch("https://api.escuelajs.co/api/v1/auth/login",
//   {method:"POST",
//    headers:{
//     'Content-Type':'application/json',
  

//   },
  
//   body:JSON.stringify(
//     {
//       email: form.email,
//       password: form.password
     
//   })
// });
// const data = await response.json();
//  console.log("API response",data);
// const saveUser = JSON.parse(localStorage.getItem("user"));
//  if(saveUser.email === form.email && saveUser.password ===  form.password){
//     const token = "abcedfe3fd"
//    localStorage.setItem("access_token",token)

//  if(response.ok && data.access_token){

//    localStorage.setItem("access_token",data.access_token)
//     localStorage.setItem("refresh_token",data.refresh_token)
    
//    console.log("API response",saveUser)
//  toast.success("Account created & login Successfully" ) 
//  setTimeout(() => {
//   navigate('/');
//  }, 2000);
//  }else{
//   toast.error("Invalid Credential")
//  }
//  } catch(error){
//    console.log('error',error);
//    toast.error("Login failed after signup")
   
//   }}
} 
return(
    <div className="main-container">
      <ToastContainer position='top-right' autoClose={2000} />
      <div className='left-contain'>
          <img src="./heroimg.jpg" alt="heroimg" />
             </div>
      <div className='right-container'>
   <h1 className="style">Log in</h1>

    <form  name ="myForm" action="/submit-page" onSubmit={handleSubmit} method="Post">
    <p className='text'>New to Design Space?<a href="/signup" className='signup-link'>Sign up for free</a></p>
      <label className="email">Email address<br />

        <input 
        type="text"
     
        value={form.email}
        onChange={e => {
          setForm({
            ...form,
        email: e.target.value
        });
          }}
       required/>
       {error && <p style={{color:'Red'}}>{error}</p>}
      </label>
      <br />
      <label className="password">Password<br />
      <div style={{ position: "relative", width: "100%" }}>
        <input 
       
         type={passwordVisible ? 'text' :'password'}
       
         value={form.password}
         onChange={e => {
          setForm({
            ...form,
            password: e.target.value
          });
          }} 
          style={{
            width: "100%",
            paddingRight: "40px",
            height: "40px"
          }}
       required/> 
  
      <span onClick={togglePasswordVisibilty}
        style={{position:'absolute',cursor:'pointer',bottom:'42px',right:'1px'}}
      >
         {passwordVisible ? <EyeOff size={20}/> : <Eye size={20} />}
      </span>
          </div>
      
      </label>
      <br /> 
      <button 
  type="button" 
  onClick={handleForgotPassword} 
  style={{ 
    color: "#6d6c6c",
    fontFamily: "'Manrope', sans-serif",
    fontWeight: "400",
    textAlign: "left",
    display: "block",
    background: "none",    
    border: "none",       
         
    cursor: "pointer",     
    fontSize: "17px",
    textDecoration: "underline"
  }}
  onMouseOver={(e) => e.currentTarget.style.color = "#000"} 
  onMouseOut={(e) => e.currentTarget.style.color = "#2b2a2a"}
>
  Forget password?
</button>
     <button type="submit" className="login-btn">Log in</button>

     <div className="divider" style={{ 
  margin: '24px 0',
  display: 'flex',                        
  alignItems: 'center', 
  color: '#999',
  fontSize: '12px',
  fontWeight: '500'
}}>
  <div style={{ flex: 1, height: '1px', backgroundColor: '#f0f0f0' }}></div>
  <span style={{ padding: '0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or</span>
  <div style={{ flex: 1, height: '1px', backgroundColor: '#f0f0f0' }}></div>
</div> 

<button 
  type="button" 
  onClick={handleGoogleLogin} 
  className="google-btn"
  style={{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#ffffff',
    color: '#1f1f1f', 
    border: '1px solid #dadce0', 
    padding: '12px 24px',
    borderRadius: '24px', 
    fontSize: '15px',
    fontWeight: '500', 
    fontFamily: '"Manrope" ,sans-serif',
    cursor: 'pointer',
    transition: 'background-color .2s, box-shadow .2s, border-color .2s',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa';
    e.currentTarget.style.borderColor = '#d2d4d7';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = '#ffffff';
    e.currentTarget.style.borderColor = '#dadce0';
  }}
>
  <img 
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
    alt="Google" 
    width="18" 
    height="18"
  />
  Continue with Google
</button>
    </form>
    </div>
    </div>

  );
}    
  export default Login;



  












  
  
  
  
  
  
  
  
  
  
  
  