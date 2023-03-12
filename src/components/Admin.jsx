import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils";

export const Admin = () => {

  const [isLoggedIn, setIsLoggedId] = useState(false)

  const [userAdmin, setUserAdmin] = useState({
    'username': '',
    'password': ''
  })

  const [userData, setUserData] = useState({
    'email': '',
    'role': ''
  })

  const [popupText, setPopupText] = useState("")

  const [popupSeverity, setPopupSeverity] = useState("")

  const [popupStatus, setPopupStatus] = useState(false)

  const admin = async () => {
    console.log(userAdmin)
    await axios.post(BASE_URL + '/user/admin', {
      'username': userAdmin.username,
      'password': userAdmin.password
    })
    .then(response => {
      setIsLoggedId(true)
    })
    .catch(error => console.log(error))
  }

  const handleUserAdmin = (e) => {
    const newUserAdmin = { ...userAdmin }
    newUserAdmin[e.target.name] = e.target.value
    setUserAdmin(newUserAdmin)
  }

  const handleUserData = (e) => {
    const newUserData = { ...userData }
    newUserData[e.target.name] = e.target.value
    setUserData(newUserData)
  }

  const changeRole = async () => {
    await axios.put(BASE_URL + '/user/change/role', userData)
    .then(response => {
      setPopupText("Ruolo cambiato correttamente")
      setPopupSeverity("green")
      setPopupStatus(true)
    })
    .catch(error => {
      setPopupText("Non esiste alcun utente con questa email")
      setPopupSeverity("red")
      setPopupStatus(true)
    })
  }

  return(
    <div className="w-screen h-screen items-center justify-around flex">
      {
        isLoggedIn ? (
          <div>
            <input name="email" onChange={(e) => handleUserData(e)} value={userData.email} placeholder="email dell'utente" />
            <select name="role" onChange={(e) => handleUserData(e)} id="">
              <option value="Member">Membro</option>
              <option value="Mod">Mod</option>
              <option value="Helper">Helper</option>
              <option value="Helper SS">Helper SS</option>
              <option value="Admin">Admin</option>
              <option value="Builder">Builder</option>
              <option value="Pluginner">Pluginner</option>
              <option value="Developer">Developer</option>
              <option value="Owner">Owner</option>
            </select>
            <button onClick={(e) => changeRole()}>Cambia</button>
          </div>
        ):(
          <div style={{height: 140}}>
            <input onChange={(e) => handleUserAdmin(e)} name="username" placeholder="username" type="username" />
            <input onChange={(e) => handleUserAdmin(e)} name="password" placeholder="password" type="password" />
            <button onClick={(e) => admin()}>Accedi</button>
          </div>
        )
      }
      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} open={popupStatus} autoHideDuration={3000} onClose={() => setPopupStatus(false)}>
        <Alert style={{fontFamily: 'League Spartan', color: 'white', backgroundColor: popupSeverity}} onClose={() => setPopupStatus(false)} severity="" sx={{ width: '100%' }}>
          {popupText}
        </Alert>
      </Snackbar>
    </div>
  );

}