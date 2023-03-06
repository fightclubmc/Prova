import { useParams } from "react-router-dom"

 export const H = () => {
  const a = useParams()

  return(
    <h1>{a.username}</h1>
  );

 }