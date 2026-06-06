import Image from "next/image";

export function BufferLogo({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/BufferLogo.png"
      alt="Buffer logo"
      width={size}
      height={size}
      className="rounded-xl object-cover"
    />
  );
}
