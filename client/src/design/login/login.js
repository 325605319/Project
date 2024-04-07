import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { removeToken, setToken } from '../../features/auth/authSlice';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import React, { useEffect } from "react";
import '../../index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import { useForm, Controller } from 'react-hook-form';
import { Divider } from 'primereact/divider';
import { updateNewUser, updateUserId, updateUserName } from '../../app/slice';


export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginFunc, { isError, isSuccess, isLoading, data, error }] = useLoginMutation()

    const user = {
        email: '',
        password: ''
    }
    const register = () => {
        navigate('/login/signUp')
    }

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            dispatch(setToken(data))
            dispatch(updateNewUser({data:localStorage.getItem("newUser")}))
            dispatch(updateUserId({data:localStorage.getItem("userId")}))
            dispatch(updateUserName({data:localStorage.getItem("userName")}))
            console.log(localStorage.getItem("newUser"));
            
            if (localStorage.getItem("newUser") === "client")
                navigate('/')
            else if (localStorage.getItem("newUser") === "manager")
                navigate('/manager')
        }
        else if(isError&&error){
            alert("   עדיין לא הצטרפת אלינו???? להצטרפות לחץ על הרשמה  ")
        }
    }, [isSuccess,isError,error])
    useEffect(() => {
        dispatch(removeToken()) 
    },[])

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ user });

    const onSubmit = (data) => {
        
        console.log('data', data);
        loginFunc(data)
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <>
            <div className="login">
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">אימייל </label>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="email" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'w-12rem': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    {getFormErrorMessage('email')}
                                </div>

                            </div>
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">סיסמא</label>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="password" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                            <InputText type='password' id={field.name} {...field} autoFocus className={classNames({ 'w-12rem': fieldState.invalid })} />
                                        )} />
                                    </span>
                                    {getFormErrorMessage('password')}
                                </div>
                            </div>


                            <Button type='submit' label="כניסה" icon="pi pi-user" className="w-10rem mx-auto"></Button>


                        </div>
                        <div className="w-full md:w-2">
                            <Divider layout="vertical" className="hidden md:flex">
                                <b>או</b>
                            </Divider>
                            <Divider layout="horizontal" className="flex md:hidden" align="center">
                                <b>או</b>
                            </Divider>                 </div>
                        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                            <Button onClick={() => register()} label="הרשמה" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                        </div>
                    </div>


                </form>

            </div>
        </>
    )
}











