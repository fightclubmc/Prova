export const BASE_URL = 'https://fightclubmc.pythonanywhere.com/api/v_1_6_5'
//export const BASE_URL = 'http://127.0.0.1:5000/api/v_1_5_0'
// version

export const fixDate = (date) => {
  let newDate = date.substring(0,10)
  return newDate.split("-")[2] + "/" + newDate.split("-")[1] + "/" + newDate.split("-")[0].substring(2,4)
}