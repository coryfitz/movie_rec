import axios from "axios";
import {useState} from "react";
import Navigation from "./Navigation";

const Signup = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const submit = async e => {
          e.preventDefault();
          const user = {
                email: email,
                password: password
               };
          // Create the POST requuest
          const {data} = await                                                                            
                         axios.post('http://localhost:8000/api/register/',      
                         user, {headers:      
                          {'Content-Type': 'application/json'}
     });


         // Initialize the access & refresh token in localstorage.      
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
         axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${data['access']}`;
         window.location.href = '/'
    }
    return(
      <div>
        <Navigation />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign up for an Account</h3>
            <div className="form-group mt-3">
              <label>Email</label>
              <input className="form-control mt-1" 
                placeholder="Enter email" 
                name='email'  
                type='text' value={email}
                required 
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Submit</button>
            </div>
          </div>
       </form>
     </div>
     </div>
     )
    }

export default Signup