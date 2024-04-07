import { Button } from "primereact/button"
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import { useAddMealMutation } from "../../features/meal/mealApiSlice";
import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useDispatch } from "react-redux";


const AddMeal = ({ refetch }) => {

    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [addMealFunc, { isError, isSuccess, isLoading, data, error }] = useAddMealMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            status: '',
            image: '',
            description: '',
            price: '',
            kategory: ''

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
            console.log(data);
            addMealFunc(data).then(() => refetch()).finally(() => setVisible(false))
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
        <Button onClick={() =>  setVisible(true)} label="הוספה" icon="pi pi-plus" className="p-button-rounded" ></Button>
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
export default AddMeal




















