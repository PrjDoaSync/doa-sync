"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="hidden md:block shadow-lg cursor-pointer shadow-black/20 bg-[#FFD600] border-none text-[#2E7D32] font-semibold text-[2rem] rounded-sm w-[28vw] h-[8vh]"
      >
        {children}
      </button>

      <button
        type={type}
        onClick={onClick}
        className="block sm:hidden shadow-lg cursor-pointer  shadow-black/20 bg-[#FFD600] border-none text-[#2E7D32] font-semibold text-[2rem] rounded-sm w-[70vw] h-[8vh]"
      >
        {children}
      </button>
    </>
  );
}
