import React ,{useState,useContext,} from 'react'
import{Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import "../../login.css"
const Reset =()=>{
 
    const history = useHistory()
   
    const[email,setEmail] = useState("")
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email"})
            return
        }
        
        fetch("/resetpassword",{
            method :"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error})
           }
           else{
            M.toast({html:data.message})
            history.push('/signin')
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
            
    //         < button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
    //         onClick={()=>PostData()}>
    //             reset password
    //          </button>
            
    //   </div>
    //   </div>
    <main style={{paddingTop:'40px',paddingTop:'80px'}}>
      <center>
        <img className="responsive-img" style={{width: '250px'}} src="https://i.imgur.com/ax0NCsK.gif" />
        <div className="section"></div>
  
        <h5 className="indigo-text">Please, Input your email address for change Password</h5>
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
                  <label for='email'>Enter your email address</label>
                </div>
              </div>
  
              
  
              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo' onClick={()=>PostData()}>Reset Password</button>
                </div>
              </center>
         
          </div>
        </div>
        </div>
        <Link to="/signin">"Go back to login page"</Link>
      </center>
  
      <div className="section"></div>
      <div className="section"></div>
    </main>
    )
}
export default Reset
