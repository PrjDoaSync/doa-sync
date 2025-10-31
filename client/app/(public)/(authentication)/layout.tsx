import Image from "next/image";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* // desktop */}
      <main className="min-h-screen hidden md:flex ">
        <div className=" gap-10 bg-[#2E7D32] h-screen w-[42vw] justify-center items-center flex flex-col shadow-xl shadow-black ">
          {children}
        </div>

        <div className="flex h-screen w-[58vw] items-center justify-center">
          <img src="/logo.png" width={500} />
        </div>
      </main>

      {/* // mobile  */}
      <main className="flex flex-col h-screen md:hidden">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="logo" width={200} height={100} />
        </div>
        <div className=" gap-7 bg-[#2E7D32] h-screen w-screen justify-center items-center flex flex-col ">
          {children}
        </div>
      </main>
    </>
  );
}
