import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ChevronDown } from 'lucide-react';
import { FLOWERS, SHOPS } from '../data';

const SearchPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    // Filters
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Derived Categories (Mock logic: extract unique words or just hardcode common ones)
    const categories = ['장미', '리시안셔스', '유칼립투스', '작약', '해바라기', '안개꽃'];

    const filtered = useMemo(() => {
        return FLOWERS.filter(f => {
            // Keyword
            if (query && !f.name.includes(query)) return false;
            // Grade
            if (selectedGrade && f.grade !== selectedGrade) return false;
            // Shop
            if (selectedShopId && f.shopId !== selectedShopId) return false;
            // Category (Simple string match)
            if (selectedCategory && !f.name.includes(selectedCategory)) return false;

            return true;
        });
    }, [query, selectedGrade, selectedShopId, selectedCategory]);

    const activeFiltersCount = [selectedGrade, selectedShopId, selectedCategory].filter(Boolean).length;

    const clearFilters = () => {
        setSelectedGrade(null);
        setSelectedShopId(null);
        setSelectedCategory(null);
    };

    return (
        <div className="pb-24 px-5 pt-12 min-h-screen bg-[#F8F7F4]">
            <h1 className="font-head text-3xl font-bold text-[#2C2C2C] mb-6">검색</h1>

            {/* Search Input */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="찾으시는 꽃, 가게를 검색해보세요"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base shadow-sm focus:outline-none focus:border-[#556B2F] transition-colors"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Filters ScrollView */}
            <div className="mb-6 -mx-5 px-5">
                <div className="flex gap-2 overflow-x-auto pb-2 px-5 scrollbar-hide">
                    {/* Clear Button */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="flex-shrink-0 px-3 py-2 bg-gray-200 rounded-full text-xs font-bold text-gray-600 flex items-center gap-1"
                        >
                            <X size={12} /> 초기화
                        </button>
                    )}

                    {/* Grade Filter */}
                    <div className="relative group flex-shrink-0">
                        <select
                            className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2 pl-3 pr-8 rounded-full focus:outline-none focus:border-[#556B2F]"
                            value={selectedGrade || ''}
                            onChange={(e) => setSelectedGrade(e.target.value || null)}
                        >
                            <option value="">등급 전체</option>
                            <option value="A">🌿 A급 (최상)</option>
                            <option value="B">🍂 B급 (보통)</option>
                            <option value="C">🥀 C급 (아쉬움)</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Shop Filter */}
                    <div className="relative group flex-shrink-0">
                        <select
                            className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2 pl-3 pr-8 rounded-full focus:outline-none focus:border-[#556B2F]"
                            value={selectedShopId || ''}
                            onChange={(e) => setSelectedShopId(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">가게 전체</option>
                            {SHOPS.map(shop => (
                                <option key={shop.id} value={shop.id}>{shop.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Category Filter (Chips) */}
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                            className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-bold transition-colors border ${selectedCategory === cat
                                ? 'bg-[#556B2F] text-white border-[#556B2F]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-gray-700">
                        검색 결과 <span className="text-[#556B2F]">{filtered.length}</span>건
                    </h2>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                        <SearchIcon size={40} className="mb-4 opacity-20" />
                        <p>조건에 맞는 꽃을 찾을 수 없어요.</p>
                        <button onClick={clearFilters} className="mt-4 text-[#556B2F] text-sm underline">필터 초기화</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {filtered.map(flower => (
                            <div
                                key={flower.id}
                                onClick={() => navigate(`/product/${flower.id}`)}
                                className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all group"
                            >
                                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                    <img src={flower.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    {/* Grade Badge */}
                                    <div className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm ${flower.grade === 'A' ? 'bg-[#F0F4F4] text-[#2F4F4F]' :
                                        flower.grade === 'B' ? 'bg-[#FAF4E6] text-[#8B7355]' :
                                            'bg-[#FFF0EB] text-[#A0522D]'
                                        }`}>
                                        {flower.grade}급
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1">{flower.name}</h3>
                                    <div className="flex justify-between items-end">
                                        <p className="text-[#D32F2F] text-sm font-bold">{flower.price.toLocaleString()}원</p>
                                        <p className="text-gray-400 text-[10px] line-through">{flower.originalPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default SearchPage;
