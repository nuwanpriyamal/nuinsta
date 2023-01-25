import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home =()=>{
    const [data,setData]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
         fetch('/friendpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then (res=>res.json())
        .then (result=>{
           console.log(result)
           setData(result.postse)
        })
    },[])
    const likepost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id,
            })
        }).then(res=>res.json())
        .then(result=>{
          //  console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            }) 
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const unlikepost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id,
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            }) 
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const makeComment=(text,postId)=>{
fetch('/comments',{
    method:"put",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        postId,
        text

    })
}).then(res=>res.json())
.then(result=>{
    console.log(result)
    const newData=data.map(item=>{
        if(item._id==result._id){
            return result
        }else{
            return item
        }
    }) 
    setData(newData)

}).catch(err=>{
    console.log(err)
})
    }
    const deletePost=(postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
           const newData=data.filter(item=>{
                return item._id !== result._id
           })
            setData(newData)
        })
    }
    const deleteComment=(postId)=>{
        
        fetch(`/deletecomment/${postId}`,
        {
            
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
      
            
        }).then(res=>res.json())
        
        .then(result=>{
            
            console.log(result)
            const newData=data.filter(record=>{
                return record._id !== result._id
            })
        
            setData(newData)
        })
    }
    return(
        <>
        {data?
        <div className="home" style={{paddingTop:'70px'}}>{
           data.map(item=>{
               return(
              
                <div className="card home-card" key={item._id}>
                    <h5><b><Link to={item.postedBy._id!==state._id ? "/profile/"+item.postedBy._id:"/profile"}> {item.postedBy.name}</Link></b>{item.postedBy._id==state._id 
                    && <i className="material-icons" style={{float:"right"}}
                    onClick={()=>deletePost(item._id)} >delete</i>}</h5>
                     <div className="card-image">
                        <img src={item.photo}/>
                    </div>
                    <div className="card-content">  
                        <i className="material-icons" style={{color:"red"}}>favorite</i> 
                      <Link>  {item.likes.includes(state._id)? <i className="material-icons" onClick={()=>{unlikepost(item._id)}}>thumb_down</i> :<i className="material-icons"  onClick={()=>{likepost(item._id)}}>thumb_up</i> }</Link>
                        
                       
               <h6> {item.likes.length} likes</h6>
               <h6><b>{item.title}</b></h6>
               <p> {item.body}</p>
               <hr/>
               {
                   item.comments.map(record=>{
                       return(
                    
                      <h6 key={record._id}>
                           <b style={{fontSize:12}}><Link to={record.postedBy._id!==state._id ? "/profile/"+record.postedBy._id:"/profile"}>{record.postedBy.name}</Link></b> {record.text}{record.postedBy._id==state._id 
                        && <i className="material-icons" style={{float:"right"}}
                       onClick={()=>deleteComment(record._id)} >delete</i>}</h6>
                   
                       )
                   })
               }
               <form onSubmit={(e)=>{
                   e.preventDefault()
                   makeComment(e.target[0].value,item._id)
               }}>
               <input type="text" placeholder="add comment"/>
               </form>
                 
                 </div>
 
            </div>
           
           
            )
                 })
       }
         
       </div>
      
   
      :
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
          </h2>}</>)
}
export default Home
