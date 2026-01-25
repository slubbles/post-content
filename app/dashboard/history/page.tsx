"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Copy,
  RefreshCw,
  Clock,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Search,
  Sparkles,
  MessageSquare,
  List,
  Filter,
  Trash2,
  Image,
  Video,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EmptyState } from "@/components/empty-state"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ConfirmationModal } from "@/components/confirmation-modal"

interface HistoryItem {
  id: string
  content: string
  type: string // Can be: generate, reply, thread, caption, video-script, etc.
  createdAt: string
  metadata?: {
    topic?: string
    platform?: string
    tone?: string
  }
}

const typeConfig: Record<string, { icon: typeof Sparkles; label: string; color: string }> = {
  generate: { icon: Sparkles, label: "Posts", color: "text-primary" },
  reply: { icon: MessageSquare, label: "Replies", color: "text-blue-500" },
  thread: { icon: List, label: "Threads", color: "text-green-500" },
  caption: { icon: Image, label: "Captions", color: "text-purple-500" },
  "video-script": { icon: Video, label: "Video Scripts", color: "text-orange-500" },
}

// Fallback for unknown types
const getTypeConfig = (type: string) => {
  return typeConfig[type] || { icon: FileText, label: "Content", color: "text-gray-500" }
}

const platformIcons: Record<string, typeof Twitter> = {
  twitter: Twitter,
  x: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "generate" | "reply" | "thread">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState<string>("all")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetchHistory()
    }
  }, [status])

  useEffect(() => {
    let filtered = history

    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.type === activeTab)
    }

    if (platformFilter !== "all") {
      filtered = filtered.filter((item) => item.metadata?.platform === platformFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.content.toLowerCase().includes(query) || item.metadata?.topic?.toLowerCase().includes(query) || false,
      )
    }

    setFilteredHistory(filtered)
  }, [history, activeTab, platformFilter, searchQuery])

  const fetchHistory = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/history?limit=100")
      if (response.ok) {
        const data = await response.json()
        // Ensure data.history exists and is an array
        if (data && Array.isArray(data.history)) {
          setHistory(data.history)
        } else {
          setHistory([])
        }
      } else if (response.status === 401) {
        // Unauthorized - redirect to login
        console.error("[v0] History API returned 401: Unauthorized")
        router.push("/login")
      } else {
        // Handle non-ok responses
        console.error("[v0] History API returned error:", response.status)
        setHistory([])
        toast({
          title: "Failed to load history",
          description: "Unable to fetch your generation history.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Failed to fetch history:", error)
      setHistory([])
      toast({
        title: "Failed to load history",
        description: "Unable to fetch your generation history.",
        variant: "destructive",
      })
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

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      const response = await fetch(`/api/history`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemToDelete }),
      })

      if (response.ok) {
        setHistory(history.filter((item) => item.id !== itemToDelete))
        toast({
          title: "Deleted",
          description: "Item removed from history.",
        })
      } else {
        throw new Error("Delete failed")
      }
    } catch (error) {
      console.error("[v0] Delete error:", error)
      toast({
        title: "Delete failed",
        description: "Unable to delete item.",
        variant: "destructive",
      })
    } finally {
      setItemToDelete(null)
      setShowDeleteModal(false)
    }
  }

  const getPlatformIcon = (platform?: string) => {
    if (!platform) return null
    const IconComponent = platformIcons[platform.toLowerCase()]
    return IconComponent ? <IconComponent className="h-3 w-3" /> : null
  }

  const stats = {
    total: history.length,
    generate: history.filter((h) => h.type === "generate").length,
    reply: history.filter((h) => h.type === "reply").length,
    thread: history.filter((h) => h.type === "thread").length,
  }

  // Show loading while checking authentication
  if (status === "loading" || isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">History</h1>
          <p className="mt-2 text-muted-foreground">View and manage all your generated content.</p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="mt-2 text-muted-foreground">View and manage all your generated content.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Posts</p>
          <p className="text-2xl font-bold text-primary">{stats.generate}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Replies</p>
          <p className="text-2xl font-bold text-blue-500">{stats.reply}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Threads</p>
          <p className="text-2xl font-bold text-green-500">{stats.thread}</p>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="twitter">Twitter/X</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="threads">Threads</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={fetchHistory} className="bg-transparent">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="generate">Posts ({stats.generate})</TabsTrigger>
          <TabsTrigger value="reply">Replies ({stats.reply})</TabsTrigger>
          <TabsTrigger value="thread">Threads ({stats.thread})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredHistory.length === 0 ? (
            <Card className="border-dashed">
              <EmptyState
                icon={Sparkles}
                title={searchQuery ? "No results found" : "No history yet"}
                description={
                  searchQuery
                    ? `No items match "${searchQuery}". Try a different search term.`
                    : "Start generating content and it will appear here."
                }
                action={
                  searchQuery
                    ? {
                        label: "Clear Search",
                        onClick: () => setSearchQuery(""),
                      }
                    : undefined
                }
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((item) => {
                const config = getTypeConfig(item.type)
                const TypeIcon = config.icon
                return (
                  <Card
                    key={item.id}
                    className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ${config.color}`}
                      >
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <p className="text-sm leading-relaxed line-clamp-2">{item.content}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {typeConfig[item.type].label}
                          </Badge>
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
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopy(item.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => {
                            setItemToDelete(item.id)
                            setShowDeleteModal(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && (
                <>
                  {(() => {
                    const config = getTypeConfig(selectedItem.type)
                    const TypeIcon = config.icon
                    return <TypeIcon className={`h-5 w-5 ${config.color}`} />
                  })()}
                  {getTypeConfig(selectedItem.type).label} Details
                </>
              )}
            </DialogTitle>
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setItemToDelete(null)
        }}
        onConfirm={handleDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item from your history? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  )
}
