import React ,{useState,useContext,} from 'react'
import{Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
import "../../login.css"
const Login =()=>{
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        
        fetch("/signin",{
            method :"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            M.toast({html: data.error})
           }
           else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER" ,payload:data.user})
            M.toast({html: "Succesfully signin"})
            history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    
    }
    return(
        
    //    <div className="mycard">
    //         <div className="card auth-card input-field">
    //             <h2>NuInsta</h2>
    //             <input  
    //         type="text"
    //         placeholder="email"
    //         value={email}
    //         onChange={(e)=> setEmail(e.target.value)}/>
    //         <input 
    //         type="password"
    //         placeholder="password"
    //         value={password}
    //         onChange={(e)=> setPassword(e.target.value)} />
    //         < button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
    //         onClick={()=>PostData()}>
    //             Signin
    //          </button>
    //              <h5> 
    //              <Link to="/signup">"Don't have an account?"</Link>
    //          </h5>
    //          <h6><Link to="/reset">"Forgot password"</Link></h6>
        
    //   </div>
    //   </div>
    
    <main style={{paddingTop:'40px',paddingTop:'80px'}}>
      <center>
        <img className="responsive-img" style={{width: '250px'}} src="https://i.imgur.com/ax0NCsK.gif" />
        <div className="section"></div>
  
        <h5 className="indigo-text">Please, login into your account</h5>
        <div className="section"></div>
        <div className="input-field">
        <div className="container">
          <div className="z-depth-1 grey lighten-4 row" style={{display:'inline-block', padding: '32px 48px 0px 48px',border:' 1px solid #EEE'}}  >
  
          
              <div className='row'>
                <div className='col s12'>
                </div>
              </div>
  
              <div className='row'>
                <div className='input-field col s12'>
                <input  
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
                  <label for='email'>Enter your email</label>
                </div>
              </div>
  
              <div className='row'>
                <div className='input-field col s12'>
                <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />
                  <label for='password'>Enter your password</label>
                </div>
                <label style={{float: 'right'}}>
                <Link className='pink-text' to="/reset">"Forgot password"</Link>
                              </label>
              </div>
  
              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'  onClick={()=>PostData()}>Login</button>
                </div>
              </center>
         
          </div>
        </div>
        </div>
        <Link to="/signup">"Don't have an account?"</Link>
      </center>
  
      <div className="section"></div>
      <div className="section"></div>
    </main>
    
   )
}
export default Login
