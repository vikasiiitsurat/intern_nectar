import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuantityControl, Button } from '../components/Components';
import { useCartStore, useUIStore } from '../stores';

// --- Cart ---
export const Cart: React.FC = () => {
    const { items, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();
    const navigate = useNavigate();
    const [showCheckout, setShowCheckout] = useState(false);

    const toggleCheckout = () => setShowCheckout(!showCheckout);

    return (
        <div className="p-4 pb-24 md:pb-0 relative h-full">
            <h2 className="text-xl font-bold text-center mb-6 border-b pb-4">My Cart</h2>
            
            <div className="space-y-6">
                {items.length === 0 ? (
                    <div className="text-center text-graytext py-10">Your cart is empty</div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-4">
                                <img src={item.image} className="w-16 h-16 object-contain" alt={item.name}/>
                                <div>
                                    <div className="flex justify-between w-full mb-1">
                                        <h4 className="font-bold text-dark">{item.name}</h4>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="text-graytext text-sm mb-3">{item.unit}, Price</div>
                                    <div className="flex items-center gap-12">
                                        <QuantityControl 
                                            quantity={item.quantity} 
                                            onDecrease={() => updateQuantity(item.id, -1)} 
                                            onIncrease={() => updateQuantity(item.id, 1)} 
                                        />
                                        <span className="font-bold text-lg text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {items.length > 0 && (
                <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96">
                    <Button fullWidth onClick={toggleCheckout}>
                        <div className="flex justify-between w-full px-4">
                            <span>Go to Checkout</span>
                            <span className="bg-emerald-800/30 px-2 rounded text-sm flex items-center">${getTotalPrice().toFixed(2)}</span>
                        </div>
                    </Button>
                </div>
            )}

            {/* Checkout Bottom Sheet / Modal */}
            {showCheckout && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex justify-end flex-col">
                    <div className="bg-gray-100 rounded-t-3xl p-6 animate-slide-up pb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Checkout</h2>
                            <button onClick={toggleCheckout} className="text-2xl">&times;</button>
                        </div>

                        <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200 mb-8 bg-white rounded-xl overflow-hidden">
                            <div className="flex justify-between items-center p-4">
                                <span className="text-graytext font-medium">Delivery</span>
                                <div className="flex items-center gap-2 font-semibold text-dark">
                                    Select Method <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <span className="text-graytext font-medium">Payment</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">💳</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <span className="text-graytext font-medium">Promo Code</span>
                                <div className="flex items-center gap-2 font-semibold text-dark">
                                    Pick discount <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <span className="text-graytext font-medium">Total Cost</span>
                                <div className="flex items-center gap-2 font-semibold text-dark">
                                    ${getTotalPrice().toFixed(2)} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-graytext mb-6">
                            By placing an order you agree to our <span className="text-dark font-bold">Terms</span> And <span className="text-dark font-bold">Conditions</span>
                        </div>

                        <Button fullWidth onClick={() => navigate('/order-success')}>Place Order</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

// --- Success Screen ---
export const OrderSuccess: React.FC = () => {
    const navigate = useNavigate();
    const clearCart = useCartStore(s => s.clearCart);

    React.useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto">
             <div className="mb-8 relative">
                 {/* Success Illustration Placeholder */}
                 <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 </div>
             </div>
             <h2 className="text-2xl font-bold text-dark mb-4 text-center">Your Order has been<br/> accepted</h2>
             <p className="text-graytext mb-12 text-center">Your items has been placed and is on<br/>it's way to being processed</p>

             <div className="w-full space-y-4">
                 <Button fullWidth onClick={() => navigate('/home')}>Track Order</Button>
                 <Button fullWidth variant="ghost" onClick={() => navigate('/home')}>Back to home</Button>
             </div>
        </div>
    )
}

// --- Error Screen (Example) ---
export const OrderFailed: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
             <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center">
                 <button onClick={() => navigate(-1)} className="self-start text-2xl text-dark mb-2">&times;</button>
                 <img src="https://picsum.photos/200/200?random=fail" alt="Fail" className="w-48 mb-6 object-contain" />
                 
                 <h2 className="text-2xl font-bold text-dark mb-2">Oops! Order Failed</h2>
                 <p className="text-graytext mb-8">Something went terribly wrong.</p>
                 
                 <Button fullWidth onClick={() => navigate('/cart')}>Please Try Again</Button>
                 <div className="h-4"/>
                 <Button fullWidth variant="ghost" onClick={() => navigate('/home')}>Back to home</Button>
             </div>
        </div>
    )
}
