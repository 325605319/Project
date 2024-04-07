import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { useUpMealMutation } from "../../features/meal/mealApiSlice";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useDispatch } from "react-redux";


const UpdateMeal = ({ product, refetch }) => {

    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    // console.log(product);
    const [upMealFunc, { isError, isSuccess, isLoading, data, error }] = useUpMealMutation()
    const [prod,setProd]=useState(product);
    console.log(prod.image);
    console.log(prod);
    const formik = useFormik({
        initialValues: {
            _id: prod._id,
            name: prod.name,
            status: prod.status,
            image: prod.image,
            description: prod.description,
            price: prod.price,
            kategory: prod.kategory
        },

        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'name is required.';
            }
            if (!data.kategory) {
                errors.kategory = 'kategory is required.';
            }
            if (!data.price) {
                errors.price = 'price is required.';
            }
            return errors;
        },

        onSubmit: (data) => {
            upMealFunc(data).then(() => refetch()).finally(() => setVisible(false))
            setProd(data)
            formik.resetForm();
            formik.setFieldValue("_id",data._id)
            formik.setFieldValue("name",data.name)
            formik.setFieldValue("status",data.status)
            formik.setFieldValue("image",data.image)
            formik.setFieldValue("description",data.description)
            formik.setFieldValue("price",data.price)
            formik.setFieldValue("kategory",data.kategory)
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
                                    id="name"
                                    type="name"
                                    name="password"
                                    value={formik.values.name}
                                    onChange={(e) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                                />
                                <label htmlFor="input_value">שם</label>
                            </span>
                            {getFormErrorMessage('name')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="status"
                                    name="status"
                                    value={formik.values.status}
                                    onChange={(e) => {
                                        formik.setFieldValue('status', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('status') })}
                                />
                                <label htmlFor="input_value">סטטוס</label>
                            </span>
                            {getFormErrorMessage('status')}
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
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={(e) => {
                                        formik.setFieldValue('description', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                                />
                                <label htmlFor="input_value">תיאור</label>
                            </span>
                            {getFormErrorMessage('description')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="price"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={(e) => {
                                        formik.setFieldValue('price', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                                />
                                <label htmlFor="input_value">מחיר</label>
                            </span>
                            {getFormErrorMessage('price')}
                            <span className="p-float-label">
                                <Toast ref={toast} />
                                <InputText
                                    id="kategory"
                                    name="kategory"
                                    value={formik.values.kategory}
                                    onChange={(e) => {
                                        formik.setFieldValue('kategory', e.target.value);
                                    }}
                                    className={classNames({ 'p-invalid': isFormFieldInvalid('kategory') })}
                                />
                                <label htmlFor="input_value">קטגוריה</label>
                            </span>
                            {getFormErrorMessage('kategory')}
                            <Button type="submit" label="אישור" />
                            <Button  onClick={()=>setVisible(false)} label="ביטול" />
                        </form>
                    </div>)}
                         ></Dialog>
                
                </div>   
        </>
    )
}
export default UpdateMeal




















