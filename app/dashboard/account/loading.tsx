export default function SettingsLoading() {
  return (
    <div className="flex-1 mobile-safe-padding py-6 md:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-3">
          <div className="relative h-10 w-48 overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-5 w-full max-w-sm overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
              <div className="relative h-6 w-40 overflow-hidden rounded bg-muted">
                <div className="shimmer absolute inset-0" />
              </div>
              <div className="space-y-3">
                <div className="relative h-10 overflow-hidden rounded-lg bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
                <div className="relative h-10 overflow-hidden rounded-lg bg-muted">
                  <div className="shimmer absolute inset-0" />
                </div>
              </div>
            </div>
          ))}

          <div className="relative h-11 w-full overflow-hidden rounded-full bg-primary/20">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
