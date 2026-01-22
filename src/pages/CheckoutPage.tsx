import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Truck, Footprints, CheckCircle, CreditCard, Lock } from 'lucide-react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Validated from Cart
    const dawnDeliveryEnabled = location.state?.dawnDeliveryEnabled ?? true;

    const [method, setMethod] = useState<'delivery' | 'pickup'>('pickup');
    const [isSuccess, setIsSuccess] = useState(false);

    // If dawn delivery is disabled, force pickup if not already set (but pickup is default 'pickup' so fine)
    useEffect(() => {
        if (!dawnDeliveryEnabled && method === 'delivery') {
            setMethod('pickup');
        }
    }, [dawnDeliveryEnabled]);

    const handlePayment = () => {
        setIsSuccess(true);
        sessionStorage.removeItem('cart');
    };

    if (isSuccess) {
        return <SuccessScreen navigate={navigate} />
    }

    return (
        <div className="min-h-screen bg-[#F4F1EA] p-5 pb-24">
            <header className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <h1 className="font-head text-xl font-bold">결제하기</h1>
            </header>

            {/* Info Context */}
            {!dawnDeliveryEnabled && (
                <div className="bg-orange-50 text-orange-800 p-3 rounded-lg text-sm mb-6 flex items-start gap-2 border border-orange-100">
                    <Lock size={16} className="mt-0.5 text-orange-500" />
                    <span>
                        <strong>1만원 미만 주문</strong>은 새벽 배송이 불가합니다.<br />
                        (픽업만 가능해요)
                    </span>
                </div>
            )}

            {/* Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => setMethod('pickup')}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all relative ${method === 'pickup'
                            ? 'border-[#556B2F] bg-white shadow-lg scale-105'
                            : 'border-transparent bg-white/50 grayscale opacity-70'
                        }`}
                >
                    <Footprints size={32} className={method === 'pickup' ? "text-[#556B2F]" : ""} />
                    <span className="font-bold text-gray-700">퇴근길 픽업</span>
                </button>
                <button
                    disabled={!dawnDeliveryEnabled}
                    onClick={() => setMethod('delivery')}
                    className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all relative ${method === 'delivery'
                            ? 'border-[#556B2F] bg-white shadow-lg scale-105'
                            : !dawnDeliveryEnabled ? 'border-transparent bg-gray-200 grayscale opacity-40 cursor-not-allowed' : 'border-transparent bg-white/50 grayscale opacity-70'
                        }`}
                >
                    <Truck size={32} className={method === 'delivery' ? "text-[#556B2F]" : ""} />
                    <div className="text-center">
                        <span className="font-bold text-gray-700 block">새벽 배송</span>
                        <span className="text-xs text-gray-500">{!dawnDeliveryEnabled ? '이용 불가' : '+3,000원'}</span>
                    </div>
                </button>
            </div>

            {/* Map or Info */}
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                {method === 'pickup' ? (
                    <div className="w-full h-full flex flex-col items-center text-center">
                        <p className="font-bold text-gray-800 mb-2">픽업 경로 안내</p>
                        <div className="w-full h-32 bg-gray-100 rounded-lg relative overflow-hidden">
                            {/* Simulated Path */}
                            <svg className="w-full h-full absolute top-0 left-0">
                                <path d="M 50 100 Q 150 50 250 80" stroke="#556B2F" strokeWidth="3" fill="none" strokeDasharray="10 5" className="animate-dash" />
                                <circle cx="50" cy="100" r="6" fill="#2C2C2C" />
                                <circle cx="250" cy="80" r="6" fill="#D32F2F" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>내일 새벽 7시 전 도착 보장</p>
                        <p className="text-xs mt-2">서울/경기 일부 지역 가능</p>
                    </div>
                )}
            </div>

            {/* Payment Summary */}
            <div className="bg-white p-5 rounded-xl mb-6 space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-500">주문 금액</span>
                    <span className="font-bold">상품 금액</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">배송비</span>
                    <span className="font-bold">{method === 'delivery' ? '3,000원' : '0원'}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg text-[#D32F2F] font-bold">
                    <span>총 결제금액</span>
                    <span>{method === 'delivery' ? '(상품) + 3,000원' : '(상품) + 0원'}</span>
                </div>
            </div>

            {/* Pay Button */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#F4F1EA]">
                <button
                    onClick={handlePayment}
                    className="w-full bg-[#2C2C2C] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center gap-2 active:scale-95 transition-transform"
                >
                    <CreditCard size={20} />
                    결제하기
                </button>
            </div>

            <style>{`
         .animate-dash {
            stroke-dasharray: 10;
            animation: dash 1s linear infinite;
         }
         @keyframes dash {
            to { stroke-dashoffset: -20; }
         }
      `}</style>
        </div>
    );
};

const SuccessScreen = ({ navigate }: { navigate: any }) => {
    return (
        <div className="fixed inset-0 bg-[#F4F1EA] flex flex-col items-center justify-center z-50 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="confetti" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        backgroundColor: ['#FFC107', '#D32F2F', '#4CAF50', '#2196F3'][Math.floor(Math.random() * 4)]
                    }}></div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-full shadow-lg mb-6 animate-bounce">
                <CheckCircle size={64} className="text-[#556B2F]" />
            </div>
            <h2 className="font-head text-2xl font-bold mb-2">주문이 완료되었습니다.</h2>
            <p className="text-gray-500 mb-8">꽃들이 새로운 주인을 만나 기뻐하고 있어요.</p>

            <button
                onClick={() => navigate('/home')}
                className="px-8 py-3 bg-[#556B2F] text-white rounded-full font-bold shadow-md hover:bg-[#435624]"
            >
                홈으로 돌아가기
            </button>

            <style>{`
                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: -10px;
                    opacity: 0;
                    animation: fall 3s linear infinite;
                }
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default CheckoutPage;
