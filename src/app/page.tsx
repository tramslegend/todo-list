import { Button } from "@/components/ui/button";
import { PROJECT_NAME } from "@/root.config";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="h-svh  grid place-items-center">
      <div className="flex items-center justify-center flex-col">
        <div className="w-32 rounded-full overflow-hidden">
          <Image className="scale-105" src={'/logo.png'} width={300} height={300} alt={PROJECT_NAME} />
        </div>
        <h3 className="text-center text-3xl font-bold my-3">{PROJECT_NAME}</h3>
        <Link href={'/dashboard'}><Button className="cursor-pointer" variant={'outline'} size={'sm'}>Dashboard</Button></Link>
      </div>
    </div>
  );
}
