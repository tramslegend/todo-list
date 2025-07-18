import clsx from 'clsx'
import React from 'react'

export default function PlusIcon({ className, lineClass, size = 20 }: { size?: number, lineClass?: string, className?: string }) {
    return (
        <div className={className}>
            <div className="relative  aspect-square" style={{ width: size }}>
                {/* Horizontal line */}
                <div className={clsx("absolute top-1/2 left-0 w-full h-[0.5px] bg-muted-foreground transform -translate-y-1/2", lineClass)} />

                {/* Vertical line */}
                <div className={clsx("absolute left-1/2 top-0 h-full w-[0.5px] bg-muted-foreground transform -translate-x-1/2", lineClass)} />
            </div>
        </div>
    )
}
