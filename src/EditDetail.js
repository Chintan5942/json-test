import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDetail = () => {
    const navigator=useNavigate()
    const{empid}=useParams()
    const[id,setId]=useState('')
    const [name, nameChange] = useState("")
    const [mobile, mobileChange] = useState("")
    const [city, cityChange] = useState("")
    const [profile, profileChange] = useState("")
    const [salary, salaryChange] = useState("")
    const [dcity, setdcity] = useState('');
    const [getDat, getDataChange] = useState()
    
    const getCity = async () => {
        let city = await fetch('http://localhost:8000/city')
        let data = await city.json()
        setdcity(data);
    }
    
    useEffect(() => {
       fetch('http://localhost:8000/details/'+empid).then((response)=>{
return response.json();
       }).then((populateData)=>{
        setId(populateData.id);
        nameChange(populateData.name);
        mobileChange(populateData.mobile);
        cityChange(populateData.city);
        // profileChange(populateData.profile.value);
        salaryChange(populateData.salary);
       }).catch((err) => {
        console.log(err);
       })
      getCity()
       
    }, [])
    // console.log(name,);
    const handleSubmit=()=>{
        let alldetails = {id, name, mobile, salary, profile, city };
        console.log(alldetails);
        const url = 'http://localhost:8000/details/'+empid

        fetch(url, {
            method: 'PATCH',
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
        navigator('/')
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


export default EditDetail