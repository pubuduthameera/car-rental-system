import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { toast } from 'react-toastify';


function App() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/login', { username, password });
      if (response.data.success===true) {
        setMessage(response.data.message)
        // alert(message)
        navigate("/rentcar");
      }else{
        setMessage(response.data.message)
      
      }
      // Redirect to dashboard or home page
        
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <>
    <Header/>
  <div className="container-fluid">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-xs-12">
      <div className="card bg-white my-5 mx-auto" style={{borderRadius: '1rem', maxWidth: 500}}>
        <div className="card-body p-5 w-100 d-flex flex-column">
          <h2 className="fw-bold mb-2 text-center">Sign in</h2>
          {/* <p className="text-white-50 mb-3">Please enter your login and password!</p> */}
          <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="form-label">User Name</label>
            <input id="username" type="text" className="form-control form-control-lg" onChange={(e)=>{setusername(e.target.value)}}/>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input id="password" type="password" className="form-control form-control-lg" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <button className="btn btn-primary btn-lg btn-block">Login</button>
          </form>
          <span>Do you have an Account?<Link to="/register">Register now</Link></span>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  
  );
}

export default App;
