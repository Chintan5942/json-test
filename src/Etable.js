import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
const Etable = () => {
    const navigator=useNavigate()
    
    const[id,setId]=useState('')
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
    
    const navigate=useNavigate()
    const handleDelete =(id)=>{
        console.log(id);
        const url='http://localhost:8000/details/'+id;       
        fetch(url, {
            method: 'DELETE',
    }).then((res)=>{
       console.log(res);
       getData()
    }).catch((err)=>{
        console.log(err.message)
    })
    }
    const [getDat, getDataChange] = useState()
    const getData = async () => {
        let data = await fetch('http://localhost:8000/details');
        const populateData = await data.json();
        getDataChange(populateData);
    }
    useEffect(() => {
        getData()
    }, [])
    console.log(getDat);
    const handleEdit=(id)=>{
        console.log(id);
       navigate('/details/edit/'+id)
    
    
    }
    
    return (
        <div>
            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col">Sr</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                   {getDat&& getDat.map(itr=>(
                       <tr key={itr.id}>
                       <th scope="row">{itr.id}</th>
                       <td>{itr.name}</td>
                       <td>{itr.salary}</td>
                       <td>{itr.mobile}</td>
                       <td> {itr.profile }</td>
                       <td>
                        <a className='btn btn-danger' onClick={()=>handleDelete(itr.id)}>DELETE</a>
                        <a className='btn btn-success' onClick={()=>handleEdit(itr.id)} >EDIT</a>   
                       </td>
                   </tr>
                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default Etable