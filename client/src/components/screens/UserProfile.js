import React,{useEffect,useState,useContext} from 'react'
import{UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile =()=>{

    const [userProfile,setProfile]=useState(null)
    const{state,dispatch}=useContext(UserContext)
    const {userid}=useParams()
    const[showfollow,setshowfollow]=useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
           setProfile(result)
         
        })
    },[])

    const followuser=()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({followId:userid})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setshowfollow(false)
        })
    }

    const unfollowuser=()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({unfollowId:userid})
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                const newfollower=prevState.user.followers.filter(item=>item!==data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newfollower
                    }
                }
            })
            setshowfollow(true)
        })
    }
    return(
        <>
        {userProfile ?
        
        <div style={{maxWidth:"550px",margin:"0px auto",paddingTop:'80px'}}>
        <div style={{
            display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src={userProfile.user.pic} alt="hello"/>
            </div>
            <div>
                <h4>{userProfile.user.name}</h4>
                <h5>{userProfile.user.email}</h5>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    width:"108%"
                }}>
                    <h5>{userProfile.posts.length} posts</h5>
                    <h5>{userProfile.user.followers.length} followers</h5>
                    <h5>{userProfile.user.following.length} followings</h5>
  
                </div>
                {showfollow?        <button  className="btn waves-effect waves-light #64b5f6 red lighten-2" style={{
                    margin:"0.5px"
                }}
        onClick={()=>{followuser()}
        }
        >
           follow
        </button>
        :
                <button  className="btn waves-effect waves-light #64b5f6 red lighten-2" style={{
                    margin:"0.5px"
                }}
                onClick={()=>{unfollowuser()}
                }
                >
                   unfollow
                </button>
                }
        
        
            </div>
        </div>
      <div className ="gallery">
         { userProfile.posts.map(item=>{
              return(
                  <img key={item._id} className="item" src={item.photo} alt={item.title} /> 
          
              )
          })}
       
      </div>
      </div>

            
         : <h2><center>
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
             </h2>
        }
        </>
      
   )
    
}
export default Profile
