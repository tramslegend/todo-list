
export function CsRoleItem({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <span className='border rounded px-1 text-xs '>
            {children}
        </span>
    )
}