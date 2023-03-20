import React, { useState, useEffect } from 'react'

const Detail = () => {
    const [name, nameChange] = useState("")
    const [mobile, mobileChange] = useState("")
    const [city, cityChange] = useState("")
    const [profile, profileChange] = useState("")
    const [salary, salaryChange] = useState("")
    const [dcity, setdcity] = useState('');


    const getCity = async () => {
        let city = await fetch('http://localhost:8000/city')
        let data = await city.json()
        setdcity(data);
    }
    // console.log(dcity);
    useEffect(() => {
        getCity();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        let alldetails = { name, mobile, salary, profile, city };
        console.log(alldetails);
        const url = 'http://localhost:8000/details'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alldetails)
        }).then((res) => {
            console.log(res);
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" value={name} className="form-control" onChange={e => nameChange(e.target.value)} placeholder="" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input type='number' value={salary} className="form-control" onChange={e => salaryChange(e.target.value)} ></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input type='number' value={mobile} className="form-control" onChange={e => mobileChange(e.target.value)} ></input>
                    <div className="mb-3">
                        <label htmlFor="formFileSm" className="form-label">Select Image</label>
                        <input value={profile} className="form-control form-control-sm" accept='image/png, image/jpeg' onChange={e => { profileChange(e.target.value) }} id="formFileSm" type="file" />
                    </div>
                    <label >city:</label>
                    <select >
                        {
                            dcity && dcity.map((item) => {
                                return (
                                    <option key={item.id} value={item.city} placeholder='select city' onChange={e => cityChange(e.target.value)}> {item.city}   </option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-primary" type='submit'>submit</button>
            </form>
        </div>
    )
}

export default Detail