import React ,{useState,useContext,} from 'react'
import{Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const Newpassword =()=>{

    const history = useHistory()
    const[password,setPassword] = useState("")
    const[password2,setPassword2] = useState("")
    const{token}=useParams()
    console.log(token)

    const PostData=()=>{
        if(password===password2){
            fetch("/newpassword",{
            method :"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            M.toast({html: data.error})
           }
           else{
            M.toast({html:data.message})
            history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })}
        else{
            M.toast({html:'check password'})
           return
        }
    
    }
    return(
        
       <div className="mycard" style={{paddingTop:'70px'}}>
            <div className="card auth-card input-field">
                <h2>NuInsta</h2>
            <input 
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)} />
            <input 
            type="password"
            placeholder="Re Enter new password"
            value={password2}
            onChange={(e)=> setPassword2(e.target.value)}
            />
            < button className="btn waves-effect waves-light #64b5f6 blue lighten-2" 
            onClick={()=>PostData()}>
                Change
             </button>
        
      </div>
      </div>
    )
}
export default Newpassword
