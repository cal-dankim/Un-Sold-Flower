import { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
    const [showButton, setShowButton] = useState(false);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const textTimer = setTimeout(() => setTextVisible(true), 2500);
        const buttonTimer = setTimeout(() => setShowButton(true), 4000);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    const handleEnter = () => {
        onFinish();
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#121212] flex flex-col items-center justify-center overflow-hidden">

            {/* Rose Animation Container */}
            <div className="relative w-80 h-80 mb-8">
                <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-2xl overflow-visible">
                    <defs>
                        <linearGradient id="roseGradientSplash" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D32F2F" />
                            <stop offset="100%" stopColor="#8E0000" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <g className="flower-art" fill="none" stroke="#F4F1EA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        {/* Stem Parts - Growing Up */}
                        <path className="fragment fade-up delay-0" d="M256,480 c0,0 -20,-100 0,-180" stroke="#4CAF50" />
                        <path className="fragment fade-right delay-1" d="M256,400 c0,0 40,-20 60,-60" stroke="#4CAF50" />
                        <path className="fragment fade-left delay-1" d="M256,440 c0,0 -40,-10 -50,-50" stroke="#4CAF50" />

                        {/* Inner Bud - Rotating & Scaling In */}
                        <path className="fragment spin-in delay-2" d="M256,200 c-10,0 -20,10 -20,30 c0,20 20,30 20,30 c20,0 20,-20 20,-30 c0,-20 -10,-30 -20,-30" />
                        <path className="fragment spin-in delay-3" d="M236,220 c-10,-20 10,-40 20,-40 c20,0 30,20 20,40" />

                        {/* Middle Layers - Coming from corners */}
                        <path className="fragment fly-top-left delay-4" d="M256,260 c-30,10 -50,-20 -50,-40 c0,-30 30,-50 50,-50 c30,0 50,20 50,50 c0,30 -20,40 -50,40" />
                        <path className="fragment fly-top-right delay-5" d="M210,210 c-20,20 -20,60 10,80" />
                        <path className="fragment fly-bottom-left delay-5" d="M300,210 c20,20 20,60 -10,80" />

                        {/* Outer Petals - Sweeping in */}
                        <path className="fragment sweep-left delay-6" d="M256,300 c-40,10 -80,-20 -90,-60 c-5,-30 10,-60 40,-80" />
                        <path className="fragment sweep-right delay-6" d="M256,300 c40,10 80,-20 90,-60 c5,-30 -10,-60 -40,-80" />
                        <path className="fragment fly-far delay-7" d="M180,180 c-20,40 -10,100 40,130" />
                        <path className="fragment fly-far delay-7" d="M330,180 c20,40 10,100 -40,130" />
                    </g>
                </svg>
            </div>

            {/* App Name & Slogan */}
            <div className="text-center z-10 flex flex-col items-center justify-center space-y-4">
                {textVisible && (
                    <div className="animate-fade-up">
                        <h1 className="font-head text-4xl text-white font-bold tracking-widest mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Un Sold Flower</h1>
                        <p className="font-body text-white/70 text-sm font-light tracking-wide leading-7 opacity-0 animate-fade-in-slow">
                            팔지 않는 꽃을 팝니다.<br />
                            가장 아름다운 마음으로,
                        </p>
                    </div>
                )}
            </div>

            {/* Button */}
            <div className={`mt-16 transition-all duration-1000 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button
                    onClick={handleEnter}
                    className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
                >
                    <div className="absolute inset-0 border-2 border-white/80 rounded-full group-hover:border-white transition-colors"></div>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                    <span className="relative font-bold text-white tracking-widest group-hover:text-white transition-colors">
                        꽃 만나러 가기
                    </span>
                </button>
            </div>

            <style>{`
        /* Base Fragment Style */
        .fragment {
           opacity: 0;
           transform-origin: center;
           /* Combine stroke drawing with movement */
           stroke-dasharray: 400;
           stroke-dashoffset: 400;
        }

        /* Animation Assignments */
        .fade-up { animation: assemble 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, draw 2s ease forwards; }
        .fade-right { animation: flyInRight 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .fade-left { animation: flyInLeft 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        
        .spin-in { animation: spinIn 3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, draw 2s ease forwards; }
        
        .fly-top-left { animation: flyTopLeft 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, draw 2s ease forwards; }
        .fly-top-right { animation: flyTopRight 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, draw 2s ease forwards; }
        .fly-bottom-left { animation: flyBottomLeft 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, draw 2s ease forwards; }
        
        .sweep-left { animation: sweepLeft 3s ease-out forwards, draw 1.5s ease forwards; }
        .sweep-right { animation: sweepRight 3s ease-out forwards, draw 1.5s ease forwards; }
        .fly-far { animation: flyFar 3.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, draw 2s ease forwards; }

        /* Delays */
        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.7s; }
        .delay-6 { animation-delay: 0.9s; }
        .delay-7 { animation-delay: 1.1s; }

        /* Keyframes */
        @keyframes draw {
           to { stroke-dashoffset: 0; }
        }

        @keyframes assemble {
           from { opacity: 0; transform: translateY(50px); }
           to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flyInLeft {
           from { opacity: 0; transform: translateX(-30px) rotate(-10deg); stroke-dashoffset: 400; }
           to { opacity: 1; transform: translateX(0) rotate(0); stroke-dashoffset: 0; }
        }
        @keyframes flyInRight {
           from { opacity: 0; transform: translateX(30px) rotate(10deg); stroke-dashoffset: 400; }
           to { opacity: 1; transform: translateX(0) rotate(0); stroke-dashoffset: 0; }
        }

        @keyframes spinIn {
           from { opacity: 0; transform: scale(0) rotate(180deg); }
           to { opacity: 1; transform: scale(1) rotate(0); }
        }

        @keyframes flyTopLeft {
           from { opacity: 0; transform: translate(-40px, -40px); }
           to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes flyTopRight {
            from { opacity: 0; transform: translate(40px, -40px); }
            to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes flyBottomLeft {
            from { opacity: 0; transform: translate(-40px, 40px); }
            to { opacity: 1; transform: translate(0, 0); }
        }

        @keyframes sweepLeft {
            from { opacity: 0; transform: translateX(-60px) scale(0.8); }
            to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes sweepRight {
            from { opacity: 0; transform: translateX(60px) scale(0.8); }
            to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes flyFar {
            from { opacity: 0; transform: translateY(60px) scale(0.5); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Fill Animation */
        .flower-art path:not([stroke="#4CAF50"]) {
           transition: fill 2s ease 3s;
        } 
        /* Trigger fill via class or just wait */
        .flower-art:hover path {
            fill: rgba(211, 47, 47, 0.1); stroke: #E57373;
        }

        /* Auto-fill logic replaced by simple hover or transition if needed. 
           Keeping it clean for now. 
        */

        .animate-fade-up {
                    animation: fadeUpSplash 1.5s ease-out forwards;
        }
                .animate-fade-in-slow {
                    animation: fadeIn 2s ease-out 1s forwards;
        }
                @keyframes fadeIn {to {opacity: 1; } }

                @keyframes fadeUpSplash {
                    from {opacity: 0; transform: translateY(20px); }
                to {opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
