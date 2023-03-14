import { Textarea } from '@mui/joy';
import { Alert, Modal, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import Avatar from 'boring-avatars'
import jwt from 'jwt-decode';
import { useEffect, useState } from 'react'
import { IonIcon } from 'react-ion-icon';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { BASE_URL, fixDate } from '../utils';
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

  const navigate = useNavigate()

  const getMessages = async () => {
    await axios.get(BASE_URL + "/message/get/" + questionId + "/question?jwt=" + window.localStorage.getItem("token"))
      .then(response => {
        setMessages(response.data)
        setTimeout(() => { setIsLoading(false) }, 1000);
      })
      .catch(error => console.log(error))
  }

  const getQuestion = async () => {
    await axios.get(BASE_URL + "/question/get/" + questionId + "?jwt=" + window.localStorage.getItem("token"))
      .then(response => {
        setQuestion(response.data)
        getMessages()
      })
      .catch(error => navigate("/"))
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

  const removeMessage = async (messageId) => {
    await axios.delete(BASE_URL + '/message/remove/' + messageId + "?jwt=" + window.localStorage.getItem("token"))
      .then(response => {
        getMessages()
      })
      .catch(error => console.log(error))
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
      <div className="justify-around flex w-screen bg-[#242a33]">
        {
          isLoading ? (
            <Loading />
          ) : (
            <div className='w-screen justify-around bodyhome flex'>
              <div>
                <div style={{ maxWidth: 1040 }} className='mb-14 pl-8 mt-10 pr-14'>
                  <div style={{ borderRadius: 8, fontFamily: 'League Spartan', height: 64 }} className='justify-between pr-2 pl-8 font-bold flex items-center text-[#ffffff] bg-[#2a313b]'>
                    <div>
                      <h2 className='none-block'>{question.name.length > 8 ? question.name.substring(0, 8) + "..." : question.name}</h2>
                      <h2 className='block-none'>{question.name}</h2>
                      <h2 className='text-[#596270]'>{question.owner.minecraft_username} - {fixDate(question.created_on)}</h2>
                    </div>
                    <BasicMenu questionId={questionId} />
                  </div>
                  <div style={{ borderRadius: 8 }} className='bodyhome mt-4 flex p-10 bg-[#2a313b]'>
                    <div style={{cursor: 'pointer'}} onClick={(e) => {setProfile(messages[0].owner); setProfileModalStatus(true)}}>
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
                    <div style={{ width: 1040 }}></div>
                  </div>
                </div>
                <div style={{ overflowY: 'scroll', maxHeight: 740, maxWidth: 1040 }} className='mb-14 pl-8 mt-10 pr-14'>
                  {
                    messages.map((message, iteration) => (
                      iteration > 0 &&
                      <div style={{ borderRadius: 8 }} className='justify-between bodyhome mt-4 flex p-10 bg-[#2a313b]'>
                        <div className='flex'>
                          <div style={{cursor: 'pointer'}} onClick={(e) => {setProfile(message.owner); setProfileModalStatus(true)}}>
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
                        </div>
                        <div className='items-center justify-around flex'>
                          <div className='block-none'>
                            {
                              message.likeable ? (
                                <div>
                                  <div style={{ cursor: 'pointer' }} onClick={(e) => addLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart-outline' /></div>
                                  <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                                </div>
                              ) : (
                                <div>
                                  <div style={{ cursor: 'pointer' }} onClick={(e) => removeLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart' /></div>
                                  <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                                </div>
                              )
                            }
                            {
                              message.removable &&
                              <div className='justify-around flex mt-5'>
                                <div style={{ fontSize: 24, cursor: 'pointer' }} onClick={(e) => removeMessage(message.message_id)} className='text-[#e07a65]'><IonIcon name='trash' /></div>
                              </div>
                            }
                          </div>
                          <div className='pt-14 none-flex'>
                            {
                              message.likeable ? (
                                <div className='pr-6'>
                                  <div style={{ cursor: 'pointer' }} onClick={(e) => addLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart-outline' /></div>
                                  <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                                </div>
                              ) : (
                                <div className='pr-6'>
                                  <div style={{ cursor: 'pointer' }} onClick={(e) => removeLike(message.message_id)} className='text-[#d880d9] text-3xl'><IonIcon name='heart' /></div>
                                  <h2 className='font-bold text-[#ffffff] text-xl' style={{ fontFamily: 'League Spartan', textAlign: 'center' }}>{message.likes}</h2>
                                </div>
                              )
                            }
                            {
                              message.removable &&
                              <div className='justify-around flex mt-5'>
                                <div style={{ fontSize: 24, cursor: 'pointer' }} onClick={(e) => removeMessage(message.message_id)} className='text-[#e07a65]'><IonIcon name='trash' /></div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
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
                          message == "" ? (
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
    </>
  )
}