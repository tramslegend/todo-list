'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    query: string;
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
}

export default function PaginationButton({ query, totalPages, limit, setLimit }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        }
    }, [])

    // reset page on change Query
    useEffect(() => {
        if (mounted) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');
            router.push(`?${params.toString()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, mounted]);



    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (page === 1) {
            params.delete('page');
            router.push(`?${params.toString()}`);
        } else {
            params.set('page', page.toString());
            router.push(`?${params.toString()}`);
        }
    };


    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (

        <div className="flex items-center justify-between">
            <div>

            </div>
            <div className="flex gap-2 items-center justify-end mt-6 pb-20">
                <Button
                    size={'sm'}
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <ChevronLeft />
                </Button>

                {pages.map((page) => (
                    <Button
                        size={'sm'}
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    size={'sm'}
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>


    );
}
