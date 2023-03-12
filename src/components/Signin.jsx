import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Signin = () => {

  const [user,setUser] = useState({
    'email': '',
    'password': ''
  })

  const navigate = useNavigate()

  const [popupStatus, setPopupStatus] = useState(false)

  const handleUser = (e) => {
    const newUser = { ...user }
    newUser[e.target.name] = e.target.value
    setUser(newUser)
  }

  const signin = async () => {
    await axios.post(BASE_URL + '/user/signin', user)
    .then(response => {
      window.localStorage.setItem("token", response.data.param)
      navigate("/")
    })
    .catch(error => setPopupStatus(true))
  }

  return(
    <div className="items-center justify-around flex bg-[#242a33] h-screen w-screen">
      <div style={{width: 340, height: 384}} className="bg-[#2a313b]">
        <div className="items-center justify-around flex p-8">
          <h2 style={{fontFamily: 'League Spartan'}} className="font-bold text-2xl text-[#ffffff]">Accedi</h2>
        </div>
        <div className="items-center justify-around flex">
          <div>
            <div className="mt-2">
              <h2 className="text-[#ffffff]" style={{fontFamily: 'League Spartan'}}>E-mail</h2>
              <input name="email" value={user.email} onChange={(e) => handleUser(e)} style={{borderRadius: 5}} className="p-1 bg-[#596270]" type="text" />
            </div>
            <div className="mt-4">
              <h2 className="text-[#ffffff]" style={{fontFamily: 'League Spartan'}}>Password</h2>
              <input name="password" value={user.password} onChange={(e) => handleUser(e)} style={{borderRadius: 5}} className="p-1 bg-[#596270]" type="text" />
            </div>
          </div>
        </div>
        {
          user.email == "" || user.password == "" ? (
            <div className="mt-10 items-center justify-around flex">
              <button style={{borderRadius: 4, fontFamily: 'League Spartan'}} className="opacity-40 font-bold text-[#ffffff] bg-[#D880D9] pr-5 pl-5 p-3">ACCEDI</button>
            </div>
          ):(
            <div className="mt-10 items-center justify-around flex">
              <button onClick={(e) => signin()} style={{borderRadius: 4, fontFamily: 'League Spartan'}} className="font-bold text-[#ffffff] bg-[#D880D9] pr-5 pl-5 p-3">ACCEDI</button>
            </div>
          )
        }
      </div>
      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={popupStatus} autoHideDuration={3000} onClose={() => setPopupStatus(false)}>
        <Alert style={{fontFamily: 'League Spartan', color: 'white', backgroundColor: 'red'}} onClose={() => setPopupStatus(false)} severity="" sx={{ width: '100%' }}>
          Credenziali non valide
        </Alert>
      </Snackbar>
    </div>
  );
}