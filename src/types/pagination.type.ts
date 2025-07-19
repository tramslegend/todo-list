

export interface IPaginationResult<T> {
    data: T[];
    pagination: {
        totalData: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    };
}