import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import ThermofoilVerticalCard from "../components/ThermofolioVerticalCard";
import ProductModal from "../components/ProductModal";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const   ThermofoilProducts = () => {
    const [originalData, setOriginalData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        brand: 'All Brands',
        finish: 'All Finishes',
        priceSort: 'Price: Low to High'
    })

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { productId } = useParams()
    const navigate = useNavigate()

    const brands = ['All Brands', ...new Set(originalData.map(product => product.brand))]
    const finishes = ['All Finishes', 'Matte', 'Glossy', 'Textured']
    const { fetchUserAddToCart } = useContext(Context)

    const fetchThermofoilProducts = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.getAllThermofoil.url)
            const dataResponse = await response.json()
            if (dataResponse.success) {
                setOriginalData(dataResponse.data)
                setFilteredData(dataResponse.data)
            }
        } catch (error) {
            console.error("Error fetching thermofoil products:", error)
        } finally {
            setLoading(false)
        }
    }

    const performAddToCart = async (e, productId, itemType) => {
        e.stopPropagation()
        await addToCart(e, productId, itemType)
        fetchUserAddToCart()
        setIsModalOpen(false)
    }

    const handleCheckout = async (e,productId,itemType) => {
        e.stopPropagation()
        await addToCart(e, productId, itemType)
        fetchUserAddToCart()
        setIsModalOpen(false)
    };

    const applyFilters = () => {
        let result = [...originalData]

        if (filters.brand !== 'All Brands') {
            result = result.filter(product => product.brand === filters.brand)
        }

        if (filters.finish !== 'All Finishes') {
            const finishLower = filters.finish.toLowerCase()
            result = result.filter(product =>
                product.name.toLowerCase().includes(finishLower) ||
                product.description.toLowerCase().includes(finishLower))
        }

        if (filters.priceSort === 'Price: Low to High') {
            result.sort((a, b) => a.pricePerUnit - b.pricePerUnit)
        } else if (filters.priceSort === 'Price: High to Low') {
            result.sort((a, b) => b.pricePerUnit - a.pricePerUnit)
        }

        setFilteredData(result)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        fetchThermofoilProducts()
    }, [])

    useEffect(() => {
        if (originalData.length > 0) {
            applyFilters()
        }
    }, [filters, originalData])

    useEffect(() => {
        if (productId && originalData.length > 0) {
            const product = originalData.find(p => p._id === productId)
            if (product) {
                setSelectedProduct(product)
                setIsModalOpen(true)
            }
        }
    }, [productId, originalData])

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-6'>Thermofoil Products</h1>

            {/* Filter Section */}
            <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                <h2 className='text-lg font-semibold mb-3'>Filter Options</h2>
                <div className='flex flex-wrap gap-4'>
                    <select
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                        className='p-2 border rounded'
                    >
                        {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                    <select
                        name="finish"
                        value={filters.finish}
                        onChange={handleFilterChange}
                        className='p-2 border rounded'
                    >
                        {finishes.map(finish => (
                            <option key={finish} value={finish}>{finish}</option>
                        ))}
                    </select>

                    <select
                        name="priceSort"
                        value={filters.priceSort}
                        onChange={handleFilterChange}
                        className='p-2 border rounded'
                    >
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            <p className='text-lg font-semibold my-3'>
                Showing {filteredData.length} {filteredData.length === 1 ? 'product' : 'products'}
            </p>

            {loading && (
                <div className='flex justify-center my-8'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                </div>
            )}

            {!loading && filteredData.length === 0 && (
                <div className='bg-white rounded-lg shadow p-6 text-center'>
                    <p className='text-lg'>No thermofoil products found</p>
                    <p className='text-gray-500'>Please check back later or try different filters</p>
                </div>
            )}

            {!loading && filteredData.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {filteredData.map(product => (
                        <ThermofoilVerticalCard
                            key={product._id}
                            product={product}
                            onClick={() => navigate(`/thermofoil/${product._id}`)}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    showModal={isModalOpen}
                    setShowModal={setIsModalOpen}
                    performAddToCart={performAddToCart}
                    handleCheckout={handleCheckout}
                />
            )}
        </div>
    )
}

export default ThermofoilProducts
