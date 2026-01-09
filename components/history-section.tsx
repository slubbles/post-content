"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, RefreshCw, Clock, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface HistoryItem {
  id: string
  content: string
  type: "generate" | "reply" | "thread"
  createdAt: string
  metadata?: {
    topic?: string
    platform?: string
    tone?: string
  }
}

interface HistorySectionProps {
  type: "generate" | "reply" | "thread"
  title?: string
  limit?: number
}

export function HistorySection({ type, title, limit = 10 }: HistorySectionProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchHistory()
  }, [type])

  const fetchHistory = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/history?type=${type}&limit=${limit}`)
      if (response.ok) {
        const data = await response.json()
        setHistory(data.history || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied to clipboard",
        description: "Post content has been copied.",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleReuse = (item: HistoryItem) => {
    const event = new CustomEvent("populateForm", {
      detail: {
        content: item.content,
        metadata: item.metadata,
      },
    })
    window.dispatchEvent(event)

    toast({
      title: "Content loaded",
      description: "Form has been populated with this content.",
    })
  }

  const getPlatformIcon = (platform?: string) => {
    if (platform === "twitter" || platform === "x") {
      return <Twitter className="h-3 w-3" />
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{title || `Recent ${type}s`}</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{title || `Recent ${type}s`}</h2>
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No history yet. {type === "generate" && "Generate your first post to see it here."}
            {type === "reply" && "Create your first reply to see it here."}
            {type === "thread" && "Build your first thread to see it here."}
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title || `Recent ${type}s`}</h2>
        <Button variant="ghost" size="sm" onClick={fetchHistory}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <Card
            key={item.id}
            className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm leading-relaxed line-clamp-2">{item.content}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                  </span>
                  {item.metadata?.platform && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {getPlatformIcon(item.metadata.platform)}
                      {item.metadata.platform}
                    </span>
                  )}
                  {item.metadata?.tone && (
                    <span className="px-2 py-0.5 rounded-full bg-muted">{item.metadata.tone}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(item.content)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleReuse(item)}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {history.length >= limit && (
        <div className="text-center">
          <Button variant="outline" size="sm" onClick={() => setIsViewAllOpen(true)}>
            View All History
          </Button>
        </div>
      )}

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription>
              Created {selectedItem && formatDistanceToNow(new Date(selectedItem.createdAt), { addSuffix: true })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedItem?.content}</p>
            </div>
            {selectedItem?.metadata && (
              <div className="flex gap-2 flex-wrap">
                {selectedItem.metadata.platform && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {getPlatformIcon(selectedItem.metadata.platform)}
                    {selectedItem.metadata.platform}
                  </span>
                )}
                {selectedItem.metadata.tone && (
                  <span className="px-3 py-1 rounded-full bg-muted text-sm">{selectedItem.metadata.tone}</span>
                )}
                {selectedItem.metadata.topic && (
                  <span className="px-3 py-1 rounded-full bg-muted text-sm">Topic: {selectedItem.metadata.topic}</span>
                )}
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => selectedItem && handleCopy(selectedItem.content)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={() => {
                  if (selectedItem) {
                    handleReuse(selectedItem)
                    setSelectedItem(null)
                  }
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reuse
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All {type} History</DialogTitle>
            <DialogDescription>View and manage all your {type} history</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {history.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => {
                  setIsViewAllOpen(false)
                  setSelectedItem(item)
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm leading-relaxed line-clamp-3">{item.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                      {item.metadata?.platform && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {getPlatformIcon(item.metadata.platform)}
                          {item.metadata.platform}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopy(item.content)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
