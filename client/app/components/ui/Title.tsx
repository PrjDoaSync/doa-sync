
import { ReactNode } from "react";

interface TitleProps {
    children: ReactNode;
}


export default function Title ({ children }: TitleProps){
  return (
    <h1 className="text-white font-semibold  text-[1.5rem] md:text-[2.5rem]">
        { children }
    </h1>
  );
}