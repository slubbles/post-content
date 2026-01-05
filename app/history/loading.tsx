export default function HistoryLoading() {
  return (
    <div className="flex-1 mobile-safe-padding py-6 md:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <div className="relative h-10 w-full max-w-xs overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-5 w-full max-w-md overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative h-9 w-20 overflow-hidden rounded-full bg-muted">
              <div className="shimmer absolute inset-0" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border bg-card p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="relative h-6 w-3/4 overflow-hidden rounded bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                  <div className="relative h-4 w-32 overflow-hidden rounded bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                  <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
