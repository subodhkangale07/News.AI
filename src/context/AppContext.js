import { createContext, useContext, useState } from "react";
const AppContext = createContext();


export const AppProvider = ({ children }) => {
 
  const [filter,setFilter] = useState('all');
  const[allNews,setAllNews] = useState([]);
  const [region,setRegion] = useState('all');
  const [senti,setSenti]  = useState('no');

 


  return (
    <AppContext.Provider value={{  filter,setFilter,allNews,setAllNews,region,setRegion,senti,setSenti}}>
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom Hook to Use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
