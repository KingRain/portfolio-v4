export function SectionSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`w-full ${height} animate-pulse`}>
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mx-auto mb-8 h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
