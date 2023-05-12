import React, {  useState,useEffect } from "react";
import peoples from "../constants/heliverse_mock_data.json";
import Pagination from "./pagination";
import "bootstrap/dist/css/bootstrap.css";
import Filter from "./filter";

import { Button } from "bootstrap";

const Data = () => {
 
  const [search, setSearch]= useState('');
  const [domain , setDomain]=useState('');
  const [all, setAll] =useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender]=useState('');
  const [availability,setAvailability] =useState(false);
  const [team, setTeam] =useState([]);
  let [people,setPeople]= useState(peoples);
  const pageSize= 20;
  const handleChange = (page) => {
    setCurrentPage(page);
  };
  
  const handlegender =(gen)=>{
    
    setGender(gen);
  }

  const handleDomain=(dom)=>{
    
    setDomain(dom);
  }
  const handleAvailability=(e) =>{
      setAvailability(!e);
  }
  const handleAll =()=>{
    setAll(!all);
  }
   const handleAdd =(e)=>{
    let temp = team;
   if(e.available){
       temp.push(e);
   }
    setTeam(temp);
    let update= people;
    update[e.id-1].available=false;
    setPeople(update);
    console.log(team);
    
   }
 
   
      const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
 

 
  if(!all){
  people = peoples.filter(data=>{
    return search.toLocaleLowerCase()==='' ? data : data.first_name.toLowerCase().includes(search)
  }).filter(data=>{
    return gender==='' ? data : data.gender===gender;
  }).filter(data=>{
     return domain===''? data : data.domain===domain
  }).filter(data=>{
    return data.available===availability;
 })
}
   const pageData=people.slice(startIndex, endIndex);
   useEffect(()=>{
    
   },[team,people])
   useEffect(()=>{
     setAll(false);
   },[domain,gender,availability] )
  return (
    <div>
        <form >
          <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder= "Search by Name.." className="form-control ml-4 mr-4 my-2" />
        </form>
        <div className="conatiner">
          <div className="row">
            <div className="col-3 ">
            <Filter
            itemSelect =  {handleDomain}
            genderSelect = {handlegender}
            availableSelect= {handleAvailability}
            available ={availability}
            all ={true}
            allSelect={handleAll}
          
            
            
            />
            </div>
            <div className="col">
            
            <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Domain</th>
            <th scope="col">Availability</th>
            <th scope="col">Add</th>
           
          </tr>
        </thead>

        <tbody>
          {pageData.map((p) => (
            <tr key={p.id}>
              <td scope="row">{p.id}</td>
              <td>
                {p.first_name} {p.last_name}
              </td>
              <td>{p.gender}</td>
              <td>{p.domain}</td>
              <td>{p.available ? "Available" : "Not Available"}</td>
              <td onClick={()=>{handleAdd(p)}}>{p.available ? (  <button className="btn btn-primary">Add</button>  ) : (  <button className="btn btn-primary disabled">Add</button>  ) }</td>
            </tr>
          ))}
        </tbody>
      </table>

            </div>
          </div>
        </div>
   
       
        <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Domain</th>
            <th scope="col">Availability</th>
            <th scope="col">Add</th>
           
          </tr>
        </thead>

        <tbody>
          {team.map((p) => (
            <tr key={p.id}>
              <td scope="row">{p.id}</td>
              <td>
                {p.first_name} {p.last_name}
              </td>
              <td>{p.gender}</td>
              <td>{p.domain}</td>
              <td>{p.available ? "Available" : "Not Available"}</td>
              <td onClick={()=>{handleAdd(p)}}>{p.available ? (  <button className="btn btn-primary">Add</button>  ) : (  <button className="btn btn-primary disabled">Add</button>  ) }</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Pagination
        pageSize={pageSize}
        itemCount={people.length}
        onPageChange={handleChange}
        currentPage={currentPage}
      />
    
    </div>
  );
};

export default Data;
