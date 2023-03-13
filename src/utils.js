export const BASE_URL = 'https://fightclubmc.pythonanywhere.com/api/v_1_5_0'
//export const BASE_URL = 'http://192.168.1.10:5000/api/v_1_4_0'

export const fixDate = (date) => {
  let newDate = date.substring(0,10)
  return newDate.split("-")[2] + "/" + newDate.split("-")[1] + "/" + newDate.split("-")[0].substring(2,4)
}