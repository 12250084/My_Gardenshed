import React, {useEffect, useState} from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import AddThermofoilProductModal from "../components/AddThermofoilProductModal";
import AdminThermofoilProductCard from "../components/AdminThermofoilProductCard";

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [openUploadThermofoilProduct, setOpenUploadThermofoilProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [allThermofoilProduct, setAllThermofoilProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        console.log("product data", dataResponse)

        setAllProduct(dataResponse?.data || [])
    }


    const fetchThermofoilProduct = async () => {
        const response = await fetch(SummaryApi.getAllThermofoil.url)
        const dataResponse = await response.json()
        setAllThermofoilProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
        fetchThermofoilProduct()
    }, [])

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>Thermofoil Product</h2>
                <div className='flex items-center gap-3'>
                    <button
                        className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full '
                        onClick={() => setOpenUploadThermofoilProduct(true)}>
                        Add Thermofoil Product
                    </button>
                </div>
            </div>


            {/**Thermofoil product */}
            <div className='flex items-center flex-wrap gap-5 py-4 overflow-y-scroll'>
                {
                    allThermofoilProduct.map((product, index) => {
                        return (
                            <AdminThermofoilProductCard data={product} key={index + "allProduct"}
                                                        fetchdata={fetchThermofoilProduct}/>
                        )
                    })
                }
                {allThermofoilProduct.length === 0 && (
                    <div className='w-full text-center text-gray-500 py-4 h-[25vh] flex items-center justify-center bg-white'>
                        No Thermofoil products available.
                    </div>
                )}


            </div>

            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>Other Product</h2>
                <div className='flex items-center gap-3'>
                    <button
                        className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full '
                        onClick={() => setOpenUploadProduct(true)}>
                        Upload Product
                    </button>

                </div>
            </div>

            {/**other product */}
            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
                        )
                    })
                }
            </div>


            {/**upload prouct component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
                )
            }
            {/**upload thermofoil product component */}
            {
                openUploadThermofoilProduct && (
                    <AddThermofoilProductModal onClose={() => setOpenUploadThermofoilProduct(false)}
                                               fetchData={fetchAllProduct} thermofoil={true}/>
                )
            }


        </div>
    )
}

export default AllProducts