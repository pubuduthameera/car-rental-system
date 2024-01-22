import React,{useEffect,useState} from "react";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { format } from "date-fns";
import Loginheder from "../components/Header/Loginheder";

const MyTestomonial = () => {
  const [whologedin,setWhologedin]=useState('');
  const [testomonial,setTestomonial]=useState([]);

  axios.defaults.withCredentials = true;
useEffect(()=>{
  axios.get('http://localhost:5001')
  .then(responce =>{
if (responce.data.valid) {
  setWhologedin(responce.data.userid);

}else{
  window.location.href='/';
}
  })
  .catch(err=> console.log(err));
},[])

useEffect(()=>{
  async function fetchTestomonial(){
    try{
      const responce=await axios.get('http://localhost:5001/gettestermonial');
      const filteredTestomonial=responce.data.filter(item=>item.user._id===whologedin);
      setTestomonial(filteredTestomonial);
    }catch(error){
      console.error('Error fetching testomonial:', error);
    }
  }
  if(whologedin){
    fetchTestomonial();
  }
},[whologedin]);

  return (
    <><Loginheder /><div className="testo" style={{ display: "flex" }}>
      <Sidebar />
      <div
        className="content"
        style={{
          margin: "10px",
          borderBottom: "1px solid gray",
          width: "550px",
        }}
      >
        <h3 style={{ textDecoration: "underline" }}>MY TESTIMONIALS</h3>
        {testomonial.map(item => (
          <>
            <h4>{item.comment}</h4>
            <h4>{format(new Date(item.date), "dd MMM yyyy")}</h4>
            <div style={{ display: "flex", justifyContent: "end", padding: "10px" }}>
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
                Active
              </button>
            </div>
          </>
        ))}

      </div>
    </div></>
  );
};

export default MyTestomonial;
