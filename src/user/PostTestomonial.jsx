import React,{useState,useEffect} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import axios from 'axios';
import Loginheder from '../components/Header/Loginheder';


const PostTestomonial = () => {
const [whologedin,setWhologedin]=useState('');
const [useremil,setUseremil]=useState('');
const [comment,setComment]=useState('');

axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get('http://localhost:5001')
  .then(responce =>{
if (responce.data.valid) {
  setWhologedin(responce.data.userid);
  console.log(responce.data.userid);
}else{
  window.location.href='/';
}
  })
  .catch(err=> console.log(err));
},[])

const handlesubmit=async (e)=>{
    e.preventDefault();
    try {
        const response=await axios.post('http://localhost:5001/testermonial',{
            comment:comment,
            userid:whologedin
        });
        if (response.data.success) {
            alert(response.data.message);
            //  navigate("/stripe");
          }
    } catch (error) {
        console.log(error);
    }

}

  return (
   <>
   <Loginheder/>
   <div className="testo" style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="content"
        style={{
          margin: "10px",
          borderBottom: "1px solid gray",
          width: "550px",
        }}
      >
        <h3 style={{ textDecoration: "underline" }}>Post TESTIMONIALS</h3>
     <div className=''>
     <label className='text-left'>Testimonial</label>
        <form action="" onSubmit={handlesubmit}>
            <textarea name="" id="" cols="50" rows="5" className='ms-5' onChange={(e)=>{setComment(e.target.value)}}/>
            <div style={{display:"flex",justifyContent:"end",padding:"10px"}}>
          <button
            style={{
              backgroundColor: "lightgreen",
              fontWeight: "600",
              width: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              borderRadius: "10px",
            }}
        
          >
            post
          </button>
        </div>
        </form>
     </div>

       
      </div>
    </div>
   </>
  )
}

export default PostTestomonial
