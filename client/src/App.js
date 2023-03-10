import React,{useEffect,createContext,useReducer,useContext} from 'react';
import "./App.css"
import Navbar from './components/Navbar'
import {BrowserRouter, Route ,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import Friendspost from './components/screens/friendspost'
import Reset from './components/screens/reset'
import Newpassword from './components/screens/newpassword'
import {reducer,initialState} from './reducers/userReducer'
import M from  'materialize-css/dist/js/materialize.min.js';


export const UserContext=createContext()
const Routing = ()=>{
  const history=useHistory()
  const {state,dispatch} = useContext(UserContext)
 
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
   if(user){
    dispatch({type:"USER",payload:user})
     //history.push('/')
   }
   else{
     if(!history.location.pathname.startsWith('/reset'))
     history.push('/signin')
   }
  },[])
  return(
    <Switch>  
          <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/createpost">
        <CreatePost/>
        </Route>
        <Route path="/profile/:userid">
        <UserProfile/>
        </Route>
        <Route path="/friendspost">
        <Friendspost/>
        </Route>
        <Route exact path="/reset">
        <Reset/>
        </Route>
        <Route path="/reset/:token">
        <Newpassword/>
        </Route>
        </Switch>
  
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
  <BrowserRouter >
   <Navbar/>
   <Routing/>
   </BrowserRouter>
   </UserContext.Provider>
  );
}


export default App;
