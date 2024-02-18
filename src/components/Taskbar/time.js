import { useState,useEffect } from 'react';


const getClock = () => {
    const two = (x) => x < 10 ? `0${x}` : x;
    const today = new Date();
    const H = today.getHours();
    const m = today.getMinutes();
    const hh = two(H % 12 || 12);
    const mm = two(m);
    const A = ['AM', 'PM'][H / 12 | 0];
    return `${hh}:${mm} ${A}`;
  };
  


function Timer(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return(
        <div className="label Date">
            <div>
                {time.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                })}
            </div>
            <div>
                {time.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "numeric",
                })}
            </div>
        </div>
    );
}

export default Timer;
