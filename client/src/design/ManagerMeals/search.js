// import { Button } from "primereact/button"
// import { Dialog } from 'primereact/dialog';
// import { useState } from "react";
// import { useAddMealMutation } from "../../features/meal/mealApiSlice";
// import React, { useEffect, useRef } from "react";
// import { useFormik } from 'formik';
// import { InputText } from "primereact/inputtext";
// import { Toast } from 'primereact/toast';
// import { classNames } from 'primereact/utils';
// import { useDispatch } from "react-redux";


// const Search = ({ refetch }) => {

//     const [visible, setVisible] = useState(false);

//     return (
//        <>
        
//         <Button style={{left:"80vh"}} onClick={() =>  setVisible(true)} label="חיפוש" icon="pi pi-search" className="p-button-rounded" ></Button>
//         </>
//     )
// }
// export default Search

import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import React from "react";
import { InputText } from "primereact/inputtext";
import { useGetMealsSearchQuery } from "../../features/meal/mealApiSlice";

const Search = ({ refetch }) => {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { data, isLoading, error } = useGetMealsSearchQuery(searchText);

    const handleSearch = () => {refetch();
        // Perform search logic here based on the searchText state
        // This could involve triggering a search API call with the entered search text
    };
   

    return (
        <>
            <Button style={{left:"80vh"}} onClick={() => setVisible(true)} label="חיפוש" icon="pi pi-search" className="p-button-rounded" />
            <Dialog header="הזן שם מוצר לחיפוש" visible={visible} onHide={() => setVisible(false)}>
                <div className="search-box">
                    <label htmlFor="searchText">שם מוצר:</label>
                    <InputText id="searchText" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div><br></br>
                <Button  label="חפש" icon="pi pi-search" onClick={handleSearch} />
            </Dialog>
        </>
    );
};

export default Search;


















