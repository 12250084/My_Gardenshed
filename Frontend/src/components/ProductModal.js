import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, showModal, setShowModal, performAddToCart, handleCheckout }) => {
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(product.pricePerUnit);

    useEffect(() => {
        setTotalPrice((quantity * product.pricePerUnit).toFixed(2));
    }, [quantity, product.pricePerUnit]);

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };

    if (!showModal || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-1/2 p-6">
                        <img
                            src={product.image?.[0]}
                            alt={product.name}
                            className="w-full h-64 md:h-96 object-contain rounded-lg"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
                            }}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-1/2 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                                <p className="text-gray-600">{product.brand}</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-gray-700 mb-6">{product.description}</p>

                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <span className="text-gray-700 font-medium mr-2">Price:</span>
                                <span className="text-xl font-bold text-blue-600">${product.pricePerUnit}/{product.unit}</span>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Quantity ({product.unit})</label>
                                <div className="flex items-center">
                                    <button
                                        onClick={decrementQuantity}
                                        className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-16 text-center border-t border-b border-gray-300 py-1"
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                                <span className="font-medium">Total:</span>
                                <span className="text-xl font-bold text-blue-600">${totalPrice}</span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={(e) => handleCheckout(e, product._id, "thermofoil")}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={(e) => performAddToCart(e, product._id, "thermofoil")}
                                className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
