import { IonIcon } from "react-ion-icon";

export const Forum = () => {
  return(
    <div className="justify-around flex w-screen bg-[#242a33]">
      <div className='justify-around bodyhome flex'>
        <div>
          <div style={{maxWidth: 1040 }} className='pl-8 mt-14 pr-14'>
            <div style={{borderRadius: 10, fontFamily: 'League Spartan', height: 64 }} className='pl-10 pr-10 font-bold flex items-center text-[#ffffff] bg-[#2a313b]'>
              <IonIcon style={{color: '#9d2b88', fontSize: 18}} name="chatbubbles"/>
              <h2 className='ml-4 text-xl'>Discussioni</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}