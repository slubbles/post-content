export default function PricingLoading() {
  return (
    <div className="flex-1 mobile-safe-padding py-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
        <div className="space-y-3 text-center">
          <div className="relative mx-auto h-12 w-full max-w-md overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative mx-auto h-6 w-full max-w-lg overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="relative h-10 w-28 overflow-hidden rounded-full bg-muted sm:w-32">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-10 w-28 overflow-hidden rounded-full bg-muted sm:w-32">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6 rounded-xl border border-border bg-card p-4 sm:p-6">
              <div className="space-y-2">
                <div className="relative h-8 w-32 overflow-hidden rounded bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
                <div className="relative h-10 w-40 overflow-hidden rounded bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="relative h-5 w-full overflow-hidden rounded bg-muted">
                    <div className="shimmer absolute inset-0" />
                  </div>
                ))}
              </div>
              <div className="relative h-11 w-full overflow-hidden rounded-full bg-primary/20">
                <div className="shimmer absolute inset-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
