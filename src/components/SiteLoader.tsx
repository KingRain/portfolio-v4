import { bricolage_grotesque } from '@/utils/fonts';

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
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-2xl animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <span className={`text-2xl font-bold ${bricolage_grotesque}`}>SJ</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className={`text-lg font-semibold tracking-tight ${bricolage_grotesque}`}>
            Sam Joe
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Loading portfolio...
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-gray-900 dark:bg-white animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div className="site-loader-bar h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
        </div>
      </div>
    </div>
  );
}
