import React,{useState,useEffect} from 'react'

const City = () => {
    const [city, setCity] = useState('')
    const [id,setId] = useState(1)
    const handleCity = (e) => {
        e.preventDefault();
        console.log(city);
        Cityset()
    }
    const Cityset =()=>{
      let id=+1;
       let  data={city,id }
        let url="http://localhost:8000/city"
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({city})
            
        })
        console.log(city);
        window.location.reload();
    }
  return (
    <div>
    <form className="" onSubmit={handleCity}>
  <label style={{marginRight:'120px'}}>Enter City</label>
  <input  type="text"  value={city} onChange={(e)=>setCity(e.target.value)}  placeholder="Enter City Name"/>
  <br/>
  <button type='submit' className="btn btn-primary" >Submit Button</button>
</form>
    </div>
  )
}

export default City