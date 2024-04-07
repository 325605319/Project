
import React, { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
// import { updateNewUser, updateUserId, updateUserName } from "../../app/slice";
import { setToken } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const toast = useRef(null);
  const navigate = useNavigate()
  const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()

  useEffect(() => {
    if (isSuccess) {
      alert("הצטרפת בהצלחה")
      navigate('/login')
    }
    else if (error) {//error.data=undefind
      console.log(error.data.message === "this email alrady exsist");
      alert(" משתמש קיים במערכת לחץ על כניסה")
      navigate('/login')
    }
  }, [isSuccess, error])

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: '',
      email: "",
      phone: ""
    },

    validate: (data) => {
      let errors = {};

      if (!data.userName) {
        errors.userName = 'שדה חובה';
      }
      if (!data.password) {
        errors.password = ' שדה חובה';
      }
      if (!data.email) {
        errors.email = 'שדה חובה';
      }
      if (!data.phone) {
        errors.phone = 'שדה חובה';
      }
      return errors;
    },

    onSubmit: (data) => {
      registerFunc(data)
      formik.resetForm();
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <div >
      <div className="card1">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
          <span className="p-float-label">
            <Toast ref={toast} />
            <InputText
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={(e) => {
                formik.setFieldValue('userName', e.target.value);
              }}
              className={classNames({ 'p-invalid': isFormFieldInvalid('userName') })}
            />
            <label htmlFor="input_value">שם משתמש</label>
          </span>
          {getFormErrorMessage('userName')}
          <span className="p-float-label">
            <Toast ref={toast} />
            <InputText
              id="password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={(e) => {
                formik.setFieldValue('password', e.target.value);
              }}
              className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
            />
            <label htmlFor="input_value">סיסמא</label>
          </span>
          {getFormErrorMessage('password')}

          <span className="p-float-label">
            <Toast ref={toast} />
            <InputText
              id="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              title="אנא הזן כתובת מייל תקינה"
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
            <label htmlFor="input_value">טלפון</label>
          </span>
          {getFormErrorMessage('phone')}
          <span className="p-float-label">
            <Toast ref={toast} />
            <InputText
              id="address"
              name="address"
              value={formik.values.address}
              onChange={(e) => {
                formik.setFieldValue('address', e.target.value);
              }}
              className={classNames({ 'p-invalid': isFormFieldInvalid('address') })}
            />
            <label htmlFor="input_value">כתובת</label>
          </span>
          {getFormErrorMessage('address')}
          <Button type="submit" label="הרשמה" />
        </form>
      </div>
    </div>
  )
}










