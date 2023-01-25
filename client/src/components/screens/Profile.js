import React,{useEffect,useState,useContext} from 'react'
import{UserContext} from '../../App'

const Profile =()=>{

    const [mypics,setMypics]=useState(null)
    const{state,dispatch}=useContext(UserContext)
    const[Uimage,setUimage] = useState("")
    
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setMypics(result.mypost)
        })
    },[])
    useEffect(()=>{
        if(Uimage){
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
      console.log(data)


    fetch('/changepic',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            pic:data.url
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
        dispatch({type:"UPDATEPIC",payload:result.pic})
    })
    //window.location.reload()
  })
  .catch(err => {
    console.log(err)
  })
     } },[Uimage])
    const updateUImage=(file)=>{
        setUimage(file)
        
    }
    return(
        <>
        {mypics ?
        <div style={{maxWidth:"550px",margin:"0px auto",paddingTop:'80px'}}>
            <div style={{
         
          margin:"18px 0px",
          borderBottom:"1px solid grey"
      }}>
      <div style={{
          display:"flex",
          justifyContent:"space-around",
         
      }}>
          <div>
              <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={state?state.pic:"loading"} alt="hello"/>
              
          </div>
          <div>
              <h4>{state?state.name:"loading"} </h4>
              <h5>{state?state.email:"loading"} </h5>
              <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  width:"108%"
              }}>
                  <h5>{mypics.length} posts</h5>
                  <h5>{state.followers?state.followers.length:"0"} followers</h5>
                  <h5>{state.following?state.following.length:"0"} followings</h5>
              </div>
          </div>
          
      </div>
    
    
      <div className="file-field input-field" style={{margin:"20px 20px 0px 20px"}}>
        <div className="btn #64b5f6 blue lighten-2" style={{margin:"0px 0px 20px 0px"}}>
            <span>Update profile picture</span>
            <input type="file"  onChange={(e)=>updateUImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload  file"/>
        </div>
        </div>
        </div>
    <div className ="gallery">
       { mypics.map(item=>{
            return(
                <>
                {item? <img key={item._id} className="item" src={item.photo} alt={item.title} /> :<h2><center>Loading..!</center></h2>}
               
        </>
            )
        })}
     
    </div>

    </div>:
    <h2><center>
    <div className="progress" style={{marginTop:'150px'}}>
        <div className="indeterminate"></div>
    </div>
        Loading  <br/>
        <div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue-only">
 <div class="circle-clipper left">
   <div class="circle"></div>
 </div><div class="gap-patch">
   <div class="circle"></div>
 </div><div class="circle-clipper right">
   <div class="circle"></div>
 </div>
</div>
</div></center>
        </h2>}
    </>
   )
    
}
export default Profile
