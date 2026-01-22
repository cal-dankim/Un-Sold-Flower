export interface Shop {
    id: number;
    name: string;
    address: string;
    distance: number; // meters
    thumb: string; // Placeholder for market appearance
    lat: number;
    lng: number;
    description: string;
}

export interface Flower {
    id: number;
    shopId: number;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    grade: 'A' | 'B' | 'C';
    gradeDesc: string;
    reason: string[];
    image: string; // URL
    stock: number;
}

export const SHOPS: Shop[] = [
    {
        id: 1, name: "강남 고속터미널 화훼상가", address: "서울 서초구 신반포로 194", distance: 800,
        thumb: "#2C3E50", // Dark Blue-Grey
        lat: 30, lng: 20,
        description: "새벽 경매 직후 가장 신선한 꽃들이 모이는 국내 최대 도매시장 13번 중도매인."
    },
    {
        id: 2, name: "양재동 화훼공판장", address: "서울 서초구 강남대로 27", distance: 2500,
        thumb: "#556B2F", // Brand Green
        lat: 50, lng: 60,
        description: "전국 각지에서 올라온 다양한 품종을 만날 수 있는 공판장 B동 20호."
    },
    {
        id: 3, name: "남대문 대도꽃종합상가", address: "서울 중구 남대문시장4길 21", distance: 5200,
        thumb: "#8D6E63", // Earthy Brown
        lat: 70, lng: 40,
        description: "오랜 전통을 가진 도심 속 꽃 도매시장, E동 3층 수입꽃 전문."
    },
];

const IMAGES = [
    "/images/IMG_1080.jpg",
    "/images/IMG_1081.jpg",
    "/images/IMG_1082.jpg",
    "/images/IMG_1083.jpg",
    "/images/IMG_1084.jpg",
    "/images/IMG_1087.jpg",
    "/images/IMG_1088.jpg",
];

export const FLOWERS: Flower[] = [
    {
        id: 1, shopId: 1, name: "시안 블루 장미", price: 4500, originalPrice: 15000, discount: 70,
        grade: 'B', gradeDesc: "줄기가 조금 휘었어요", reason: ["줄기 휨", "잎사귀 상처"],
        image: IMAGES[0], stock: 5
    },
    {
        id: 2, shopId: 1, name: "줄리엣 로즈", price: 5000, originalPrice: 20000, discount: 75,
        grade: 'C', gradeDesc: "개화가 많이 진행되었어요", reason: ["개화 80% 진행", "꽃잎 떨어짐"],
        image: IMAGES[1], stock: 2
    },
    {
        id: 3, shopId: 2, name: "유칼립투스 모음", price: 2000, originalPrice: 8000, discount: 75,
        grade: 'B', gradeDesc: "잎 끝이 약간 말랐어요", reason: ["잎 마름", "길이 불일치"],
        image: IMAGES[2], stock: 10
    },
    {
        id: 4, shopId: 2, name: "리시안셔스 핑크", price: 3000, originalPrice: 12000, discount: 75,
        grade: 'A', gradeDesc: "색상이 조금 연해요", reason: ["색상 연함"],
        image: IMAGES[3], stock: 3
    },
    {
        id: 5, shopId: 3, name: "작약 믹스", price: 8000, originalPrice: 25000, discount: 68,
        grade: 'B', gradeDesc: "꽃송이가 작아요", reason: ["사이즈 작음"],
        image: IMAGES[4], stock: 4
    },
    {
        id: 6, shopId: 3, name: "해바라기 한 송이", price: 1500, originalPrice: 6000, discount: 75,
        grade: 'C', gradeDesc: "줄기가 짧아요", reason: ["줄기 짧음"],
        image: IMAGES[5], stock: 8
    },
    {
        id: 7, shopId: 1, name: "안개꽃 다발", price: 4000, originalPrice: 12000, discount: 66,
        grade: 'A', gradeDesc: "포장이 조금 구겨졌어요", reason: ["포장 손상"],
        image: IMAGES[6], stock: 6
    },
];
