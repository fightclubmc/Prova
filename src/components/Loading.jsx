import { SpinnerCircular } from "spinners-react";

export const Loading = () => {
  return(
    <div style={{overflowY: 'hidden'}} className="h-screen flex justify-around items-center">
      <SpinnerCircular/>
    </div>
  );
}