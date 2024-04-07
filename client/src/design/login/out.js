import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../../features/auth/authSlice"
import { updateNewUser, updateUserId, updateUserName } from "../../app/slice"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"

export default function Out() {

    const [visible, setVisible] = useState(true);
    const [out, setOut] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (out) {
            dispatch(removeToken())
            dispatch(updateNewUser({ data: localStorage.getItem("newUser") }))
            dispatch(updateUserId({ data: localStorage.getItem("userId") }))
            dispatch(updateUserName({ data: localStorage.getItem("userName") }))
            navigate("/")
        }
    }, [out])

    return (
        <>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                      האם אתה בטוח שברצונך להתנתק?               </div><br></br>
                <div className="card flex justify-content-center">
                    <Button onClick={() => setOut(true)} label="לאישור" />
                </div>
            </Dialog>
        </>
    )
}

