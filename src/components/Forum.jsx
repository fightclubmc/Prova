import axios from "axios";
import { useEffect, useState } from "react";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Forum = () => {

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    await axios.get(BASE_URL + '/category/get')
    .then(response => setCategories(response.data))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getCategories()
  },[])

  const navigate = useNavigate()

  return(
    <div className="justify-around flex w-screen bg-[#242a33]">
      <div className='justify-around bodyhome flex'>
        <div>
          <div style={{maxWidth: 1040 }} className='pl-8 mt-14 pr-14'>
            <div style={{borderRadius: 10, fontFamily: 'League Spartan', height: 64 }} className='pl-10 pr-10 font-bold flex items-center text-[#ffffff] bg-[#2a313b]'>
              <IonIcon style={{color: '#D880D9', fontSize: 18}} name="chatbubbles"/>
              <h2 className='ml-4 text-xl'>Discussioni</h2>
            </div>
            <div className='mt-4 p-10 bg-[#2a313b]'>
            {
              categories.map(category => (
                <div onClick={(e) => navigate("/forum/" + category.category_id)} style={{borderBottomWidth: 1, borderBottomColor: '#384554', height: 94}} className="justify-between items-center flex">
                  <div className="pr-4 pl-4 flex">
                    <div className="text-[#596270] text-2xl"><IonIcon name="chatbox"/></div>
                    <h2 style={{fontSize: 18, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-xl ml-4 text-[#ffffff]'>{category.name}</h2>
                  </div>
                  <div className="bodyhome ml-14 flex">
                    <div className="pl-8 pr-8" style={{textAlign: 'center'}}>
                      <h2 style={{fontFamily: 'League Spartan'}} className="font-bold text-[#ffffff]">Messaggi</h2>
                      <h2 className="font-bold" style={{fontFamily: 'League Spartan', color: '#596270'}}>{category.messages}</h2>
                    </div>
                    <div className="pr-8 pl-4" style={{textAlign: 'center'}}>
                      <h2 style={{fontFamily: 'League Spartan'}} className="font-bold text-[#ffffff]">Discussioni</h2>
                      <h2 className="font-bold" style={{fontFamily: 'League Spartan', color: '#596270'}}>{category.questions}</h2>
                    </div>
                    <div className="items-center ml-4 text-2xl justify-around flex">
                      {
                        category.private ? (
                          <div className="opacity-40 text-[#D880D9]" ><IonIcon name="lock-closed"/></div>
                        ):(
                          <div className="text-[#D880D9]"><IonIcon name="lock-open"/></div>
                        )
                      }
                    </div>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}