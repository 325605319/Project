import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useState } from "react";
import { useDelUserMutation } from "../../features/user/userApiSlice";


const DeleteUser = ({ product, refetch }) => {

    const [visible, setVisible] = useState(false);
    const [delUserFunc, { isError, isSuccess, isLoading, data, error }] = useDelUserMutation()

    const delUser = () => {
        delUserFunc({ _id: product._id }).then(() => refetch()).finally(() => setVisible(false)
        )
    }

    return (
        <>
            <Button onClick={() => setVisible(true)} label="מחיקה" icon="pi pi-trash" className="p-button-rounded" ></Button>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                 האם אתה בטוח שברצונך למחוק את הלקוח {product.userName}?
                </div><br></br>
                <div className="card flex justify-content-center">
                    <Button onClick={() => delUser()} label="לאישור" />
                </div>
            </Dialog>
        </>
    )
}
export default DeleteUser