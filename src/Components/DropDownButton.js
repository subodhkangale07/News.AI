import { useState } from "react"; 
import { useAppContext } from "../context/AppContext"; 
import { useNavigate } from "react-router";

const DropDownButton = ({ categories, buttonName }) => { 
  const [open, setOpen] = useState(false); 
  const { filter, setFilter } = useAppContext(); 
  const navigate = useNavigate();
  let timeout; 
 
  return ( 
    <div 
      className="relative inline-block z-10" 
      onMouseEnter={() => { 
        clearTimeout(timeout); // Clear any existing timeout 
        setOpen(true); 
      }} 
      onMouseLeave={() => { 
        timeout = setTimeout(() => setOpen(false), 100); // Delay hiding by 100ms 
      }} 
    > 
      <button  
        className="bg-slate-600 text-white font-semibold tracking-wide uppercase px-5 py-2 rounded-md hover:bg-gray-900 transition duration-300"
      > 
        {buttonName} 
      </button> 
 
      {open && ( 
        <div className="absolute bg-black shadow-lg rounded-md mt-2 w-52 border border-gray-700 z-50"> 
          <ul className="py-2"> 
            {categories.map((category, index) => ( 
              <li key={index}> 
                <button 
                  onClick={() => { 
                    setFilter(category.value)
                    navigate('/') 
                    setOpen(false); // Close dropdown after selection
                  }} 
                  className="block w-full text-left px-5 py-2 text-white font-medium hover:bg-gray-800 transition duration-200" 
                > 
                  {category.name} 
                </button> 
              </li> 
            ))} 
          </ul> 
        </div> 
      )} 
    </div> 
  ); 
}; 
 
export default DropDownButton;