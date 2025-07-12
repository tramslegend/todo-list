import { LoaderIcon } from "lucide-react";


export default function SpinLoader() {
    return (
        <div className="w-full h-[20rem] grid place-items-center">
            <LoaderIcon className="animate-spin" />
        </div>
    )
}
