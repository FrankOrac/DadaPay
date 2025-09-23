import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Save, 
  Eye, 
  Send, 
  Upload, 
  X, 
  Plus,
  FileText,
  Image as ImageIcon,
  Clock,
  Tag
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface ArticleData {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_url: string
  category: string
  status: 'draft' | 'review' | 'published' | 'archived'
  read_time: number
  tags: string[]
}

interface ArticleEditorProps {
  articleId?: string
  onSave?: (article: ArticleData) => void
  onCancel?: () => void
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ articleId, onSave, onCancel }) => {
  const { profile, isEditor } = useAuth()
  const [article, setArticle] = useState<ArticleData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_url: '',
    category: '',
    status: 'draft',
    read_time: 1,
    tags: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [newTag, setNewTag] = useState('')

  const categories = [
    'Politics',
    'Technology', 
    'Sports',
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Education',
    'Environment',
    'World News'
  ]

  useEffect(() => {
    if (articleId) {
      loadArticle(articleId)
    }
  }, [articleId])

  useEffect(() => {
    // Auto-generate slug from title
    if (article.title && !articleId) {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setArticle(prev => ({ ...prev, slug }))
    }
  }, [article.title, articleId])

  useEffect(() => {
    // Estimate read time based on content
    const wordsPerMinute = 200
    const wordCount = article.content.split(/\s+/).length
    const estimatedTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
    setArticle(prev => ({ ...prev, read_time: estimatedTime }))
  }, [article.content])

  const loadArticle = async (id: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would fetch from the database
      // For now, using mock data
      const mockArticle: ArticleData = {
        id: id,
        title: 'Sample Article Title',
        slug: 'sample-article-title',
        excerpt: 'This is a sample article excerpt that provides a brief overview of the content.',
        content: 'This is the main content of the article. It contains detailed information about the topic...',
        cover_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        category: 'Technology',
        status: 'draft',
        read_time: 3,
        tags: ['technology', 'innovation', 'future']
      }
      setArticle(mockArticle)
    } catch (error) {
      console.error('Error loading article:', error)
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (newStatus?: typeof article.status) => {
    setIsSaving(true)
    try {
      const articleToSave = {
        ...article,
        status: newStatus || article.status
      }

      // Validation
      if (!articleToSave.title.trim()) {
        toast({
          title: "Validation Error",
          description: "Title is required",
          variant: "destructive"
        })
        return
      }

      if (!articleToSave.content.trim()) {
        toast({
          title: "Validation Error", 
          description: "Content is required",
          variant: "destructive"
        })
        return
      }

      if (!articleToSave.category) {
        toast({
          title: "Validation Error",
          description: "Category is required",
          variant: "destructive"
        })
        return
      }

      // In a real app, this would save to the database
      console.log('Saving article:', articleToSave)

      toast({
        title: "Success",
        description: `Article ${newStatus ? newStatus : 'saved'} successfully`,
      })

      if (onSave) {
        onSave(articleToSave)
      }

    } catch (error) {
      console.error('Error saving article:', error)
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !article.tags.includes(newTag.trim().toLowerCase())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleInputChange = (field: keyof ArticleData, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }))
  }

  if (!isEditor) {
    return (
      <Alert>
        <AlertDescription>
          You don't have permission to edit articles. Editor role required.
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {articleId ? 'Edit Article' : 'Create New Article'}
          </h1>
          <p className="text-gray-600">
            {articleId ? 'Make changes to your article' : 'Write and publish quality content'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={
            article.status === 'published' ? 'default' :
            article.status === 'review' ? 'secondary' :
            article.status === 'draft' ? 'outline' : 'destructive'
          }>
            {article.status}
          </Badge>
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto">
              {article.cover_url && (
                <img 
                  src={article.cover_url} 
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline">{article.category}</Badge>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.read_time} min read
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
              <div className="prose max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              {article.tags.length > 0 && (
                <div className="mt-8 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary">#{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter article title..."
                    value={article.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    placeholder="article-url-slug"
                    value={article.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of the article..."
                    value={article.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your article content here..."
                    value={article.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={20}
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={article.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={article.status} onValueChange={(value) => handleInputChange('status', value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cover_url">Cover Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cover_url"
                      placeholder="https://example.com/image.jpg"
                      value={article.cover_url}
                      onChange={(e) => handleInputChange('cover_url', e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Estimated Read Time</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{article.read_time} minute{article.read_time !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button variant="outline" size="icon" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => handleSave()}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSave('review')}
                  disabled={isSaving}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit for Review
                </Button>
                
                {profile?.role === 'admin' && (
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => handleSave('published')}
                    disabled={isSaving}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                )}
                
                {onCancel && (
                  <Button variant="ghost" className="w-full" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticleEditor