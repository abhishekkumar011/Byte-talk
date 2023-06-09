import { useStateValue } from "../../context/StateProvider"
import { auth, provider } from "../firebase"
import "./login.css"

const Login = () => {

  const [{},dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider).then(result => {
      dispatch({
        type: "SET_USER",
        user: result.user
      })
    }).catch(error => alert(error))
  }

  return (
    <div className='login-wrapper'>
        <div className="login">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-whatsapp-circle-1868968-1583132.png?f=webp" alt="logo"/>
            <h2>Sign in to Whatsapp</h2>
            <button onClick={signIn}>Login with Gmail</button>
        </div>
    </div>
  )
}

export default Login