import { VideoScriptGenerator } from "@/components/video-script-generator"

export default function VideoScriptPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Script Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Create compelling video scripts using the hook-story-offer framework for maximum engagement.
        </p>
      </div>

      <VideoScriptGenerator />
    </div>
  )
}
