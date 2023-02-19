import React, { useState } from 'react'
import Select from 'react-select'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BsSearch } from "react-icons/bs"
import { GrClose } from "react-icons/gr"


const Search = ({ setPassengers, setCity, setDate }) => {
    const [value, setValue] = useState(new Date());
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [hours, seHours] = useState(0);
    const [minute, setMinute] = useState(0);
    const [cityy, setCityy] = useState("");
    const [passenger, setPassenger] = useState(null);
    const options_city = [
        { value: 'London', label: 'London' },
        { value: 'Paris', label: 'Paris' }
    ]
    const handleDateAndTime = (e) => {
        if (e.$D < 10) {
            setDay("0" + e.$D)
        } else { setDay(e.$D) }
        e.$M < 10 ? setMonth("0" + (+e.$M + 1)) : setMonth(e.$M);
        e.$H < 10 ? seHours("0" + e.$H) : seHours(e.$H);
        e.$m < 10 ? setMinute("0" + e.$m) : setMinute(e.$m);
        setYear(e.$y)
    }
    const handlesearch = () => {
        setDate(month + "/" + day + "/" + year + " " + hours + ":" + minute);
        setPassengers(passenger);
        setCity(cityy);
    }
    const handleCloseSearch = () => {
        setCity("");
        setDate("0/0/0 0:0");
        setPassengers(null);
    }
    return (
        <div className="main-search">
            <form onClick={(e) => { e.preventDefault() }}>
                {/* Start Select City */}
                <div className="search-city input-box">
                    <Select
                        className="input"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        options={options_city}
                        onChange={(e) => { setCityy(e.value) }}
                    />
                </div>
                {/* End Select City */}

                {/* Start Select Data */}
                <div className="search-date input-box">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker className="input"
                            label="Date&Time picker"
                            onChange={(e) => { handleDateAndTime(e) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                {/* End Select Data */}

                {/* Start Number Of Passenger */}
                <div className="search-passenger input-box">
                    <TextField id="standard-basic" label="Number Of Passenger" variant="standard" type="number" onChange={(e) => { setPassenger(e.target.value) }} />
                    {/* End Number Of Passenger */}
                </div>
                <div className="btns">
                    {/* Start Search Process */}

                    <button className='serch-btn btn' onClick={() => handlesearch()}>  <BsSearch className="search-icone" /> </button>
                    {/* End Search Process */}

                    {/* Start Show All Data */}
                    <div onClick={() => handleCloseSearch()} className="close-search-box"><span>Show All</span><br /><GrClose className="close-search-icone" fill="red" color="red" /></div>
                    {/* End Show All Data */}
                </div>
            </form>
        </div>

    )
}

export default Search