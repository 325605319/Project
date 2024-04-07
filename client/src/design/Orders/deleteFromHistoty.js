import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useState } from "react";
import { useDelOrderMutation, useGetMealsQuery } from "../../features/order/orderApiSlice";

const DeleteFromHistory = ({ product, refetch }) => {

    const [visible, setVisible] = useState(false);
    const [delorderFunc, { isError, isSuccess, isLoading, data, error }] = useDelOrderMutation()

    const delMeal = () => {
        delorderFunc({ _id: product._id, userId: product.userId._id }).then(() => refetch()).finally(() => setVisible(false))
    }

    return (
        <>
            <Button onClick={() => setVisible(true)} label="להסרה" icon="pi pi-trash" className="p-button-rounded" ></Button>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                 ?? האם אתה בטוח שאתה רוצה למחוק את המוצר מההיסטוריה 
                </div>
                <br></br>
                <div className="card flex justify-content-center">
                    <Button onClick={() => delMeal()} label="לאישור" />
                </div>
            </Dialog>
        </>
    )
}
export default DeleteFromHistory