import React ,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost =()=>{
    const history = useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
     useEffect(()=>{
         if(url){ 
              fetch("/createpost",{
            method :"post",
            headers:{
                "Content-Type":"application/json" ,
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
           if(data.error){
            M.toast({html: data.error})
           }
           else{
            M.toast({html: "Succesfully created"})
            history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })}

     },[url])
    const postDetails=()=>{
        const data=new FormData()
        data.append("file",image)
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

    

    return(
        // <div className="card input field"
        // style={{
        //     margin:"30px auto",
        //     maxWidth: "500px",
        //     padding:"20px",
        //     textAlign:"center"
        // }}
        // >
        //     
           
        // <div className="file-field input-field">
        // <div className="btn #64b5f6 blue lighten-2">
        //     <span>Upload image</span>
        //     <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
        // </div>
        // <div className="file-path-wrapper">
        //     <input className="file-path validate" type="text" placeholder="Upload  file"/>
        // </div>
        // </div>
        
        // <button  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
        // onClick={()=>{postDetails()}
        // }
        // >
        //  Create Post
        // </button>
        // </div>
        <main style={{paddingTop:'40px',paddingTop:'70px'}}>
      <center>
        <img className="responsive-img" style={{width: '250px'}} src="https://i.imgur.com/ax0NCsK.gif" />
        <div className="section"></div>
  
        <h5 className="indigo-text">Publish Your Event Details</h5>
        <div className="section"></div>
        <div className="input-field">
        <div className="container">
          <div className="z-depth-1 grey lighten-4 row" style={{display:'inline-block', padding: '32px 48px 0px 48px',border:' 1px solid #EEE'}}  >
  
          
              <div className='row'>
                <div className='col s12'>
                    <b>
                <p className="green-text" >You should need to fill all the fields for create post. <br/>
                As well as You can only upload one image for per one post.</p>
               </b>
                </div>
              </div>
  
              <div className='row'>
                <div className='input-field col s12'>
                <input type="text" placeholder="title" value={title}
            onChange={(e)=> setTitle(e.target.value)}/>
           
                  <label for='email'>Enter Your Event Title</label>
                </div>
              </div>
  
              <div className='row'>
                <div className='input-field col s12'>
                <input type="text" placeholder="body"value={body}
            onChange={(e)=> setBody(e.target.value)}/>
                  <label for='password'>Enter Your Description</label>
                </div>
                
              </div>
              
              <div className='row'>
               <div className="file-field input-field">
         <div className="btn #64b5f6 waves-effect indigo">
             <span>Upload image</span>
             <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
         </div>
         <div className="file-path-wrapper">
             <input className="file-path validate" type="text" placeholder="Upload  file"/>
         </div>
         </div>
              </div>
  
  
              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'  onClick={()=>{postDetails()}}>Create Your Post</button>
                </div>
              </center>
         
          </div>
        </div>
        </div>
       
      </center>
  
      <div className="section"></div>
      <div className="section"></div>
    </main>
    )
}
export default CreatePost