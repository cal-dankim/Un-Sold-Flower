import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Sequence: 
    // 0s: Line drawing starts
    // 2.0s: Text appears
    // 3.5s: Button appears
    const textTimer = setTimeout(() => setTextVisible(true), 2000);
    const buttonTimer = setTimeout(() => setShowButton(true), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="flex-center flex-col w-full h-screen bg-[#121212] relative overflow-hidden">

      {/* Rose Animation Container */}
      <div className="relative w-80 h-80 mb-8">
        <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D32F2F" />
              <stop offset="100%" stopColor="#8E0000" />
            </linearGradient>
          </defs>

          <g className="flower-art" fill="none" stroke="#F4F1EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Detailed Stem & Leaves */}
            <path className="draw-path delay-0" d="M256,480 c0,0 -20,-100 0,-180" stroke="#4CAF50" />
            <path className="draw-path delay-1" d="M256,400 c0,0 40,-20 60,-60" stroke="#4CAF50" />
            <path className="draw-path delay-1" d="M256,440 c0,0 -40,-10 -50,-50" stroke="#4CAF50" />

            {/* Detailed Petals - Layered for "sketching" look */}
            {/* Inner Bud */}
            <path className="draw-path delay-2" d="M256,200 c-10,0 -20,10 -20,30 c0,20 20,30 20,30 c20,0 20,-20 20,-30 c0,-20 -10,-30 -20,-30" />
            <path className="draw-path delay-3" d="M236,220 c-10,-20 10,-40 20,-40 c20,0 30,20 20,40" />

            {/* Middle Layers */}
            <path className="draw-path delay-4" d="M256,260 c-30,10 -50,-20 -50,-40 c0,-30 30,-50 50,-50 c30,0 50,20 50,50 c0,30 -20,40 -50,40" />
            <path className="draw-path delay-5" d="M210,210 c-20,20 -20,60 10,80" />
            <path className="draw-path delay-5" d="M300,210 c20,20 20,60 -10,80" />

            {/* Outer Blooming Petals */}
            <path className="draw-path delay-6" d="M256,300 c-40,10 -80,-20 -90,-60 c-5,-30 10,-60 40,-80" />
            <path className="draw-path delay-6" d="M256,300 c40,10 80,-20 90,-60 c5,-30 -10,-60 -40,-80" />
            <path className="draw-path delay-7" d="M180,180 c-20,40 -10,100 40,130" />
            <path className="draw-path delay-7" d="M330,180 c20,40 10,100 -40,130" />
          </g>
        </svg>
      </div>

      {/* App Name & Slogan */}
      <div className="text-center z-10 flex flex-col items-center justify-center space-y-4">
        {textVisible && (
          <div className="animate-fade-up">
            <h1 className="font-head text-4xl text-white font-bold tracking-widest mb-4">Un Sold Flower</h1>
            <p className="font-body text-white/70 text-sm font-light tracking-wide leading-7">
              팔지 않는 꽃을 팝니다.<br />
              가장 아름다운 마음으로,
            </p>
          </div>
        )}
      </div>

      {/* Button */}
      <div className={`mt-16 transition-all duration-1000 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
          onClick={() => navigate('/home')}
          className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
        >
          {/* Border Gradient */}
          <div className="absolute inset-0 border-2 border-white/80 rounded-full group-hover:border-white transition-colors"></div>

          {/* Hover Fill */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>

          <span className="relative font-bold text-white tracking-widest group-hover:text-white transition-colors">
            꽃 만나러 가기
          </span>
        </button>
      </div>

      <style>{`
        .draw-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Staggered starts */
        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.5s; }
        .delay-3 { animation-delay: 0.7s; }
        .delay-4 { animation-delay: 0.9s; }
        .delay-5 { animation-delay: 1.1s; }
        .delay-6 { animation-delay: 1.3s; }
        .delay-7 { animation-delay: 1.5s; }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        .flower-art path {
          transition: fill 1s ease 2.5s, stroke-width 0.5s ease;
        }
        
        /* Subtle fill after drawing */
        .flower-art path:not([stroke="#4CAF50"]) {
           animation: draw 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, fillRose 2s ease forwards 2.5s;
        }

        @keyframes fillRose {
           to { fill: rgba(211, 47, 47, 0.1); stroke: #E57373; }
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default IntroPage;
