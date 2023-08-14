// import {createContext, useState, useEffect} from "react";
// import API from "../apis";
// import httpStatus from "http-status";
// export const DiaryHistoryContext = createContext();

// const DiaryHistoryContextProvider = ({children}) => {
//     const [diaryHistories, setDiaryHistories] = useState([]);

//     useEffect(() => {
//         fetchData();
//     },[]);

//     const fetchData = () => {
//         API.get("/entry").then((res) => {
//             if(res.status === httpStatus.OK) {
//                 setDiaryHistories(res.data);
//             }
//         })
//     }


//     return (
//         <DiaryHistoryContext.Provider value={{diaryHistories, setDiaryHistories, fetchData}}>
//             {children}
//         </DiaryHistoryContext.Provider>
//     );
// }

// export default DiaryHistoryContextProvider;