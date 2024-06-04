import { useState,useEffect } from 'react';


function Timer(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);


    const GetDate = () =>{
        const dateString = time.toLocaleTimeString("ko-KR", {
            hour: "numeric",
            minute: "numeric",
        })
        const dayName = time.toLocaleDateString("ko-KR",{weekday: 'short'})
        const year=time.getFullYear();
        const month=String(time.getMonth()+1).padStart(2, "0");
        const day = String(time.getDate()).padStart(2, "0");
        const hour = time.getHours();
        return `${month}월 ${day}일 (${dayName}) ${dateString}`
    }

    return(
        <div className="label Date">
            {GetDate()}
        </div>
    );
}

export default Timer;
