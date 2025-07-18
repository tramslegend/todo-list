'use client';

export default function BottomColorFade() {
    const colors = [
        'bg-red-500',
        'bg-green-500',
        'bg-yellow-400',
        'bg-blue-500',
        'bg-pink-500',
        'bg-purple-500',
        'bg-orange-400',
        'bg-teal-500',
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 h-32 z-0 overflow-hidden pointer-events-none">
            <div className="flex h-full w-full">
                {colors.map((color, i) => (
                    <div
                        key={i}
                        className={`
              ${color} w-full h-full
              animate-opacityFade
              bg-gradient-to-t from-[rgba(255,255,255,0.6)] to-transparent
              transition-opacity duration-[3000ms]
            `}
                    />
                ))}
            </div>
        </div>
    );
}
