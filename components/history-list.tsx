"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, Trash2, Copy, Check, RotateCcw, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ConfirmationModal } from "@/components/confirmation-modal"

interface HistoryItem {
  id: string
  type: string
  platform: string
  topic: string
  createdAt: string
  posts: string[]
}

export function HistoryList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Fetch history on mount
  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("/api/history")
        if (!response.ok) throw new Error("Failed to fetch history")
        const data = await response.json()
        setHistory(data.history || [])
      } catch (error) {
        console.error("Error fetching history:", error)
        toast({
          title: "Failed to load history",
          description: "Please try refreshing the page.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const handleCopyAll = async (posts: string[], id: string) => {
    const allText = posts.join("\n\n")
    await navigator.clipboard.writeText(allText)
    setCopiedId(id)
    toast({
      title: "Copied to clipboard!",
      description: "All posts copied and ready to paste.",
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch("/api/history", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: itemToDelete }),
        })
        
        if (!response.ok) throw new Error("Failed to delete")
        
        // Remove from local state
        setHistory((prev) => prev.filter((item) => item.id !== itemToDelete))
        
        toast({
          title: "Content deleted",
          description: "The item has been removed from your history.",
        })
      } catch (error) {
        toast({
          title: "Failed to delete",
          description: "Please try again.",
          variant: "destructive",
        })
      } finally {
        setDeleteModalOpen(false)
        setItemToDelete(null)
      }
    }
  }

  const filteredHistory = history.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.posts.some((post) => post.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-lg font-medium">Loading history...</p>
          </CardContent>
        </Card>
      ) : filteredHistory.length === 0 ? (
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-lg font-medium">{searchQuery ? "No results found" : "Nothing here yet"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Your generated content will appear here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="group transition-all duration-200 hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg">{item.topic}</CardTitle>
                    <Badge variant="secondary" className="capitalize">
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {item.platform}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 transition-all hover:scale-110 group-hover:opacity-100"
                    title="Regenerate"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8 transition-all hover:scale-110", copiedId === item.id && "text-green-600")}
                    onClick={() => handleCopyAll(item.posts, item.id)}
                    title="Copy all"
                  >
                    {copiedId === item.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground transition-all hover:scale-110 hover:text-destructive"
                    onClick={() => handleDeleteClick(item.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {item.posts.slice(0, 2).map((post, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-muted/30 p-3 text-sm leading-relaxed transition-colors hover:bg-muted/50"
                    >
                      {post.length > 150 ? `${post.substring(0, 150)}...` : post}
                    </div>
                  ))}
                  {item.posts.length > 2 && (
                    <p className="text-sm font-medium text-muted-foreground">
                      + {item.posts.length - 2} more post{item.posts.length - 2 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete this content?"
        description="This action cannot be undone. The content will be permanently removed from your history."
        confirmText="Delete"
        cancelText="Keep it"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  )
}
