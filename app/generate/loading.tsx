export default function GenerateLoading() {
  return (
    <div className="flex-1 mobile-safe-padding py-6 md:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <div className="relative h-10 w-64 overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-5 w-full max-w-md overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="space-y-2">
            <div className="relative h-5 w-32 overflow-hidden rounded bg-muted">
              <div className="shimmer absolute inset-0" />
            </div>
            <div className="relative h-32 overflow-hidden rounded-lg bg-muted">
              <div className="shimmer absolute inset-0" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="relative h-5 w-24 overflow-hidden rounded bg-muted">
                <div className="shimmer absolute inset-0" />
              </div>
              <div className="relative h-10 overflow-hidden rounded-lg bg-muted">
                <div className="shimmer absolute inset-0" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative h-5 w-24 overflow-hidden rounded bg-muted">
                <div className="shimmer absolute inset-0" />
              </div>
              <div className="relative h-10 overflow-hidden rounded-lg bg-muted">
                <div className="shimmer absolute inset-0" />
              </div>
            </div>
          </div>

          <div className="relative h-12 w-full overflow-hidden rounded-full bg-primary/20">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
