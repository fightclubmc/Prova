import { Textarea } from '@mui/joy';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import Avatar from 'boring-avatars'
import jwt from 'jwt-decode';
import { useEffect, useState } from 'react'
import { IonIcon } from 'react-ion-icon';
import { useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { BASE_URL } from '../utils';
import BasicMenu from './BasicMenu';
import { Loading } from './Loading';
import './styles/index.css'
import './styles/style.css'

export const Question = () => {

  const [messages, setMessages] = useState([])

  const [question, setQuestion] = useState({})

  const [isLoading, setIsLoading] = useState(true)

  const [message, setMessage] = useState("")

  const questionId = useParams().question_id

  const getMessages = async () => {
    await axios.get(BASE_URL + "/message/get/" + questionId + "/question?jwt=" + window.localStorage.getItem("token"))
      .then(response => {
        setMessages(response.data)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  }

  const getQuestion = async () => {
    await axios.get(BASE_URL + "/question/get/" + questionId + "?jwt=" + window.localStorage.getItem("token"))
      .then(response => {
        setQuestion(response.data)
        getMessages()
      })
      .catch(error => console.log(error))
  }

  const addLike = async (messageId) => {
    await axios.post(BASE_URL + "/like/add", {
      "user_id": jwt(window.localStorage.getItem("token")).sub.user_id,
      "message_id": messageId
    })
      .then(response => {
        getMessages()
      })
      .catch(error => console.log(error))
  }

  const removeLike = async (messageId) => {
    await axios.delete(BASE_URL + "/like/remove?user_id=" + jwt(window.localStorage.getItem("token")).sub.user_id + "&message_id=" + messageId)
      .then(response => {
        getMessages()
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getQuestion()
  }, [])


  const stafferColor = (staffer) => {
    switch (staffer) {
      case 'Owner':
        return 'red'
        break;
      case 'Admin':
        return '#ad2cd1'
        break;
      case 'Moderatore':
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
      default:
        return 'gray'
        break;
    }
  }

  const addMessage = async () => {
    await axios.post(BASE_URL + '/message/add', {
      'question_id': questionId,
      'owner_id': jwt(window.localStorage.getItem("token")).sub.user_id,
      'body': message
    })
      .then(response => {
        getMessages()
      })
      .catch(error => console.log(error))
  }

  window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODU2NDI4NSwianRpIjoiM2I0ZmQ4NzYtM2Y3Yy00MzBiLWE3NTEtNTViYzdlZGM0MjBhIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQWxiZXJ0byIsImVtYWlsIjoiYSIsIm1pbmVjcmFmdF91c2VybmFtZSI6Im1pY2hhZWwiLCJsaWtlcyI6MiwibWVzc2FnZXMiOjEzLCJxdWVzdGlvbnMiOjAsImFkbWluIjp0cnVlLCJyb2xlIjoiRGV2ZWxvcGVyIiwiY3JlYXRlZF9vbiI6IjIwMjMtMDMtMDUifSwibmJmIjoxNjc4NTY0Mjg1LCJleHAiOjE2ODA5ODM0ODV9.YhIRx64l0sVBkbT440QhErMBpAG_CV2jeWpIj0s1o1A")

  return (
    <div className="justify-around flex w-screen bg-[#242a33]">
      {
        isLoading ? (
          <Loading />
        ) : (
          <div className='justify-around bodyhome flex'>
            <div>
              <div style={{ maxWidth: 1040 }} className='mb-14 pl-8 mt-10 pr-14'>
                <div style={{ borderRadius: 8, fontFamily: 'League Spartan', height: 64 }} className='justify-between pl-10 pr-10 font-bold flex items-center text-[#ffffff] bg-[#2a313b]'>
                  <div>
                    <h2>{question.name}</h2>
                    <h2 className='text-[#596270]'>{question.owner.minecraft_username} - {question.created_on.substring(0, 16)}</h2>
                  </div>
                  <div>
                    <BasicMenu questionId={questionId} />
                  </div>
                </div>
                <div style={{ borderRadius: 8 }} className='bodyhome mt-4 flex p-10 bg-[#2a313b]'>
                  <div>
                    <div className='justify-around flex'>
                      <div style={{ width: 114 }}>
                        <Avatar
                          size={40}
                          name={messages[0]?.owner.minecraft_username}
                          variant="beam"
                          colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                        />
                      </div>
                    </div>
                    <div className='justify-around items-center flex'><h2 style={{ fontFamily: 'League Spartan' }} className='mt-4 text-xl text-[#ffffff]'>{messages[0]?.owner.minecraft_username}</h2></div>
                    <div className=' mt-4 text-xl items-center justify-around flex' style={{ borderRadius: 5, backgroundColor: stafferColor(messages[0]?.owner.role) }}><h2 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-[#ffffff]'>{messages[0]?.owner.role}</h2></div>
                  </div>
                  <div className='p-10'>
                    <h4 className='text-[#ffffff]' style={{ fontSize: 16, fontFamily: 'League Spartan' }}>{messages[0]?.body}</h4>
                  </div>
                </div>
              </div>
              {
                messages.map((message, iteration) => (
                  iteration > 0 &&
                  <div style={{ maxWidth: 1040 }} className='pl-8 mt-4 pr-14'>
                    <div className='flex'>
                      <div style={{ borderRadius: 8 }} className='bodyhome mt-4 flex p-10 bg-[#2a313b]'>
                        <div>
                          <div className='justify-around flex'>
                            <div style={{ width: 114 }}>
                              <Avatar
                                size={40}
                                name={message.owner.minecraft_username}
                                variant="beam"
                                colors={["#9d2b88", "#9d2b87", "#d880d9", "#d164bd", "#d173bf"]}
                              />
                            </div>
                          </div>
                          <div className='justify-around items-center flex'><h2 style={{ fontFamily: 'League Spartan' }} className='mt-4 text-xl text-[#ffffff]'>{message.owner.minecraft_username}</h2></div>
                          <div className=' mt-4 text-xl items-center justify-around flex' style={{ borderRadius: 5, backgroundColor: stafferColor(message.owner.role) }}><h2 style={{ fontSize: 14, fontWeight: 600, fontFamily: 'League Spartan' }} className='text-[#ffffff]'>{message.owner.role}</h2></div>
                        </div>
                        <div className='p-10'>
                          <h4 className='text-[#ffffff]' style={{ fontSize: 16, fontFamily: 'League Spartan' }}>{message.body}</h4>
                        </div>
                        <div className='items-center justify-around flex'>
                          {
                            message.likeable ? (
                              <div>
                                <div style={{ cursor: 'pointer' }} onClick={(e) => addLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart' /></div>
                                <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                              </div>
                            ) : (
                              <div>
                                <div style={{ cursor: 'pointer' }} onClick={(e) => removeLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart-dislike' /></div>
                                <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div style={{ maxWidth: 1040 }} className='pl-8 mt-24 pr-14'>
                {
                  question.closed ? (
                    <>
                      <Textarea
                        placeholder="Non puoi inviare ulteriori messaggi in questa discussione poichè è chiusa"
                        disabled={true}
                        value={message}
                        minRows={2}
                        onChange={(e) => setMessage(e.target.value)}
                        maxRows={4}
                        style={{ color: 'white', border: 'none', outline: 'none', backgroundColor: '#2a313b' }}
                      />
                      <button style={{ color: 'white', fontFamily: 'League Spartan', borderRadius: 5 }} className='opacity-40 mt-4 p-3 bg-[#d880d9]'>Invia messaggio</button>
                    </>
                  ) : (
                    <>
                      <Textarea
                        placeholder="Scrivi messaggio"
                        disabled={false}
                        value={message}
                        minRows={2}
                        onChange={(e) => setMessage(e.target.value)}
                        maxRows={4}
                        style={{ color: 'white', border: 'none', outline: 'none', backgroundColor: '#2a313b' }}
                      />
                      {
                        message.length < 54 ? (
                          <button style={{ color: 'white', fontFamily: 'League Spartan', borderRadius: 5 }} className='opacity-40 mt-4 p-3 bg-[#d880d9]'>Invia messaggio</button>
                        ) : (
                          <button onClick={(e) => { addMessage(); setMessage("") }} style={{ color: 'white', fontFamily: 'League Spartan', borderRadius: 5 }} className='mt-4 p-3 bg-[#d880d9]'>Invia messaggio</button>
                        )
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}