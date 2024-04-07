import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { useUpUserMutation } from "../../features/user/userApiSlice";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useDispatch } from "react-redux";


const UpdateUser = ({ product, refetch }) => {

    const toast = useRef(null);
    const [visible, setVisible] = useState(false);

    const [upUserFunc, { isError, isSuccess, isLoading, data, error }] = useUpUserMutation()

    const formik = useFormik({
        initialValues: {
            _id: product._id,
            userName: product.userName,
            image: product.image,
            email: product.email,
            phone:product.phone,
        },

        validate: (data) => {
            let errors = {};

            if (!data.userName) {
                errors.userName = 'userName is required.';
            }
            return errors;
        },

        onSubmit: (data) => {
            console.log(data);
            upUserFunc(data).then(() => refetch()).finally(() => setVisible(false))
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
         <div className="card flex justify-content-center">
        <Button onClick={() =>  setVisible(true)} label="עידכון" icon="pi pi-pencil" className="p-button-rounded" ></Button>
        <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="card2">
                        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="userNmae"
                                    type="userNmae"
                                    name="userNmae"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue('userNmae', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('userNmae') })}
                                />
                                <label htmlFor="input_value">שם משתמש</label>
                            </span>
                            {getFormErrorMessage('userNmae')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="image"
                                    name="image"
                                    value={formik.values.image}
                                    onChange={(e) => {
                                        formik.setFieldValue('image', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('image') })}
                                />
                                <label htmlFor="input_value">תמונה</label>
                            </span>
                            {getFormErrorMessage('image')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                />
                                <label htmlFor="input_value">אימייל</label>
                            </span>
                            {getFormErrorMessage('email')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={(e) => {
                                        formik.setFieldValue('phone', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                                />
                                <label htmlFor="input_value">פלאפון</label>
                            </span>
                            {getFormErrorMessage('phone')}
                            <Button type="submit" label="אישור" />
                            <Button  onClick={()=>setVisible(false)} label="ביטול" />
                        </form>
                    </div>)}
                         ></Dialog>
                
                </div>  
                <br></br>   
        </>
    )
}
export default UpdateUser




















