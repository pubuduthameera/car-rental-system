import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';


function App() {
  const [username,setUsername] = useState('');
  const [password,setpassword] = useState('');
  const [email,setemail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const reposnse=await axios.post('http://localhost:5001/register',{
              username:username,
              password:password,
              email:email
              });
              if (reposnse.data.success) {
                  alert(reposnse.data.message)
                 navigate("/login");
              }

      } catch (error) {
          console.log(error);
      }
  }

  return (
    <>
    <Header/>
<div className="container-fluid">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-xs-12">
      <div className="card bg-white my-5 mx-auto" style={{borderRadius: '1rem', maxWidth: 500}}>
        <div className="card-body p-5 w-100 d-flex flex-column">
          <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input id="name" type="text" className="form-control form-control-lg" required onChange={(e)=>{setUsername(e.target.value)}}/>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">Email address</label>
            <input id="email" type="email" className="form-control form-control-lg" required onChange={(e)=>{setemail(e.target.value)}}/>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" className="form-control form-control-lg" required onChange={(e)=>{setpassword(e.target.value)}}/>
          </div>
          <button className="btn btn-primary btn-lg btn-block" >
            Register
          </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</>

  );
}

export default App;
