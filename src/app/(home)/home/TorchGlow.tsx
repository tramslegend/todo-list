'use client';

export default function TorchGlow() {
    return (
        <div className="absolute  bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none">
            <div className=" w-[500px] h-[500px]  bg-gradient-to-t from-red-500/10 via-green-500/10 to-blue-600/10 rounded-full blur-3xl opacity-50 animate-torchFlicker " />
        </div>
    );
}
