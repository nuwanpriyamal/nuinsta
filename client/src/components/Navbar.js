import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar=()=>{
  const{state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){
      return [
        <li><Link to={state?"/":"/signin"} >Home</Link></li>,
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/createpost">CreatePost</Link></li>,
      <li><Link to="/friendspost">FriendsPost</Link></li>,
      <li>  <button  className="btn signout waves-effect waves-light #64b5f6 waves-effect indigo "
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR" })
        history.push('/signin')
      }
      } style={{marginRight:'10px'}}
      >
      Sign out
      </button></li>
    ]
    }
    else{
      return[
      <li><Link to="/signin">Login</Link></li>,
      <li><Link to="/signup">Sign up</Link></li>]
    }
  }
    return(
      //   <nav>
      //   <div className="nav-wrapper white">
          
      //   </div>
      // </nav>


 <div className="App">
<nav style={{position:'fixed',top:'0',display:'block',zIndex:'999999999'}}>

   <div className="nav-wrapper">

     <Link to={state?"/":"/signin"} className="brand-logo" style={{marginLeft:'10px'}}>NuInsta</Link>
     <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down ">
           {renderList()}
          </ul>
    
   </div>

   

 </nav>

 <ul className="sidenav" style={{zIndex:'999999999'}}id="mobile-demo">
   {renderList()}
  </ul>
    
 </div>

            
    )
}
export default Navbar