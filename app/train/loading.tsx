export default function TrainLoading() {
  return (
    <div className="flex-1 mobile-safe-padding py-6 md:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <div className="relative h-10 w-full max-w-sm overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-5 w-full max-w-lg overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
                <div className="relative h-4 w-24 overflow-hidden rounded bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="relative h-6 w-48 overflow-hidden rounded bg-muted">
              <div className="shimmer absolute inset-0" />
            </div>
            <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
              <div className="shimmer absolute inset-0" />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="relative h-11 w-full overflow-hidden rounded-full bg-muted sm:w-24">
              <div className="shimmer absolute inset-0" />
            </div>
            <div className="relative h-11 w-full overflow-hidden rounded-full bg-primary/20 sm:w-32">
              <div className="shimmer absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
