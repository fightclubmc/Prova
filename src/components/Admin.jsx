import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils";

export const Admin = () => {

  const [isLoggedIn, setIsLoggedId] = useState(false)

  const [userAdmin, setUserAdmin] = useState({
    'username': '',
    'password': ''
  })

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

  return(
    <div className="w-screen h-screen items-center justify-around flex">
      {
        isLoggedIn ? (
          <div>
            <input type="email dell'utente" />
          </div>
        ):(
          <div style={{height: 140}}>
            <input onChange={(e) => handleUserAdmin(e)} name="username" placeholder="username" type="username" />
            <input onChange={(e) => handleUserAdmin(e)} name="password" placeholder="password" type="password" />
            <button onClick={(e) => admin()}>Accedi</button>
          </div>
        )
      }
    </div>
  );

}