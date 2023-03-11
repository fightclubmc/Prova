import axios from "axios";
import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import { IonIcon } from "react-ion-icon";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils";

export const Questions = () => {

  const [questions, setQuestions] = useState([])

  const categoryId = useParams().category_id

  const getQuestions = async () => {
    await axios.get(BASE_URL + '/question/get/' + categoryId + "/category?jwt=" + window.localStorage.getItem("token"))
    .then(response => setQuestions(response.data))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getQuestions()
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
              questions.map(question => (
                <div onClick={(e) => navigate("/question/" + question.question_id)} style={{borderBottomWidth: 1, borderBottomColor: '#384554', height: 94}} className="justify-between items-center flex">
                  <div className="pr-4 pl-4 flex">
                    <div className='justify-around flex'>
                      <div style={{ width: 34 }}>
                        <Avatar
                          size={40}
                          name={question.owner.minecraft_username}
                          variant="beam"
                          colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex">
                        <h2 style={{fontSize: 18, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-xl ml-4 text-[#ffffff]'>{question.name}</h2>
                        <div style={{width: 78}} className="items-center ml-2 text-2xl justify-around flex">
                        {
                          question.status == 'just_created' && 
                            <div style={{height: 21.4, fontFamily: 'League Spartan', borderRadius: 5}} className="font-bold items-center flex pr-2 pl-2 bg-[#eb9a5b] text-[#ffffff]" ><h2 style={{fontSize: 9}}>DA VALUTARE</h2></div>
                        }
                        {
                            question.status == 'reading' &&
                            <div style={{height: 21.4, fontFamily: 'League Spartan', borderRadius: 5}} className="font-bold items-center flex pr-2 pl-2 bg-[#d97b2e] text-[#ffffff]" ><h2 style={{fontSize: 9}}>IN VALUTAZIONE</h2></div>
                        }
                        {
                          question.status == 'accepted' &&
                          <div style={{height: 21.4, fontFamily: 'League Spartan', borderRadius: 5}} className="font-bold items-center flex pr-2 pl-2 bg-[#8fc46c] text-[#ffffff]" ><h2 style={{fontSize: 9}}>ACCETTATA</h2></div>
                        }
                        {
                          question.status == 'rejected' &&
                          <div style={{height: 21.4, fontFamily: 'League Spartan', borderRadius: 5}} className="font-bold items-center flex pr-2 pl-2 bg-[#d96a5d] text-[#ffffff]" ><h2 style={{fontSize: 9}}>RIFIUTATA</h2></div>
                        }
                        </div>
                      </div>
                      <h2 style={{fontSize: 14, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-xl ml-4 text-[#596270]'>{question.owner.minecraft_username} - {question.created_on}</h2>
                    </div>
                  </div>
                  <div className="ml-8 flex">
                    <div className="pl-2 pr-2" style={{textAlign: 'center'}}>
                      <h2 style={{fontFamily: 'League Spartan'}} className="font-bold text-[#ffffff]">Messaggi</h2>
                      <h2 className="font-bold" style={{fontFamily: 'League Spartan', color: '#596270'}}>{question.messages}</h2>
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