import React, {useState} from 'react'
import './PopupToolbar.css'


const PopupToolbar = ({handleClose, stock}) => {

    const [first, setfirst] = useState(false);

    const abc = () => {
        setfirst(prev => !prev)
    }

    return (
        <>
            <div className="backdrop" onClick={() => alert('great')}></div>    

            <div className="popupcontainer">
                <div className="innercontainer">
                    <h1>This is the best toolbar</h1>

                    <button onClick={() => handleClose()} className="closeBtn">Close</button>

                </div>
            </div>

        </>
    )
}

export default PopupToolbar