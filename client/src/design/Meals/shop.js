import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import React, { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { useAddOrderMutation } from "../../features/order/orderApiSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Shop = ({ product }) => {


  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(1);

  const [addOrderFunc, { isError, isSuccess, isLoading, data, error }] = useAddOrderMutation()

  const addOrder = ()=>{
    addOrderFunc({userId:localStorage.getItem("userId"),mealId:product._id,qty:value})
    setVisible(false)
  }



  return (
    <>
      <Button onClick={() => {if(!localStorage.getItem("token")){
        alert(" עדיין לא הצטרפת אלינו???? להצטרפות לחץ על הרשמה")
        navigate('/login')}
        else setVisible(true)
        }} icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <div className="card flex justify-content-center">
          <InputNumber value={value} onValueChange={(e) => setValue(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
        </div><br></br>
        <div className="card flex justify-content-center">
          <Button onClick={() => addOrder()} label="הוסף לסל" />
        </div>
      </Dialog>

    </>
  )
}
export default Shop