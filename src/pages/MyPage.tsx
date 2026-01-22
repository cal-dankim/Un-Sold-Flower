import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Heart } from 'lucide-react';
import { FLOWERS } from '../data';

const MyPage = () => {
    const navigate = useNavigate();
    const [likedIds, setLikedIds] = useState<number[]>([]);

    useEffect(() => {
        const stored = JSON.parse(sessionStorage.getItem('liked_flowers') || '[]');
        setLikedIds(stored);
    }, []);

    const likedFlowers = FLOWERS.filter(f => likedIds.includes(f.id));

    return (
        <div className="pb-24 pt-12 px-5">
            <div className="flex justify-between items-start mb-8">
                <h1 className="font-head text-3xl font-bold text-[#2C2C2C]">마이페이지</h1>
                <button
                    onClick={() => alert('광운대학교 정보융합학부 흥해라')}
                    className="p-2 text-gray-400 hover:text-[#2C2C2C] transition-colors"
                >
                    <Settings size={20} />
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <User size={32} />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-gray-800">꽃을 사랑하는 님</h2>
                    <p className="text-xs text-gray-400">나의 환경 기여도: Lv.3 새싹</p>
                </div>
            </div>

            {/* Liked Section */}
            <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-[#D32F2F] fill-current" />
                    내가 찜한 꽃
                </h3>

                {likedFlowers.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p>아직 찜한 꽃이 없어요.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {likedFlowers.map(flower => (
                            <div
                                key={flower.id}
                                onClick={() => navigate(`/product/${flower.id}`)}
                                className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer group relative"
                            >
                                <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <Heart size={12} className="text-[#D32F2F] fill-current" />
                                </div>
                                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                    <img src={flower.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-gray-800 text-sm">{flower.name}</h3>
                                    <p className="text-[#D32F2F] text-sm font-bold mt-1">{flower.price.toLocaleString()}원</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
