import React, { useState} from "react";
import peoples from "../constants/heliverse_mock_data.json";
import Pagination from "./pagination";
import "bootstrap/dist/css/bootstrap.css";
import Filter from "./filter";



const Data = () => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [all, setAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [gender, setGender] = useState("");
  const [availability, setAvailability] = useState(false);
  const [team, setTeam] = useState([]);
  let [people, setPeople] = useState(peoples);
  let [filteredPeople, setFilteredPeople] = useState(peoples);
  const pageSize = 20;
  const handleChange = (page) => {
    setCurrentPage(page);
  };
 
  

  const handlegender = (gen) => {
    let data;
    if (gen == "Male") data = people.filter((item) => item.gender == "Male");
    else data = people.filter((item) => item.gender == "Female");
    setFilteredPeople(data);
  };

  const handleDomain = (dom) => {
    const data = people.filter((item) => item.domain == dom);
    setFilteredPeople(data);
  };
  const handleAvailability = (e) => {
    const data = people.filter((item) => item.available);
    setFilteredPeople(data);
  };
  const handleAll = () => {
    setFilteredPeople(people);
  };
  const handleAdd = (e) => {
    if(e.available==true){
    setTeam((prev) => [...prev, e]);
    let update = people;
    update[e.id - 1].available = false;
    setPeople(update);
    }
  };
  const handleRemove= (e)=>{
    
   
    let updated = team.filter(t=> t.id !=e.id);
    setTeam(updated);
    updated = people ;
    updated[e.id - 1].available = true;
    setPeople(updated);
    
     
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageData = filteredPeople.slice(startIndex, endIndex);

  return (
    <div>
      <form>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by Name.."
          className="form-control ml-4 mr-4 my-2"
        />
      </form>
      <div className="conatiner">
        <div className="row">
          <div className="col-3 ">
            <Filter
              itemSelect={handleDomain}
              genderSelect={handlegender}
              availableSelect={handleAvailability}
              available={availability}
              all={true}
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
                {pageData.filter(p=>{
                  return search.toLowerCase()==="" ? p : p.first_name.toLowerCase().includes(search)
                }).map((p) => (
                  <tr key={p.id}>
                    <td scope="row">{p.id}</td>
                    <td>
                      {p.first_name} {p.last_name}
                    </td>
                    <td>{p.gender}</td>
                    <td>{p.domain}</td>
                    <td>{p.available ? "Available" : "Not Available"}</td>
                    <td
                      onClick={() => {
                        handleAdd(p);
                      }}
                    >
                      {p.available ? (
                        <button className="btn btn-primary">Add</button>
                      ) : (
                        <button className="btn btn-primary disabled">
                          Add
                        </button>
                      )}
                    </td>
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
            <th scope="col">Remove</th>
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
              <td> <button className="btn btn-danger" on onClick={()=>handleRemove(p)}>Remove</button></td>
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