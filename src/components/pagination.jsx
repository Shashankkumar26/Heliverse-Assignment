import React from 'react'; 
import _ from 'lodash';
const Pagination = ({itemCount, pageSize ,  currentPage, onPageChange}) => {

 const pageCount =itemCount/pageSize ;
 const pages=_.range(1,pageCount+1);


    return ( 
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    
    {pages.map(page=> 
    <li className={page===currentPage ? "page-item active" : "page-item"} key={page}>
        <a class="page-link" href="#" 
         onClick={()=> onPageChange( page)}>
            {page}
            </a> 
            </li> )}
    
    
  </ul>
</nav>
     );
}
 
export default Pagination;

