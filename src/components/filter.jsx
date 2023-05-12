import React from "react";

const  Filter = ({itemSelect,genderSelect,availableSelect,available,all,allSelect}) => {
    return ( 
        <ul className="list-group">
  
  
  <li className="list-group-item" onClick={()=>allSelect(!all)}>ALL</li>
  
  <li className="list-group-item" onClick={()=>genderSelect("Male")}>MALE</li>
  <li className="list-group-item" onClick={()=>genderSelect("Female")}>FEMALE</li>
  <li className="list-group-item" onClick={()=>availableSelect(available)}>Available</li>
  <li className="list-group-item" onClick={()=>itemSelect("IT")}>IT</li>
  <li className="list-group-item" onClick={()=>itemSelect("Business Development")}>Bussiness Development</li>
  <li className="list-group-item" onClick={()=>itemSelect("Finance")}>Finance</li>
  <li className="list-group-item" onClick={()=>itemSelect("Sales")}>Sales</li>
  <li className="list-group-item" onClick={()=>itemSelect("UI Designing")}>UIDesign</li>
  <li className="list-group-item" onClick={()=>itemSelect("Marketing")}>Marketing</li>
  <li className="list-group-item" onClick={()=>itemSelect("Management")}>Management</li>

  
</ul>
     );
}
 
export default Filter ;