// import { useState,useEffect } from "react";
// // import { getPostsByID } from "../apis/post";
// import React from 'react';
// // import { useNavigate } from "react-router-dom";

// function SingleBook(){
//   const[data,setData]=useState([]);
//   const[title,setTitle]=useState("");
//   const[body,setBody]=useState("");
//   // const navigate = useNavigate();

//   //   function saveUser(){
//   //    console.log({name,email});
//   //    let data={name,email}
//   //    fetch("https://jsonplaceholder.typicode.com/posts",
//   //    {
//   //     method:"POST",
//   //    headers:
//   //   {'Content-Type':'application/json'
//   //   },
//   //   body:JSON.stringify(data)
//   // }).then((result)=>{
//   //   result.json().then((response)=>{
//   //     console.log('response',response)
//   //   })
//   // })
//   // }
//   useEffect(()=>{
//     getUserData()
//   },[]);
//   const getUserData=async()=>{
//     let response = await fetch("https://jsonplaceholder.typicode.com/users");
//      response =await response.json();
//      console.log(response);
//     // setData(updated.User);
//     setTitle("updated.title");
//     setBody("updated.body")
//     setData([response]);

  
//   }
// const updateUser=async()=>{
//     console.log(title,body);
//     let response = await fetch("https://jsonplaceholder.typicode.com/users/1",
//       {method:"PUT",
//       headers:{
//         'Content-Type':'application/json'
//       },
//    body:JSON.stringify({
//     id: 1,
//     title: "Aayushi",
//     body: "Software Engineer",
//     userId: 1
//   })
//   });
//    response = await response.json();
//    console.log("Updated response",response );
//    if(response){
//     alert("user data updated ");
//    }

//    }
// // const deleteUser=async(id)=>{
 
// // let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
// //    {method:"DELETE"})
// //   if(response.ok){
// //   alert("user data deleted");
// //   const updatedUser= data.filter(user=>user.id !==id);
// //   setData(updatedUser);
// //  }else{
// //   alert("data failed")
// //  }
// // };
//    return (
//     <div className="Book">
//     {data.length >0 ? (
//       data.map((e) => (
//         <div key={e} >
//           <h2>{e.id}</h2>

//           <h2>{e.userId}</h2>
//           <h2>{e.title}</h2>
//           <p>{e.body}</p>
//              <button onClick={updateUser}>Update</button>
//         </div>
//       ))
//     ) : (
//       <p>No data</p>
//     )}
//        {/* <button onClick={()=>deleteUser(e.id)}>Delete</button> */}
//   </div>

//   )
// }

// export default SingleBook;