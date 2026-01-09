export default function ThreadLoading() {
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
          <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-10 overflow-hidden rounded-lg bg-muted">
            <div className="shimmer absolute inset-0" />
          </div>
          <div className="relative h-12 w-full overflow-hidden rounded-full bg-primary/20">
            <div className="shimmer absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
