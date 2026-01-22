import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Store } from 'lucide-react';
import { SHOPS, FLOWERS } from '../data';

const MarketDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const marketId = parseInt(id || '0');

    const market = SHOPS.find(s => s.id === marketId);
    const flowers = FLOWERS.filter(f => f.shopId === marketId);

    if (!market) return <div>Market not found</div>;

    return (
        <div className="min-h-screen bg-[#F4F1EA] pb-10">
            {/* Header / Hero */}
            <div className="relative h-64 w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundColor: market.thumb }} // Ideally use a real image if available, fallback to color
                ></div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                {/* Navbar */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center z-10">
                    <button onClick={() => navigate(-1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    {/* Title could go here on scroll, but for now huge title below */}
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-90 text-sm font-light">
                        <MapPin size={14} />
                        <span>{market.address}</span>
                    </div>
                    <h1 className="font-head text-3xl font-bold mb-2">{market.name}</h1>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">
                        {market.description}
                    </p>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-5 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-head font-bold text-[#2C2C2C] flex items-center gap-2">
                        <Store size={20} className="text-[#556B2F]" />
                        판매 중인 꽃
                    </h2>
                    <span className="text-xs font-bold text-[#556B2F] bg-[#E8F5E9] px-3 py-1 rounded-full border border-[#556B2F]/20">
                        실시간 재고 {flowers.length}종
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {flowers.map(flower => (
                        <div
                            key={flower.id}
                            onClick={() => navigate(`/product/${flower.id}`)}
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#E0E0E0]/50 flex gap-4 group"
                        >
                            {/* Image with zoom effect */}
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                                <img
                                    src={flower.image}
                                    alt={flower.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Grade Badge Overlay */}
                                <div className={`absolute top-0 left-0 px-2 py-0.5 text-[10px] font-bold rounded-br-lg border-b border-r ${flower.grade === 'A' ? 'bg-[#F0F4F4]/95 text-[#2F4F4F] border-[#DAE5E5]' :
                                        flower.grade === 'B' ? 'bg-[#FAF4E6]/95 text-[#8B7355] border-[#EFE0C5]' :
                                            'bg-[#FFF0EB]/95 text-[#A0522D] border-[#F4D6CD]'
                                    }`}>
                                    {flower.grade}급
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 py-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-1">{flower.name}</h3>
                                    <p className="text-xs text-gray-500 line-clamp-1">{flower.gradeDesc}</p>
                                </div>

                                <div className="flex items-end justify-between">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[#D32F2F] font-bold text-lg">{flower.price.toLocaleString()}원</span>
                                        <span className="text-gray-400 text-xs line-through">{flower.originalPrice.toLocaleString()}</span>
                                    </div>
                                    <span className="text-[#D32F2F] text-xs font-bold bg-red-50 px-1.5 py-0.5 rounded">
                                        {flower.discount}% OFF
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {flowers.length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            현재 판매 중인 꽃이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketDetailPage;
