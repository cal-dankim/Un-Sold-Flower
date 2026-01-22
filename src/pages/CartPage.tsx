import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ArrowLeft, Leaf, Store, Truck, Info } from 'lucide-react';

interface CartItem {
    id: number;
    shopName: string;
    name: string;
    price: number;
    qty: number;
    thumb: string;
}

const CartPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<CartItem[]>([]);
    const [impact, setImpact] = useState(0);

    // Initial Load
    useEffect(() => {
        const stored = sessionStorage.getItem('cart');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const targetPrice = 10000;
    const progress = Math.min((totalPrice / targetPrice) * 100, 100);

    // Logic Change: Dawn Delivery is ONLY possible if > 10k.
    // So if >= 10k, canDawnDelivery = true.
    // If < 10k, canDawnDelivery = false. 
    // Wait, the user said "1만원이상 구매해야 새벽 배송이 가능해요." (Must buy > 10k for Dawn Delivery).
    // CheckoutPage usually handles the toggle. So Cart just passes the state or constraint?
    // Actually, CheckoutPage logic needs to know if Dawn is allowed.
    // Let's pass `dawnDeliveryEnabled: boolean` to Checkout.
    const dawnDeliveryEnabled = totalPrice >= targetPrice;

    // Persist changes
    useEffect(() => {
        if (items.length > 0) sessionStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        const target = 0.5 * items.reduce((acc, i) => acc + i.qty, 0);
        setImpact(parseFloat(target.toFixed(2)));
    }, [items]);

    const removeItem = (id: number) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        sessionStorage.setItem('cart', JSON.stringify(newItems));
    };

    const updateQty = (id: number, delta: number) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                return { ...item, qty: Math.max(1, item.qty + delta) };
            }
            return item;
        });
        setItems(newItems);
    };

    return (
        <div className="min-h-screen bg-[#F4F1EA] p-5 pb-32">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <h1 className="font-head text-xl font-bold">장바구니</h1>
            </header>

            {/* Gamification Gauge - Floral Style */}
            <div className={`p-5 rounded-2xl shadow-sm mb-6 bg-white`}>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-700">
                        {dawnDeliveryEnabled ? '🎉 새벽 배송 가능!' : '새벽 배송 기준 (1만원)'}
                    </span>
                    <span className={`font-bold ${dawnDeliveryEnabled ? 'text-[#D32F2F]' : 'text-gray-400'}`}>
                        {dawnDeliveryEnabled ? '조건 달성완료!' : `${Math.max(0, targetPrice - totalPrice).toLocaleString()}원 필요`}
                    </span>
                </div>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative border border-gray-200">
                    <div
                        className="h-full transition-all duration-1000 ease-out relative"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', // Floral Pink scale
                        }}
                    >
                        {/* Shimmer/Flower effect */}
                        <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                    </div>
                </div>

                {/* Warning / Info Message */}
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                    <Info size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
                    {dawnDeliveryEnabled ? (
                        <span className="text-[#556B2F] font-bold">이제 [새벽 배송]을 선택하실 수 있어요.</span>
                    ) : (
                        <span>
                            <strong className="text-gray-700">1만원 이상 구매해야 [새벽 배송]이 가능해요.</strong><br />
                            그 전에는 [픽업]만 가능합니다.
                        </span>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                        <Leaf size={40} className="mb-4 opacity-20" />
                        <p>아직 담은 꽃이 없어요.</p>
                        <button onClick={() => navigate('/home')} className="mt-4 text-[#556B2F] font-bold underline">꽃 만나러 가기</button>
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl flex gap-4 shadow-sm relative overflow-hidden group">
                            {/* Shop Tag */}
                            <div className="absolute top-0 left-0 bg-[#F5F5F5] px-2 py-1 text-[10px] text-gray-500 font-bold rounded-br-lg z-10 flex items-center gap-1">
                                <Store size={10} /> {item.shopName}
                            </div>

                            <div className="w-20 h-20 rounded-lg bg-gray-100 flex-shrink-0 mt-2 overflow-hidden">
                                <img src={item.thumb} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 mt-2">
                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                <p className="text-[#D32F2F] font-bold">{item.price.toLocaleString()}원</p>

                                <div className="flex items-center gap-3 mt-2">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-full border border-black bg-white text-black flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
                                </div>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="absolute top-4 right-4 text-xs text-gray-400 underline hover:text-red-500 transition-colors"
                            >
                                삭제
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Environmental Impact */}
            {items.length > 0 && (
                <div className="mt-8 border-t border-dashed border-gray-300 pt-6">
                    <div className="bg-[#E8F5E9] p-4 rounded-xl flex items-center justify-between text-[#2E7D32]">
                        <div className="flex items-center gap-2">
                            <Leaf size={18} />
                            <span className="font-bold text-sm">환경 기여도</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs opacity-70">폐기물 감소량</p>
                            <p className="font-bold text-lg">{impact} kg</p>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA - Positioned ABOVE BottomNav */}
            <div className="fixed bottom-[88px] left-0 right-0 px-5 z-40">
                <button
                    onClick={() => {
                        navigate('/checkout', { state: { dawnDeliveryEnabled } });
                    }}
                    disabled={items.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl outline-none ring-0 ${items.length === 0 ? 'bg-gray-300 text-gray-500' : '!bg-black !text-white hover:bg-gray-900'
                        }`}
                >
                    {items.length === 0 ? '상품을 담아주세요' : `${totalPrice.toLocaleString()}원 ${dawnDeliveryEnabled ? '새벽 배송하러 가기' : '픽업 주문하기'}`}
                </button>
            </div>
        </div>
    );
};

export default CartPage;
