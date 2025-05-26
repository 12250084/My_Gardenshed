import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { motion } from 'framer-motion'

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(4).fill(null) // Reduced skeleton loaders

    const scrollElement = useRef()
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault()
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data || [])
    }

    useEffect(() => {
        fetchData()
    }, [category])

    const scrollRight = () => {
        scrollElement.current.scrollBy({ left: 320, behavior: 'smooth' })
    }

    const scrollLeft = () => {
        scrollElement.current.scrollBy({ left: -320, behavior: 'smooth' })
    }

    return (
        <div className='container mx-auto px-4 my-8 relative'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-gray-800'>{heading}</h2>
                <div className='flex gap-2'>
                    <button
                        className='bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md transition-all'
                        onClick={scrollLeft}
                    >
                        <FaAngleLeft className='text-lg' />
                    </button>
                    <button
                        className='bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-md transition-all'
                        onClick={scrollRight}
                    >
                        <FaAngleRight className='text-lg' />
                    </button>
                </div>
            </div>

            <div
                className='flex items-center gap-6 overflow-x-auto scrollbar-none pb-6'
                ref={scrollElement}
            >
                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden'
                        >
                            <div className='bg-gray-100 h-48 w-full animate-pulse'></div>
                            <div className='p-4 space-y-3'>
                                <div className='h-5 bg-gray-100 rounded-full animate-pulse w-3/4'></div>
                                <div className='h-4 bg-gray-100 rounded-full animate-pulse w-1/2'></div>
                                <div className='flex gap-3'>
                                    <div className='h-5 bg-gray-100 rounded-full animate-pulse w-1/3'></div>
                                    <div className='h-5 bg-gray-100 rounded-full animate-pulse w-1/3'></div>
                                </div>
                                <div className='h-8 bg-gray-100 rounded-full animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <motion.div
                            key={product._id}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                            className='flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all'
                        >
                            <Link to={`product/${product._id}`} className='block'>
                                <div className='bg-gray-50 h-48 flex items-center justify-center p-4'>
                                    <img
                                        src={product.productImage[0]}
                                        className='object-contain h-full hover:scale-105 transition-transform duration-300 mix-blend-multiply'
                                        alt={product.productName}
                                    />
                                </div>
                                <div className='p-4 space-y-3'>
                                    <h3 className='font-semibold text-gray-800 text-lg truncate'>
                                        {product.productName}
                                    </h3>
                                    <p className='text-gray-500 text-sm capitalize'>
                                        {product.category}
                                    </p>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-red-600 font-bold text-lg'>
                                            {displayINRCurrency(product.sellingPrice)}
                                        </span>
                                        {product.price > product.sellingPrice && (
                                            <span className='text-gray-400 text-sm line-through'>
                                                {displayINRCurrency(product.price)}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className='w-full py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium rounded-lg transition-all'
                                        onClick={(e) => handleAddToCart(e, product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}

export default VerticalCardProduct