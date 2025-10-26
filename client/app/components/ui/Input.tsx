 interface InputProps {
  placeholder: string;
  type: string;
}

export default function Input({ placeholder, type }: InputProps) {
  return (
    <>
    <input
      type={type}
      placeholder={placeholder}
      className=" hidden md:block shadow-lg  shadow-black/20 gap-4  bg-white border-none rounded-sm h-[8vh] w-[28vw] placeholder:text-[#2E7D32] placeholder:font-semibold placeholder:p-3 "
    />

    <input
      type={type}
      placeholder={placeholder}
      className=" block md:hidden shadow-lg  shadow-black/20 gap-4 bg-white border-none rounded-sm h-[8vh] w-[70vw] placeholder:text-[#2E7D32] placeholder:font-semibold placeholder:p-3 "
    />
    </>
  );
}