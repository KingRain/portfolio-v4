import { LumaSpin } from '@/components/ui/luma-spin';

export default function SiteLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black">
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
        style={{
          backgroundImage: "url('/NoiseFilter.png')",
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <LumaSpin />
        </div>

      </div>
    </div>
  );
}
