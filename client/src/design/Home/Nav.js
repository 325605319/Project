import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import {  useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
export default function Menu() {
    
    const newUser=useSelector(x=>x.slice.newUser)
    const items = [
        { label: 'בוקר', url: '/morning' },
        { label: 'סלטים', url: '/salad' },
        { label: 'דגים', url: '/fish' },
        { label: 'פסטות', url: '/pasta' },
        { label: 'משקאות', url: '/drink' },
        { label: 'קינוחים', url: '/dessert' },
        { label: 'פיצות', url: '/pizza' },{},{},{},{},
        { label: `שלום ${localStorage.getItem("userName")}` },{},{},{},{},{},
        { label: 'התנתקות', url: '/out' },
        { icon: "pi pi-shopping-cart", label: 'סל קניה', url: '/orders', },
        { label: 'היסטוריית קניות', url: '/history'}, 
    ]; 

    const items1 = [
        { label: 'בוקר', url: '/morning' },
        { label: 'סלטים', url: '/salad' },
        { label: 'דגים', url: '/fish' },
        { label: 'פסטות', url: '/pasta' },
        { label: 'משקאות', url: '/drink' },
        { label: 'קינוחים', url: '/dessert' },
        { label: 'פיצות', url: '/pizza' },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
        { label: 'הצטרפות/התחברות', url: '/login' },
    ];

    const items3 = [
        { label: 'ניהול לקוחות', url: '/users' },
        { label: 'ניהול תפריט', url: '/allMeals' },
        // { label: 'דף הבית ', url: '/manager' },
        { label: 'התנתקות', url: '/out' }
    ];
    return (
        <>
            <div className="nav">
                <TabMenu  model={localStorage.getItem("token") ? (newUser === "manager" ? items3 : items) : items1} /> 
                <TabMenu ></TabMenu>         
            </div>
        </>
    )
}