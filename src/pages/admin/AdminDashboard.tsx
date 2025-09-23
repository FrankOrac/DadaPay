import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Tables } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Edit,
  Trash2,
  Eye,
  Plus
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

interface DashboardStats {
  totalUsers: number
  totalArticles: number
  totalReads: number
  totalTokensDistributed: number
  articlesPublishedToday: number
  newUsersToday: number
}

const AdminDashboard: React.FC = () => {
  const { profile, isAdmin } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalArticles: 0,
    totalReads: 0,
    totalTokensDistributed: 0,
    articlesPublishedToday: 0,
    newUsersToday: 0
  })
  const [users, setUsers] = useState<Tables<'profiles'>[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData()
    }
  }, [isAdmin])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Load basic stats (mock data for now since we don't have real data yet)
      setStats({
        totalUsers: 1247,
        totalArticles: 89,
        totalReads: 5432,
        totalTokensDistributed: 271600,
        articlesPublishedToday: 3,
        newUsersToday: 12
      })

      // Load users data (mock for now)
      setUsers([
        {
          id: '1',
          user_id: 'user1',
          username: 'john_doe',
          role: 'user',
          tokens: 850,
          avatar_url: null,
          bio: null,
          created_at: '2023-01-15T10:30:00Z',
          updated_at: '2023-01-15T10:30:00Z'
        },
        {
          id: '2',
          user_id: 'user2',
          username: 'jane_smith',
          role: 'editor',
          tokens: 1200,
          avatar_url: null,
          bio: 'Content editor and writer',
          created_at: '2023-02-20T14:45:00Z',
          updated_at: '2023-02-20T14:45:00Z'
        },
        {
          id: '3',
          user_id: 'user3',
          username: 'admin_user',
          role: 'admin',
          tokens: 2500,
          avatar_url: null,
          bio: 'Platform administrator',
          created_at: '2022-12-01T09:00:00Z',
          updated_at: '2022-12-01T09:00:00Z'
        }
      ])

      // Load articles data (using existing article structure)
      setArticles([
        {
          id: '1',
          title: 'Breaking: Major Political Reform Announced',
          status: 'published',
          author: 'Sarah Johnson',
          category: 'Politics',
          reads: 234,
          published_at: '2023-11-20T10:00:00Z'
        },
        {
          id: '2',
          title: 'Tech Giants Report Record Quarterly Earnings',
          status: 'published',
          author: 'Michael Chen',
          category: 'Technology',
          reads: 189,
          published_at: '2023-11-19T15:30:00Z'
        },
        {
          id: '3',
          title: 'Championship Finals Set Record Viewership',
          status: 'review',
          author: 'David Rodriguez',
          category: 'Sports',
          reads: 0,
          published_at: null
        }
      ])

    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      // This would normally update the database
      setUsers(users.map(user => 
        user.user_id === userId ? { ...user, role: newRole as any } : user
      ))
      
      toast({
        title: "User updated",
        description: `User role has been updated to ${newRole}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive"
      })
    }
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert className="max-w-md">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage users, content, and platform analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Admin</Badge>
              <span className="text-sm text-gray-600">Welcome, {profile?.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+{stats.newUsersToday} today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalArticles}</div>
                  <p className="text-xs text-green-600">+{stats.articlesPublishedToday} published today</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reads</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalReads.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tokens Distributed</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{stats.totalTokensDistributed.toLocaleString()}</div>
                  <p className="text-xs text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="text-sm">3 new articles published</span>
                      <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">12 new users registered</span>
                      <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">₦2,500 tokens distributed</span>
                      <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="w-full" onClick={() => setSelectedTab('articles')}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Article
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedTab('users')}>
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedTab('rewards')}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Reward Settings
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setSelectedTab('analytics')}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                    <div>User</div>
                    <div>Role</div>
                    <div>Tokens</div>
                    <div>Joined</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.bio || 'No bio'}</div>
                        </div>
                      </div>
                      <div>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'editor' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="font-medium">₦{user.tokens}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateUserRole(user.user_id, 'admin')}>
                              <Shield className="h-4 w-4 mr-2" />
                              Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateUserRole(user.user_id, 'editor')}>
                              <Edit className="h-4 w-4 mr-2" />
                              Make Editor
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateUserRole(user.user_id, 'user')}>
                              <Users className="h-4 w-4 mr-2" />
                              Make User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage articles, categories, and publishing workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search articles..."
                        className="pl-10 w-80"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Article
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                    <div>Title</div>
                    <div>Author</div>
                    <div>Category</div>
                    <div>Status</div>
                    <div>Reads</div>
                    <div>Actions</div>
                  </div>
                  
                  {articles.map((article) => (
                    <div key={article.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-gray-500">
                          {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Not published'}
                        </div>
                      </div>
                      <div className="text-sm">{article.author}</div>
                      <div>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <div>
                        <Badge variant={
                          article.status === 'published' ? 'default' :
                          article.status === 'review' ? 'secondary' :
                          article.status === 'draft' ? 'outline' : 'destructive'
                        }>
                          {article.status}
                        </Badge>
                      </div>
                      <div className="text-sm">{article.reads} reads</div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Publish
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reward System</CardTitle>
                <CardDescription>Configure reward rules and monitor token distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Reward Rules</h3>
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Article Completion</div>
                          <div className="text-sm text-gray-500">Reward for completing an article</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₦50</div>
                          <Badge variant="default" className="text-xs">Active</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Daily Streak</div>
                          <div className="text-sm text-gray-500">Bonus for reading 3+ articles daily</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₦25</div>
                          <Badge variant="default" className="text-xs">Active</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Referral Bonus</div>
                          <div className="text-sm text-gray-500">Reward for successful referrals</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₦100</div>
                          <Badge variant="secondary" className="text-xs">Inactive</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Rule
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Distribution Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">₦54,300</div>
                          <div className="text-sm text-gray-500">This Month</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">1,086</div>
                          <div className="text-sm text-gray-500">Transactions</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Recent Distributions</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>john_doe completed "Tech Giants Report..."</span>
                          <span className="font-medium text-green-600">+₦50</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>jane_smith completed "Championship Finals..."</span>
                          <span className="font-medium text-green-600">+₦50</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>mike_jones achieved daily streak</span>
                          <span className="font-medium text-green-600">+₦25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Monitor user engagement and platform performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border rounded-lg">
                        <div className="text-center text-gray-500">
                          <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                          <p>Chart visualization would go here</p>
                          <p className="text-sm">Showing user growth over time</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Reading Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border rounded-lg">
                        <div className="text-center text-gray-500">
                          <Activity className="h-12 w-12 mx-auto mb-2" />
                          <p>Chart visualization would go here</p>
                          <p className="text-sm">Showing reading patterns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Technology</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-200 h-2 w-20 rounded-full">
                              <div className="bg-blue-600 h-2 w-16 rounded-full"></div>
                            </div>
                            <span className="text-sm">80%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Politics</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-red-200 h-2 w-20 rounded-full">
                              <div className="bg-red-600 h-2 w-12 rounded-full"></div>
                            </div>
                            <span className="text-sm">60%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Sports</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-green-200 h-2 w-20 rounded-full">
                              <div className="bg-green-600 h-2 w-10 rounded-full"></div>
                            </div>
                            <span className="text-sm">50%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Token Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border rounded-lg">
                        <div className="text-center text-gray-500">
                          <DollarSign className="h-12 w-12 mx-auto mb-2" />
                          <p>Chart visualization would go here</p>
                          <p className="text-sm">Showing token distribution trends</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminDashboard