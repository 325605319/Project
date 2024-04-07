import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useState } from "react";
import { useDelOrderMutation, useGetMealsQuery } from "../../features/order/orderApiSlice";

const DeleteFromBasket = ({ product, refetch }) => {

    const [visible, setVisible] = useState(false);
    const [delorderFunc, { isError, isSuccess, isLoading, data, error }] = useDelOrderMutation()

    const delMeal = () => {
        delorderFunc({ _id: product._id, userId: product.userId._id }).then(() => refetch()).finally(() => setVisible(false))
    }

    return (
        <>
            <Button onClick={() => setVisible(true)} label="מחיקה" icon="pi pi-trash" className="p-button-rounded" ></Button>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                      האם אתה בטוח שברצונך למחוק את המוצר?
                </div>
                <br></br>
                <div className="card flex justify-content-center">
                    <Button onClick={() => delMeal()} label="לאישור" />
                </div>
            </Dialog>
        </>
    )
}
export default DeleteFromBasket