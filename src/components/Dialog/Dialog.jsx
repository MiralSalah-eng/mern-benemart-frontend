import './Dialog.css'
const Dialog = ({message,onDialog,name}) => {
  return (
    <div className="background-overlay" onClick={()=> onDialog(false)}>
        <div onClick={(e) => e.stopPropagation()} className='dialog-box'>
            <h3>{message}</h3>
            <h1>{name}</h1>

            <div className='dialog-action'>
                <button onClick={()=>onDialog(true)} className='true-action'>Yes</button>
                <button onClick={()=>onDialog(false)} className='false-action'>No</button>
            </div>
        </div>
    </div>
  )
}

export default Dialog