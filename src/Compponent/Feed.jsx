import React, { useEffect, useState } from 'react';
import Search from '../Compponent/Search';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FaCcVisa } from "react-icons/fa"
import { GrVisa } from "react-icons/gr"
import { RiVisaFill } from "react-icons/ri"

export default function Feed({ objData }) {
    const [filtredData, setfiltredData] = useState(objData)
    const [date, setDate] = useState("0/0/0 0:0");
    const [city, setCity] = useState("");
    const [item, setItem] = useState();
    const [passengers, setPassengers] = useState(null)
    var searched = []
    //Start  Handle Search Process
    useEffect(() => {
        if (city != "" && date != "0/0/0 0:0" && passengers != null) {
            searched = objData.filter(item =>
                item.available_seats == passengers &&
                item.date_time_depart == date &&
                item.origin == city
            );
            setfiltredData(searched)
        } else if (city != "" && date == "0/0/0 0:0" && passengers == null) {
            searched = objData.filter(item =>
                item.origin == city
            );
            setfiltredData(searched)
        } else if (city != "" && date != "0/0/0 0:0" && passengers == null) {
            searched = objData.filter(item =>
                item.date_time_depart == date
                && item.origin == city
            );
            setfiltredData(searched)
        } else if (city != "" && date == "0/0/0 0:0" && passengers != null) {
            searched = objData.filter(item =>
                item.available_seats == passengers &&
                item.origin == city
            );
            setfiltredData(searched)
        } else if (city == "" && date != "0/0/0 0:0" && passengers == null) {
            searched = objData.filter(item =>
                item.date_time_depart == date
            );
            setfiltredData(searched)
        } else if (city == "" && date != "0/0/0 0:0" && passengers != null) {
            searched = objData.filter(item =>
                item.available_seats == passengers &&
                item.date_time_depart == date
            );
            setfiltredData(searched)
        } else if (city == "" && date == "0/0/0 0:0" && passengers != null) {
            searched = objData.filter(item =>
                item.available_seats == passengers
            );
            setfiltredData(searched)
        } else if (city == "" && date == "0/0/0 0:0" && passengers == null) {
            setfiltredData(objData)
        } else {
            console.log("asd")
        }
    }, [city, date, passengers])
    //End  Handle Search Process

    const [open, setOpen] = useState(false);
    const handleClickOpen = (item) => {
        setOpen(true);
        setItem(item)
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div >
            {/* Start Search Box */}
            <Search data={objData} setPassengers={setPassengers} setCity={setCity} setDate={setDate} />
            {/* End Search Box */}
            <div style={{ margin: "20px auto", width: "90%", overflow: "scroll" }}>
                {filtredData.length ?
                    <>
                        {/* Start Show Data*/}
                        {filtredData.map(item => (
                            <div key={item.flight_id} className="parent">
                                <div className="time-depart">Starting <br />
                                    <div>
                                        {item.date_time_depart.slice(0, 10)} &nbsp;&nbsp;&nbsp;{item.time_depart}
                                    </div>
                                </div>
                                <div className="time-arrival">Access <br />
                                    <div>
                                        {item.date_time_arrival.slice(0, 10)} &nbsp;&nbsp;&nbsp;{item.time_arrival}
                                    </div>
                                </div>
                                <div className="origin">
                                    Trip Origin <br />{item.origin}
                                </div>
                                <div className="destination">
                                    Trip Destination <br />{item.destination}
                                </div>
                                <div className="available_seats" >
                                    Available Seats <br />{item.available_seats}
                                </div>
                                <div>
                                    <button className='btn' onClick={() => handleClickOpen(item)}>Select</button>
                                </div>
                            </div>
                        ))}
                        {/* Start Show Data*/}
                    </>
                    :
                    // IF No Data
                    <div style={{ fontSize: "30px" }}>There are no matching results...</div>}
                {/* Start Dialog For Rezarvation */}
                {open &&
                    <SimpleDialog
                        data={item}
                        open={open}
                        onClose={handleClose}
                    />
                }
                {/* End Dialog For Rezarvation */}

            </div>
        </div>
    )
}

// Dialog function
function SimpleDialog(props) {
    const { onClose, data, open } = props;
    const handleClose = () => {
        onClose(false)
    };
    const menu = [
        { code: <FaCcVisa /> },
        { code: <GrVisa /> },
        { code: <RiVisaFill /> },
    ]
    return (
        <Dialog onClose={handleClose} open={open} className="dialog">

            {/* Start Rezervation Detail */}
            <DialogTitle >
                <div className="parent" style={{ overflow: "scroll" }}>
                    <div className="time-depart">Starting <br />
                        <div>
                            {data.date_time_depart.slice(0, 10)} &nbsp;&nbsp;&nbsp;{data.time_depart}
                        </div>
                    </div>
                    <div className="time-arrival">Access <br />
                        <div>
                            {data.date_time_arrival.slice(0, 10)} &nbsp;&nbsp;&nbsp;{data.time_arrival}
                        </div>
                    </div>
                    <div className="origin">
                        Trip Origin <br />{data.origin}
                    </div>
                    <div className="destination">
                        Trip Destination <br />{data.destination}
                    </div>
                    <div className="available_seats" >
                        Available Seats <br />{data.available_seats}
                    </div>
                </div>
            </DialogTitle>
            {/* End Rezervation Detail */}

            {/* Start Passenger Info */}
            <div className="info-inputs">
                <label >Name</label>
                <div>
                    <input className="info-input" type="text" placeholder="First Name" />
                    <input className="info-input" type="text" placeholder="Lasr tName" />
                </div>
                <label >Pasaport No</label>
                <input className="info-input" type="number" placeholder="Pasaport No " />
            </div>
            {/*End Passenger Info */}

            {/* Start Payment Method */}

            <div className='payment-details'>
                <h2>Payment Method</h2>
                <h3>Please Select Payment Method</h3>
                <ul className="visa-menu">
                    {menu.map(item => (
                        <li>{item.code}</li>
                    ))}
                </ul>

                <div className="info-inputs info-card">
                    <label>Card Numara</label>
                    <div>
                        <input className="card-number-input" type="number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div>
                        <input className="ccv-card-input" type="number" placeholder="CCV" />
                        <input className="date-card-input" type="text" placeholder="End Date" />
                    </div>
                </div>
            </div>
            {/* Start Payment Method */}

            <button onClick={() => onClose()} className="btn">Accept</button>
        </Dialog>
    );
}
