

// Time ...
export function dayToMillisecond(day: number): number { return day * 86400000 }
export function dayToSecond(day: number): number { return day * 86400 }



// String ...
export function generateSlug(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')      // remove non-word characters except space/hyphen
        .replace(/\s+/g, '-')          // replace spaces with hyphens
        .replace(/-+/g, '-')           // collapse multiple hyphens
        .replace(/^-+|-+$/g, '');      // remove leading/trailing hyphens
}


export function capitalizeFirst(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// Date ... 
export function formatDateToShortMonth(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}


// Array ...
export function findByProperty<T, K extends keyof T>(array: T[], key: K, value: T[K]): T | undefined {
    return array.find(item => item[key] === value);
}