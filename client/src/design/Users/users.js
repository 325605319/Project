import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { useGetUsersQuery } from '../../features/user/userApiSlice';
import UpdateUser from './upUser';
import DeleteUser from './deletUser';


export default function Users() {

    const { data, isSuccess, isLoading, isError, error, refetch } = useGetUsersQuery()
    const [layout, setLayout] = useState('grid');

    if (isLoading) return <h1>loading</h1>

    const listItem = (product, index) => {
        return (
            <>
                <div className="col-12" key={product._id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1593/${product.img}`} alt={product.name} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.userName}</div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                    </span>
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <UpdateUser product={product} refetch={refetch} />
                                <DeleteUser product={product} refetch={refetch} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{product.userName}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        {/* <img className="w-9 shadow-2 border-round" src={`http://localhost:1593/${product.image}`} alt={product.name} /> */}
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <UpdateUser product={product} refetch={refetch} />
                    <DeleteUser product={product} refetch={refetch} />
                    <div className="flex align-items-center justify-content-between">
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        console.log(data)
        return <div className="grid grid-nogutter">{data?.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <>
                <div className="flex justify-content-end">

                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </>
        );
    };

    return (
        <div className="meals"><h1>כל הלקוחות</h1>
            {<DataView value={data} listTemplate={listTemplate} layout={layout} header={header()} />}
        </div>
    )
}
