import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function DatePicker2({
    date,
    setDate,
}: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}) {
    const dateRef = useRef<HTMLInputElement>(null);

    const openDatePicker = () => {
        dateRef.current?.showPicker();
    };

    // Format date as dd/mm/yyyy
    const formatDate = (date?: Date) => {
        if (!date) return "Select Date";
        return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    };

    return (
        <div className="space-y-2 relative">
            <Button
                onClick={openDatePicker}
                variant={"outline"}
                className="w-full flex items-center justify-between"
            >
                <span>{formatDate(date)}</span>
                <span>
                    <ChevronsUpDown className="opacity-50" />
                </span>
            </Button>

            <input
                ref={dateRef}
                type="date"
                className="absolute top-10 left-[calc(50%-7rem)] w-0 h-0 opacity-0 pointer-events-none"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                    const selected = e.target.value ? new Date(e.target.value) : undefined;
                    setDate(selected);
                }}
            />
        </div>
    );
}
