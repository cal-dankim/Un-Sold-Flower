import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, AlertCircle, Store, Heart } from 'lucide-react';
import { FLOWERS, SHOPS } from '../data';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const [activeImage, setActiveImage] = useState(0); // Removed unused

    // Parse ID
    const flowerId = parseInt(id || '1');
    const flower = FLOWERS.find(f => f.id === flowerId);
    const shop = flower ? SHOPS.find(s => s.id === flower.shopId) : null;

    if (!flower || !shop) {
        return <div>Loading or Not Found...</div>;
    }

    // Use the single real image for now, maybe duplicate it for array simulation or just use one
    const images = [flower.image];

    // Like Logic
    const [isLiked, setIsLiked] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('liked_flowers') || '[]');
        setIsLiked(stored.includes(flowerId));
    }, [flowerId]);

    const toggleLike = (e: any) => {
        e.stopPropagation();
        const stored = JSON.parse(sessionStorage.getItem('liked_flowers') || '[]');
        let newStored;
        if (stored.includes(flowerId)) {
            newStored = stored.filter((id: number) => id !== flowerId);
            setIsLiked(false);
        } else {
            newStored = [...stored, flowerId];
            setIsLiked(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
        sessionStorage.setItem('liked_flowers', JSON.stringify(newStored));
    };

    const handleAddToCart = () => {
        // In a real app, use Context or Redux. Here we'll just navigate to Cart which reads from a mock state (we'll update Cart next)
        // For prototype: we can save to sessionStorage to simulate
        const cartItem = {
            id: flower.id,
            shopName: shop.name,
            name: flower.name,
            price: flower.price,
            qty: 1,
            thumb: flower.image
        };

        const existingCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        existingCart.push(cartItem);
        sessionStorage.setItem('cart', JSON.stringify(existingCart));

        navigate('/cart');
    };

    return (
        <div className="bg-[#F4F1EA] min-h-screen pb-24 relative">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
                <button onClick={() => navigate(-1)} className="pointer-events-auto p-2.5 bg-white/90 backdrop-blur shadow-sm rounded-full text-gray-800 hover:bg-white transition-colors"><ArrowLeft size={24} /></button>
            </header>

            {/* Image Viewer */}
            <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                <img
                    src={images[0]} // fixed to 0 since activeImage is removed
                    alt={flower.name}
                    className="w-full h-full object-cover animate-fade-in"
                />

                {/* Actions Overlay (Inside Image) */}
                <div className="absolute bottom-16 right-4 flex flex-col gap-3 z-10">
                    <button onClick={toggleLike} className="p-3 bg-white shadow-lg rounded-full text-black hover:scale-110 transition-all active:scale-90">
                        <Heart size={24} className={isLiked ? "text-[#D32F2F] fill-[#D32F2F]" : "text-black"} />
                    </button>
                    <button
                        onClick={() => alert('광운대학교 정보융합학부 흥해라')}
                        className="p-3 bg-white shadow-lg rounded-full text-black hover:scale-110 transition-all active:scale-90"
                    >
                        <Share2 size={24} />
                    </button>
                </div>

                {/* No Filter Watermark */}
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/20 flex items-center gap-1">
                    <span>✨ 보정 없는 실사</span>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 py-6 space-y-6">

                {/* Shop Info Badge */}
                <div className="flex items-center gap-2 text-[#556B2F] bg-[#E8F5E9] p-3 rounded-lg w-full">
                    <Store size={18} />
                    <span className="font-bold text-sm">도매시장 : {shop.name}</span>
                </div>

                {/* Grading Badges (Refined) */}
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {flower.grade === 'A' && (
                            <span className="text-sm px-3 py-1 rounded-full border border-[#DAE5E5] bg-[#F0F4F4] text-[#2F4F4F] font-bold">
                                🌿 A급 (최상)
                            </span>
                        )}
                        {flower.grade === 'B' && (
                            <span className="text-sm px-3 py-1 rounded-full border border-[#EFE0C5] bg-[#FAF4E6] text-[#8B7355] font-bold">
                                🍂 B급 (보통)
                            </span>
                        )}
                        {flower.grade === 'C' && (
                            <span className="text-sm px-3 py-1 rounded-full border border-[#F4D6CD] bg-[#FFF0EB] text-[#A0522D] font-bold">
                                🥀 C급 (아쉬움)
                            </span>
                        )}
                    </div>
                    <span className="text-gray-600 text-sm ml-4 line-clamp-1 border-l pl-4 border-gray-200">
                        {flower.gradeDesc}
                    </span>
                </div>

                {/* Title & Price */}
                <div>
                    <h1 className="text-2xl font-head font-bold mb-2 text-[#2C2C2C]">{flower.name}</h1>
                    <div className="flex items-baseline gap-3">
                        <span className="text-[#D32F2F] text-3xl font-bold">{flower.discount}%</span>
                        <span className="text-[#D32F2F] text-3xl font-bold">{flower.price.toLocaleString()}원</span>
                        <span className="text-gray-400 text-sm line-through decoration-1">{flower.originalPrice.toLocaleString()}원</span>
                    </div>
                </div>

                {/* Honest Checklist */}
                <div className="bg-[#F0EEE6] p-5 rounded-xl border border-[#E5E0D6] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

                    <h3 className="font-head text-lg mb-3 flex items-center gap-2">
                        <AlertCircle size={16} /> 솔직한 상태 체크
                    </h3>
                    <ul className="space-y-2 font-handwriting">
                        {flower.reason.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                                <span className="w-4 h-4 border border-[#2C2C2C] bg-[#2C2C2C] text-white rounded flex items-center justify-center text-xs">
                                    ✓
                                </span>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Description Text */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {shop.description} <br />
                    조금 부족해 보일 수 있지만, 당신의 공간을 채우기엔 충분히 아름답습니다.
                </p>

            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-5 pt-4 pb-10 bg-white border-t border-gray-100 z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                <button
                    onClick={handleAddToCart}
                    className="w-full !bg-black !text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2 hover:bg-gray-900"
                >
                    장바구니에 담기
                </button>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl z-[70] flex items-center gap-2 animate-fade-in text-sm font-bold whitespace-nowrap">
                    <Heart size={16} className="fill-red-500 text-red-500" />
                    마이페이지에 등록되었습니다!
                </div>
            )}

            <style>{`
        @keyframes pulse-light {
          0% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(255, 235, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0); }
        }
        .animate-pulse-light {
          animation: pulse-light 2s infinite;
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
        </div>
    );
};

export default ProductPage;
