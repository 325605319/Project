import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useGetMealsByKategoryQuery, useGetMealsQuery } from '../../features/meal/mealApiSlice';
import { useParams } from 'react-router-dom';
import Shop from './shop';

export default function Meals() {

    const { kategory } = useParams()

    let kat=""
    switch (kategory) {
        case 'pasta':
            kat="פסטות"
            break;
        case 'soup':
            kat="מרקים"
            break;
        case 'salad':
            kat="סלטים"
            break;
        case 'morning':
            kat="בוקר"
            break;
        case 'fish':
            kat="דגים"
            break;
        case 'dessert':
            kat="קינוחים"
            break;
        case 'drink':
            kat="משקאות"
}

    const { data, isLoading, isError, error } = useGetMealsByKategoryQuery(kategory)

    if (isLoading) {
        return <h1>loading</h1>
    }

    const gridItem = (product) => {
        return (
            <>
                <div style={{ direction: "rtl", alignItems: "center" }} className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                    <div style={{ direction: "rtl", alignItems: "center", minHeight: "650px" }} className="p-4 border-1 surface-border surface-card border-round">

                        <span style={{ fontSize: "10rem" }} className="text-2xl font-semibold">{product.name}</span>

                        <div className="flex flex-column align-items-center gap-3 py-6">
                            <img className="w-9 shadow-2 border-round" src={`http://localhost:1593/${product.image}`} alt={product.name} />
                            <span className="text-2xl font-semibold">{product.description}</span>

                        </div>
                        <div className="flex align-items-center justify-content-between">
                            <Shop product={product}  />
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const itemTemplate = (product) => {
        if (!product) {
            return;
        }

        return gridItem(product);
    };

    const listTemplate = () => {
        console.log(data)
        return <div className="grid grid-nogutter">{data?.map((product) => itemTemplate(product))}</div>;
    };

    return (

        <div className="meals"><h1>{kat}</h1>
            {<DataView value={data} listTemplate={listTemplate} />}
        </div>

    )
}
