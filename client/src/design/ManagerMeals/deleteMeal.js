import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useState } from "react";
import { useDelMealMutation } from "../../features/meal/mealApiSlice";


const Delete = ({ product, refetch }) => {

// לטפל במחיקת מנה שיש אצל לקוח כלשהו בקונטרולר

    const [visible, setVisible] = useState(false);
    const [delMealFunc, { isError, isSuccess, isLoading, data, error }] = useDelMealMutation()

    const delMeal = () => {
        delMealFunc({ _id: product._id }).then(() => refetch()).finally(() => setVisible(false)
        )
    }

    return (
        <>
            <Button onClick={() => setVisible(true)} label="מחיקה" icon="pi pi-trash" className="p-button-rounded" ></Button>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                האם אתה בטוח שברצונך למחוק את המנה {product.name}?               </div><br></br>
                <div className="card flex justify-content-center">
                    <Button onClick={() => delMeal()} label="לאישור" />
                </div>
            </Dialog>
        </>
    )
}
export default Delete