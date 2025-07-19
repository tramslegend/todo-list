'use client';

import { useEffect, useState } from 'react';

const CIRCLE_COUNT = 8;

const colors = [
    'bg-blue-500/20',
    'bg-pink-400/20',
    'bg-purple-500/20',
    'bg-green-400/20',
    'bg-yellow-300/20',
    'bg-indigo-400/20',
    'bg-red-400/20',
    'bg-cyan-400/20',
];

function getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

interface Circle {
    id: number;
    size: number;
    left: string;
    duration: number;
    delay: number;
    blur: string;
    color: string;
}

export default function FloatingCircles() {
    const [circles, setCircles] = useState<Circle[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: CIRCLE_COUNT }, (_, i) => ({
            id: i,
            size: getRandomValue(40, 100), // px
            left: `${getRandomValue(5, 90)}%`,
            duration: getRandomValue(8, 15),
            delay: getRandomValue(0, 5),
            blur: `blur-${Math.random() > 0.5 ? 'md' : 'lg'}`,
            color: getRandomFromArray(colors),
        }));

        setCircles(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {circles.map((circle) => (
                <span
                    key={circle.id}
                    className={`
            absolute bottom-[-100px] 
            ${circle.color} opacity-5 
            rounded-full ${circle.blur}
            animate-float
          `}
                    style={{
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        left: circle.left,
                        animationDuration: `${circle.duration}s`,
                        animationDelay: `${circle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
