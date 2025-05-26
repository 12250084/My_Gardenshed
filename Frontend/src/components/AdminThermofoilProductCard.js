import React, {useState} from 'react'
import {MdModeEditOutline} from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
                              data,
                              fetchdata
                          }) => {
    const [editProduct, setEditProduct] = useState(false)

    const convertUnit = (unit) => {
        switch (unit) {
            case 'm':
                return 'Meter';
            case 'ft':
                return 'Feet';
            default:
                return unit.charAt(0).toUpperCase() + unit.slice(1); // Capitalize the first letter for other units

        }
    }

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img
                        src={data?.image[0] ? data?.image[0] : "https://www.huntskitchendesigns.com/wp-content/uploads/2024/03/Benefits-of-Thermofoil-Doors.jpg"}
                        className='mx-auto object-fill h-full'/>
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.name}</h1>

                <div>

                    <p className='font-semibold mr-2'>
                        {
                            displayINRCurrency(data.pricePerUnit)
                        }
                        &nbsp;
                        Per {convertUnit(data.unit)}

                    </p>

                    <div
                        className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline/>
                    </div>

                </div>


            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }

        </div>
    )
}

export default AdminProductCard