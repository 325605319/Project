import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetOrdersByIdQuery } from '../../features/order/orderApiSlice';
import DeleteFromBasket from './deleteOrderFromBusket';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useGetSumQuery } from "../../features/order/orderApiSlice";
import { useUpOrderActiveMutation } from "../../features/order/orderApiSlice";

export default function Orders() {

    const { data, isLoading,isError,error, refetch } = useGetOrdersByIdQuery()
    const [upOrderActive,{isSuccess:isu} ] = useUpOrderActiveMutation()
    const { data: sum, isError: is1, isSuccess } = useGetSumQuery()
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const getSum = () => {
        upOrderActive().then(refetch()).finally(setVisible(false))
        setVisible2(true)
    }

    if (isLoading) return <h1>loading</h1>

    const listItem = (product, index) => {
        return (
            <>
                <div className="col-12" key={product._id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1593/${product.mealId.image}`} alt={product.mealId.name} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.mealId.name}</div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <span className="font-semibold">{product.qty}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">₪{product.mealId.price * product.qty}</span>
                                <br></br>
                                <DeleteFromBasket product={product} refetch={refetch} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const itemTemplate = (product, index) => {
        if (!product) {
            return;
        }
        return listItem(product, index);
    };

    const listTemplate = () => {
        return (
            <div className="grid grid-nogutter">{data.map((product, index) => itemTemplate(product, index))}</div>
        )
    };

    const header = () => {
        return (
            <>
            סל הקניות שלך ריק
            </>
        );
    };
    const footer = () => {
        return (
            <div className='pay'>
                <Button onClick={() => setVisible(true)} label="לתשלום" className="p-button-rounded" ></Button>
                <Dialog visible={visible} onHide={() => setVisible(false)}>
                    {isSuccess ? <><div className="card flex justify-content-center">
                        הסכום לתשלום {sum.sum}
                    </div><br></br>
                        <div className="card flex justify-content-center">
                            <Button onClick={() => getSum()} label="לביצוע קניה" />
                        </div></> : <></>}
                </Dialog>       
            </div>
        );
    };

    return ( <>
        <div className="user">
            {data.length? <DataView value={data} listTemplate={listTemplate} footer={footer()} />: <DataView  header={header()} />}
        </div>
        <Dialog visible={visible2} onHide={() => setVisible(false)}>
                <div className="card flex justify-content-center">
                    הקניה בוצעה בהצלחה
                </div><br></br>
                    <div className="card flex justify-content-center">
                        <Button onClick={() => setVisible2(false)} label="תודה ולהתראות" />
                    </div>
            </Dialog>
        </>
    )
}
