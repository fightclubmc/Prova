import axios from "axios";
import Avatar from "boring-avatars";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Header = () => {

  const sessionCheck = async () => {
    await axios.get(BASE_URL + '/user/session_check?jwt=' + window.localStorage.getItem("token"))
    .then(response => setIsLoggedIn(true))
    .catch(error => navigate("/signin"))
  }

  const navigate = useNavigate()

  useEffect(() => {
    sessionCheck()
  },[])

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return(
    <div style={{height: 54}}>
      <div style={{height: 64}} className="bg-opacity-5 backdrop-blur-sm w-screen bg-[#ffffff] justify-between flex fixed">
        <div style={{width: 184}} className="opacity-70 items-center justify-around flex"><img className="w-10" src="fightclub_7.png" alt="" /></div>
        {
          isLoggedIn ? (
            <div className="flex">
              <div style={{width: 54}} className="items-center flex">
                <div style={{ width: 24 }}>
                  <Avatar
                    size={40}
                    name={jwt(window.localStorage.getItem("token")).sub.minecraft_username}
                    variant="beam"
                    colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                  />
                </div>
              </div>
              <div style={{width: 124}} onClick={(e) => {window.localStorage.setItem("token", ""); navigate("/signin")}} className="text-[#ffffff] items-center flex"><span style={{fontFamily: 'League Spartan'}}>Esci</span></div>
            </div>
          ):(
            <div style={{width: 240}} className="text-[#ffffff] items-center justify-around flex">
              <span style={{fontFamily: 'League Spartan'}}>Entra</span>
            </div>
          )
        }
      </div>
    </div>
  );
}