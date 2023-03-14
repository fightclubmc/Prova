import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Avatar from "boring-avatars";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, fixDate } from "../utils";

export const Header = () => {

  const [profile, setProfile] = useState({
    "admin":"",
    "created_on":"",
    "email":"",
    "likes":0,
    "messages":0,
    "minecraft_username":"",
    "name":"",
    "questions":0, 
    "role":"",
    "user_id":0
  })

  const [profileModalStatus, setProfileModalStatus] = useState(false)

  const sessionCheck = async () => {
    await axios.get(BASE_URL + '/user/session_check?jwt=' + window.localStorage.getItem("token"))
      .then(response => setIsLoggedIn(true))
      .catch(error => navigate("/signin"))
  }

  const navigate = useNavigate()

  useEffect(() => {
    sessionCheck()
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const stafferColor = (staffer) => {
    switch (staffer) {
      case 'Owner':
        return 'red'
        break;
      case 'Admin':
        return '#ad2cd1'
        break;
      case 'Mod':
        return '#ded123'
        break;
      case 'Developer':
        return '#4d75e3'
        break;
      case 'Pluginner':
        return '#b351cf'
        break;
      case 'Builder':
        return '#eb4c46'
        break;
      case 'Helper SS':
        return 'orange'
        break;
      case 'Helper':
        return 'green'
        break;
      case 'Member':
        return 'gray'
        break;
    }
  }

  return (
    <>
      <Modal
        open={profileModalStatus}
        onClose={() => setProfileModalStatus(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ outline: 'none', border: 'none', justifyContent: 'space-around', display: 'flex', borderRadius: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, boxShadow: 24, pt: 2, px: 4, pb: 3, width: 400 }}>
          <div style={{ borderRadius: 8 }} className='bodyhome mt-4 flex p-10 bg-[#2a313b]'>
            <div>
              <div className='justify-around flex'>
                <div style={{ width: 94 }}>
                  <Avatar
                    size={40}
                    name={profile.minecraft_username}
                    variant="beam"
                    colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                  />
                </div>
              </div>
              <div className=' mt-4 text-xl items-center justify-around flex' style={{ borderRadius: 5, backgroundColor: stafferColor(profile.role) }}><h2 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-[#ffffff]'>{profile.role}</h2></div>
            </div>
            <div className='pl-4'>
              <div className='pt-4 pl-6'>
                <h2 style={{ fontSize: 18, fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>{profile.minecraft_username}</h2>
                <h2 style={{ fontSize: 16, fontFamily: 'League Spartan' }} className='text-[#596270]'>{profile.name}</h2>
              </div>
              <div className='pt-1 pl-6'>
                <h2 style={{ fontSize: 14, fontFamily: 'League Spartan' }} className='font-bold text-[#596270]'>Membro dal {fixDate(profile.created_on)}</h2>
              </div>
              <div className='pl-6 pt-4 flex'>
                <div className='p-2'>
                  <h2 style={{ fontSize: 14, fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>Discussioni</h2>
                  <h2 style={{ textAlign: 'center', fontSize: 14, fontFamily: 'League Spartan' }} className='font-bold text-[#596270]'>{profile.questions}</h2>
                </div>
                <div className='p-2'>
                  <h2 style={{ fontSize: 14, fontFamily: 'League Spartan' }} className='font-bold text-[#ffffff]'>Messaggi</h2>
                  <h2 style={{ textAlign: 'center', fontSize: 14, fontFamily: 'League Spartan' }} className='font-bold text-[#596270]'>{profile.messages}</h2>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <div style={{ height: 54 }}>
        <div style={{ height: 64 }} className="bg-opacity-5 backdrop-blur-sm w-screen bg-[#ffffff] justify-between flex fixed">
          <div style={{ width: 184 }} className="opacity-70 items-center justify-around flex"><img className="w-10" src="fightclub_7.png" alt="" /></div>
          {
            isLoggedIn ? (
              <div className="flex">
                <div onClick={(e) => {setProfile(jwt(window.localStorage.getItem("token")).sub); setProfileModalStatus(true)}} style={{cursor: 'pointer', width: 54 }} className="items-center flex">
                  <div style={{ width: 24 }}>
                    <Avatar
                      size={40}
                      name={jwt(window.localStorage.getItem("token")).sub.minecraft_username}
                      variant="beam"
                      colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                    />
                  </div>
                </div>
                <div style={{ width: 124 }} onClick={(e) => { window.localStorage.setItem("token", ""); navigate("/signin") }} className="text-[#ffffff] items-center flex"><span style={{ fontFamily: 'League Spartan' }}>Esci</span></div>
              </div>
            ) : (
              <div style={{ width: 240 }} className="text-[#ffffff] items-center justify-around flex">
                <span style={{ fontFamily: 'League Spartan' }}>Entra</span>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}