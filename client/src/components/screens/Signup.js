import React , {useState,useEffect} from 'react'
import{Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import "../../login.css"

const Signup =()=>{
    const history = useHistory()
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const[Uimage,setUimage] = useState("")
    const[url,setUrl] = useState(undefined)
    useEffect(()=>{
            if(url){
                uploadDeatails()
            }
    },[url])
    const UploadUserImage=()=>{
        const data=new FormData()
        data.append("file",Uimage)
        data.append("upload_preset","nuinsta")
        data.append("cloud_name","nuinsta")
        
fetch("	https://api.cloudinary.com/v1_1/nuinsta/image/upload", {
    method: 'post',
    body: data
  })
  .then(res => res.json())
  .then(data => {
      //console.log(data)
    setUrl(data.url)
  })
  .catch(err => {
    console.log(err)
  })
    }
    const uploadDeatails=()=>{ if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email"})
        return
    }
    else{
    fetch("/signup",{
        method :"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
        M.toast({html: data.error})
       }
       else{
        M.toast({html: data.message})
        history.push('/signin')
       }
    }).catch(err=>{
        console.log(err)
    })
}}
    const PostData=()=>{
        if(Uimage){
            UploadUserImage()
        }
        else{
          uploadDeatails()  
        }
        
    }
    return(
        
//         <div className="mycard">
//         <div className="card auth-card input-field">
//             <h2>NuInsta</h2>
//             <input  
//             type="text"
//             placeholder="name"
//             value={name}
//             onChange={(e)=> setName(e.target.value)}/>
//             <input  
//             type="text"
//             placeholder="email"
//             value={email}
//             onChange={(e)=> setEmail(e.target.value)}/>
//             <input 
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={(e)=> setPassword(e.target.value)} />

//              <div className="file-field input-field">
//         <div className="btn #64b5f6 blue lighten-2">
//             <span>Upload profile image</span>
//             <input type="file"  onChange={(e)=>setUimage(e.target.files[0])}/>
//         </div>
//         <div className="file-path-wrapper">
//             <input className="file-path validate" type="text" placeholder="Upload  file"/>
//         </div>
//         </div>
//             < button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
//             onClick={()=>PostData()}>
//                 Signup
//              </button>
//              <h5> 
//                  <Link to="/signin">"Already have an account?"</Link>
//              </h5>
    
//   </div>
//   </div>
<main style={{paddingTop:'40px',paddingTop:'80px'}}>
      <center>
        <img className="responsive-img" style={{width: '250px'}} src="https://i.imgur.com/ax0NCsK.gif" />
        <div className="section"></div>
  
        <h5 className="indigo-text">Please, Register for get account</h5>
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
            placeholder="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}/>
                  <label for='email'>Enter your name</label>
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
               
              </div>
                <div className='row'>
                <div className="file-field input-field">
        <div className="btn #64b5f6 waves-effect indigo">
             <span>Upload profile image</span>
             <input type="file"  onChange={(e)=>setUimage(e.target.files[0])}/>
         </div>
         <div className="file-path-wrapper">
             <input className="file-path validate" type="text" placeholder="Upload  file"/>
         </div>
         </div>
              </div>
  
              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'   onClick={()=>PostData()}>Register</button>
                </div>
              </center>
         
          </div>
        </div>
        </div>
        <Link to="/signin">"Do you have an account?"</Link>
      </center>
  
      <div className="section"></div>
      <div className="section"></div>
    </main>
    )
}
export default Signup
