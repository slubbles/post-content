import { CaptionGenerator } from "@/components/caption-generator"

export default function CaptionPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Caption Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Create engaging captions for Facebook and LinkedIn using the hook-story-offer format.
        </p>
      </div>

      <CaptionGenerator />
    </div>
  )
}
