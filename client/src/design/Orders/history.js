import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useHistoryQuery } from "../../features/order/orderApiSlice";
import DeleteFromHistory from './deleteFromHistoty';

export default function History() {

    const { data, isLoading,isError,error, refetch } = useHistoryQuery()
   
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
                                <DeleteFromHistory product={product} refetch={refetch} />
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
            לא התבצעו הזמנות בעבר
            </>
        );
    };

    return ( 
        <div className="user">
            {data.length? <DataView value={data} listTemplate={listTemplate} />: <DataView  header={header()} />}
        </div>
    )
}
