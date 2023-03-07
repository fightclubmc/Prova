import axios from 'axios';
import { useEffect, useState } from 'react';
import { IonIcon } from 'react-ion-icon';
import { BASE_URL } from '../utils';
import { Header } from './Header';
import './styles/index.css'

export const Hero = () => {

  const [serverStats, setServerStats] = useState({})

  const getServerStats = async () => {
    await axios.get(BASE_URL + '/server/get')
    .then(response => setServerStats(response.data))
    .catch(error => console.log(error))
  }

  useEffect(() => {getServerStats()}, [])

  return(
    <div style={{height: 724}} className="bg-cover bg-center bg-[url('../wallpaper1.png')] items-center flex justify-center">
      <div style={{padding: 54}} className=''>
        <div style={{padding: 18}} className='flex items-center'>
          <h1 style={{fontFamily: 'League Spartan'}} className='text-[#ffffff] text-6xl font-bold'>FightClubMC Network</h1>
        </div>
        <div style={{padding: 18}}>
          <h4 style={{fontFamily: 'League Spartan'}} className='text-[#ffffff] text-xl'>Gioca fino alla versione più recente, goditi il server, le nostre modalità e conosci</h4>
          <h4 style={{fontFamily: 'League Spartan'}} className='text-[#ffffff] text-xl'>la nostra fantastica community!</h4>
        </div>
        <div style={{padding: 18}}>
          <span style={{fontFamily: 'League Spartan'}} className='font-bold text-[#ffffff] text-xl'>Al momento ci sono <span className='text-[#9c56bf]'>{serverStats.online_players}</span> utenti online sul nostro server</span>
        </div>
        <div className='flex' style={{padding: 18}}>
          <button style={{fontFamily: 'League Spartan', width: 140, borderRadius: 14, padding: 14}} className='hover:bg-[#6a3882] font-bold mt-5 text-[#ffffff] bg-[#9c56bf]'>GIOCA</button>
          <button style={{fontFamily: 'League Spartan', width: 140, borderRadius: 14, padding: 14}} className='hover:bg-[#6a3882] bg-opacity-20 bg-[#9c56bf] ml-6 border border-purple-800/100 font-bold mt-5 text-[#9c56bf]'>DISCORD</button>
        </div>
        <div style={{padding: 18}} className='flex'>
          <div className='mt-8'>
            <h2 className='text-4xl font-bold text-[#ffffff]' style={{fontFamily: 'League Spartan'}}>{serverStats.questions}</h2>
            <h2 className='mt-4 text-2xl text-[#ffffff]' style={{fontFamily: 'League Spartan'}}>Discussioni</h2>
          </div>
          <div className='ml-14 mt-8'>
            <h2 className='text-4xl font-bold text-[#ffffff]' style={{fontFamily: 'League Spartan'}}>{serverStats.registered_users}</h2>
            <h2 className='mt-4 text-2xl text-[#ffffff]' style={{fontFamily: 'League Spartan'}}>Utenti registrati</h2>
          </div>
        </div>
      </div>
      <div>
        <img style={{width: 434}} src="./fightclub_7.png" alt="" />
      </div>
    </div>
  );
}