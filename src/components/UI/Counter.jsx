import React, { useState ,useEffect } from 'react'
import '../../Styles/Counter.css'
const Counter = () => {

    const [days,setDays] = useState()
    const [hours,setHours] = useState()
    const [minutes,setMinutes] = useState()
    const [seconds,setSeconds] = useState()

    let interval;


    const countDown = () => {
        const distenation = new Date ('May 28 ,2023').getTime()
        interval = setInterval(()=>{
            const now = new Date().getTime()
            const different = distenation - now
            const days = Math.floor(different / (1000 * 60 * 60 * 24))
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000*60*60))
            const minutes = Math.floor(different % (1000 * 60 * 60 ) / (1000*60))
            const seconds = Math.floor(different % (1000 * 60 ) / (1000))

            if (different <= 0) { 
                setDays(0)
                setHours(0)
                setMinutes(0)
                setSeconds(0)
                clearInterval(interval.current);
            }
            else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        })
    }

    useEffect(() => {
      countDown()
    })
    
  return (
    <div className='counterParent'>
    <div className='d-flex align-items-center gap-3 counter_slice'>

        <div className='d-flex align-items-center gap-3 counter_slice'>
           <div className='text-center'>
            <h1 className='fs-3 mb-2 text-white'>{days <10 ? '0' + days : days  }</h1>
            <h5 className='fs-6 mb-2 text-white'>Days</h5>
           </div>
           <span className='fs-3 text-white'>:</span>
        </div>

        <div className='d-flex align-items-center gap-3 counter_slice'>
           <div className='text-center'>
            <h1 className='fs-3 mb-2 text-white'>{hours < 10 ? '0'+ hours: hours}</h1>
            <h5 className='fs-6 mb-2 text-white'>Hours</h5>
           </div>
           <span className='fs-3 text-white'>:</span>
        </div>

        <div className='d-flex align-items-center gap-3 counter_slice'>
           <div className='text-center'>
            <h1 className='fs-3 mb-2 text-white'>{minutes < 10 ? '0'+ minutes : minutes }</h1>
            <h5 className='fs-6 mb-2 text-white'>Minutes</h5>
           </div>
           <span className='fs-3 text-white'>:</span>
        </div>

        <div className='d-flex align-items-center gap-3 counter_slice'>
           <div className='text-center'>
            <h1 className='fs-3 mb-2 text-white'>{seconds < 10 ? '0'+ seconds : seconds }</h1>
            <h5 className='fs-6 mb-2 text-white'>Seconds</h5>
           </div>
        </div>

    </div>
    </div>  
  )
}

export default Counter