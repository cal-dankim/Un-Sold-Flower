import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { SHOPS, FLOWERS } from '../data';

const HomePage = () => {
    const navigate = useNavigate();

    // Use a refined palette for market visual identity if no real image
    const getGradient = (idx: number) => {
        const gradients = [
            'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)', // Calm Blue
            'linear-gradient(135deg, #134E5E 0%, #71B280 100%)', // Nature Green
            'linear-gradient(135deg, #4B1248 0%, #F0C27B 100%)', // Sunset
        ];
        return gradients[idx % gradients.length];
    };

    return (
        <div className="relative min-h-screen bg-[#F8F7F4] pb-24">

            {/* Header - More Minimal & Elegant */}
            {/* Header - Simple App Title */}
            <div className="pt-12 px-5 pb-4">
                <h1 className="font-head text-3xl font-bold text-[#2C2C2C]">Un Sold Flower</h1>
                <p className="text-sm text-gray-500 font-light mt-1">오늘, 나를 기다리는 꽃들</p>
            </div>

            {/* Main List */}
            <div className="px-5 space-y-8 pb-32">
                {SHOPS.sort((a, b) => a.distance - b.distance).map((shop, idx) => {
                    // Count stock details
                    const flowers = FLOWERS.filter(f => f.shopId === shop.id);
                    const stockA = flowers.filter(f => f.grade === 'A').length;
                    const stockB = flowers.filter(f => f.grade === 'B').length;
                    const stockC = flowers.filter(f => f.grade === 'C').length;

                    return (
                        <div
                            key={shop.id}
                            onClick={() => navigate(`/market/${shop.id}`)}
                            className="group cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative h-48 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">

                                {/* Background */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                    style={{
                                        backgroundColor: shop.thumb, // Fallback
                                        background: getGradient(idx) // Aesthetic Gradient
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                                    <div className="flex justify-between items-start">
                                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border border-white/10">
                                            {shop.distance < 1000 ? `${shop.distance}m` : `${(shop.distance / 1000).toFixed(1)}km`}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="font-head text-2xl font-bold mb-1 flex items-center gap-2 group-hover:tracking-wide transition-all">
                                            {shop.name}
                                            <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </h2>
                                        <p className="text-white/80 text-xs font-light tracking-wide flex items-center gap-1">
                                            <MapPin size={12} /> {shop.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Breakdown (Refined Design) */}
                            <div className="mt-3 px-2 flex gap-2 overflow-x-auto opacity-80 group-hover:opacity-100 transition-opacity">
                                {stockA > 0 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#DAE5E5] bg-[#F0F4F4] text-[#2F4F4F] font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#5F8E8E]"></span> A급 {stockA}종
                                    </span>
                                )}
                                {stockB > 0 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#EFE0C5] bg-[#FAF4E6] text-[#8B7355] font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878]"></span> B급 {stockB}종
                                    </span>
                                )}
                                {stockC > 0 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded border border-[#F4D6CD] bg-[#FFF0EB] text-[#A0522D] font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D28C75]"></span> C급 {stockC}종
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
