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
        style={{ padding: "12px" }}
        className="hidden md:block shadow-lg shadow-black/20 bg-white border-none rounded-sm box-border min-h-[8vh] w-[28vw] placeholder:text-[#2E7D32] placeholder:font-semibold"
      />

      <input
        type={type}
        placeholder={placeholder}
        style={{ padding: "12px" }}
        className="block md:hidden shadow-lg shadow-black/20 bg-white border-none rounded-sm box-border min-h-[8vh] w-[70vw] placeholder:text-[#2E7D32] placeholder:font-semibold"
      />
    </>
  );
}
