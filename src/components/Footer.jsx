import { IonIcon } from "react-ion-icon/dist";
import { useNavigate } from "react-router-dom";

export const Footer = () => {

  const navigate = useNavigate()

  return(
    <div className="justify-around flex" style={{backgroundColor: '#242a33', height: 424}}>
      <div style={{alignSelf: 'flex-end'}}>
        <div className="justify-around flex">
          <h2 style={{fontFamily: 'League Spartan'}} className=" text-2xl font-bold text-[#ffffff]">Fightclubmc.net</h2>
        </div>
        <div className="justify-around mt-3 flex">
          <div className="flex">
            <div onClick={(e) => navigate("/")} className="font-bold text-[#596270]" style={{cursor: 'pointer', fontSize: 24, fontFamily: 'League Spartan'}}><IonIcon name="home"/></div>
            <h2 onClick={(e) => navigate("/forum")} className="ml-4 font-bold text-[#596270]" style={{cursor: 'pointer', fontSize: 24, fontFamily: 'League Spartan'}}><IonIcon name="chatbubbles"/></h2>
            <h2 onClick={(e) => navigate("/signin")} className="ml-4 font-bold text-[#596270]" style={{cursor: 'pointer', fontSize: 24, fontFamily: 'League Spartan'}}><IonIcon name="log-in"/></h2>
            <h2 onClick={(e) => window.location.href = "https://discord.gg/ayZbpG4G"} className="ml-4 font-bold text-[#596270]" style={{cursor: 'pointer', fontSize: 24, fontFamily: 'League Spartan'}}><IonIcon name="logo-discord"/></h2>
          </div>
        </div>
        <div className="mt-8 justify-around flex">
          <div><h2 className="text-[#44484d]" style={{fontFamily: 'League Spartan'}}>Copyright ©2023, FightClubMC is in no way affiliated with Mojang AB and Microsoft</h2></div>
        </div>
        <div style={{height: 54}}></div>
      </div>
    </div>
  );
}