import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CsUtils } from "@/cs-toolkit";

export default function DateTimePicker({
    date,
    setDate,
    disabled = false,
    datetime = false,
    minDate,
    maxDate
}: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    disabled?: boolean;
    datetime?: boolean;
    minDate?: Date;
    maxDate?: Date;
}) {
    const dateRef = useRef<HTMLInputElement>(null);

    const openDatePicker = () => {
        dateRef.current?.showPicker();
    };

    const formatDate = (date?: Date) => {
        if (!date) return "Select Date";
        return datetime
            ? CsUtils.formatDateTime(date)
            : CsUtils.formatDateToShortMonth(date);
    };

    const toInputValue = (d?: Date) => {
        if (!d) return "";
        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        return datetime
            ? local.toISOString().slice(0, 16)
            : local.toISOString().split("T")[0];
    };


    const errorClass = "!border-destructive !text-destructive";
    return (
        <div className="space-y-2 relative">
            <Button
                disabled={disabled}
                onClick={openDatePicker}
                variant="outline"
                className={`w-full flex items-center justify-between mb-0 ${(maxDate && date && date > maxDate) && errorClass} ${(minDate && date && date < minDate) && errorClass}`}
            >
                <span>{formatDate(date)}</span>
                <ChevronsUpDown className="opacity-50" />
            </Button>

            <input
                ref={dateRef}
                type={datetime ? "datetime-local" : "date"}
                className={`absolute top-10 ${datetime ? "left-[calc(50%-12rem)]" : "left-[calc(50%-7rem)]"} w-0 h-0 opacity-0 pointer-events-none`}
                value={toInputValue(date)}
                min={toInputValue(minDate)}
                max={toInputValue(maxDate)}
                onChange={(e) => {
                    const selected = e.target.value
                        ? new Date(e.target.value)
                        : undefined;
                    setDate(selected);
                }}
            />
        </div>
    );
}
