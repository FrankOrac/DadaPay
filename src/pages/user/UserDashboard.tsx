import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Tables } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Award,
  Target,
  Clock,
  Edit,
  Save,
  Trophy,
  Flame,
  Eye,
  Star
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface UserStats {
  totalReads: number
  totalTokensEarned: number
  currentStreak: number
  favoriteCategory: string
  averageReadTime: number
  articlesThisWeek: number
}

interface ReadingHistory {
  id: string
  articleTitle: string
  category: string
  readDate: string
  tokensEarned: number
  readTime: number
}

const UserDashboard: React.FC = () => {
  const { user, profile, updateProfile } = useAuth()
  const [stats, setStats] = useState<UserStats>({
    totalReads: 0,
    totalTokensEarned: 0,
    currentStreak: 0,
    favoriteCategory: '',
    averageReadTime: 0,
    articlesThisWeek: 0
  })
  const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: profile?.username || '',
    bio: profile?.bio || ''
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user && profile) {
      loadUserData()
    }
  }, [user, profile])

  const loadUserData = async () => {
    setIsLoading(true)
    try {
      // Load user stats (mock data for now)
      setStats({
        totalReads: 47,
        totalTokensEarned: 2350,
        currentStreak: 5,
        favoriteCategory: 'Technology',
        averageReadTime: 3.2,
        articlesThisWeek: 12
      })

      // Load reading history (mock data)
      setReadingHistory([
        {
          id: '1',
          articleTitle: 'Breaking: Major Political Reform Announced',
          category: 'Politics',
          readDate: '2023-11-20T10:30:00Z',
          tokensEarned: 50,
          readTime: 3
        },
        {
          id: '2',
          articleTitle: 'Tech Giants Report Record Quarterly Earnings',
          category: 'Technology',
          readDate: '2023-11-19T15:45:00Z',
          tokensEarned: 50,
          readTime: 4
        },
        {
          id: '3',
          articleTitle: 'Championship Finals Set Record Viewership',
          category: 'Sports',
          readDate: '2023-11-18T20:15:00Z',
          tokensEarned: 50,
          readTime: 3
        },
        {
          id: '4',
          articleTitle: 'Climate Change Summit Reaches Historic Agreement',
          category: 'Politics',
          readDate: '2023-11-17T11:20:00Z',
          tokensEarned: 50,
          readTime: 5
        },
        {
          id: '5',
          articleTitle: 'AI Revolution in Healthcare Shows Promise',
          category: 'Technology',
          readDate: '2023-11-16T14:30:00Z',
          tokensEarned: 75, // Bonus for streak
          readTime: 4
        }
      ])

      setEditForm({
        username: profile?.username || '',
        bio: profile?.bio || ''
      })

    } catch (error) {
      console.error('Error loading user data:', error)
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        username: editForm.username,
        bio: editForm.bio
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const weeklyGoal = 15
  const weeklyProgress = (stats.articlesThisWeek / weeklyGoal) * 100

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
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-lg">
                  {profile?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.username}!</h1>
                <p className="text-gray-600 mt-1">Keep reading to earn more tokens and build your streak</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₦{profile?.tokens}</div>
                <div className="text-sm text-gray-500">Current Balance</div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-semibold">{stats.currentStreak}</span>
                <span className="text-sm text-gray-500">day streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Reading History</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles Read</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalReads}</div>
                  <p className="text-xs text-green-600">+{stats.articlesThisWeek} this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tokens Earned</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{stats.totalTokensEarned}</div>
                  <p className="text-xs text-green-600">+₦350 this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.currentStreak} days</div>
                  <p className="text-xs text-blue-600">Keep it going!</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageReadTime} min</div>
                  <p className="text-xs text-gray-600">Per article</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Goal Progress</CardTitle>
                  <CardDescription>Read {weeklyGoal} articles this week to earn a bonus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {stats.articlesThisWeek} of {weeklyGoal} articles
                      </span>
                      <span className="text-sm text-gray-500">
                        {Math.round(weeklyProgress)}% complete
                      </span>
                    </div>
                    <Progress value={weeklyProgress} className="h-3" />
                    {weeklyProgress >= 100 ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">Goal achieved! Bonus: ₦100</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        {weeklyGoal - stats.articlesThisWeek} more articles to reach your goal
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">First Article</div>
                        <div className="text-xs text-gray-500">Read your first article</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Flame className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">5-Day Streak</div>
                        <div className="text-xs text-gray-500">Read for 5 consecutive days</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">25 Articles</div>
                        <div className="text-xs text-gray-500">Read 25 articles total</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Weekly Champion</div>
                        <div className="text-xs text-gray-500">Complete weekly goal</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Reading Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.favoriteCategory}</div>
                    <div className="text-sm text-gray-600">Favorite Category</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                    <div className="text-sm text-gray-600">Most Active Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading History</CardTitle>
                <CardDescription>Track all the articles you've read and tokens earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {readingHistory.map((read) => (
                    <div key={read.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium">{read.articleTitle}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-4">
                            <span>
                              <Badge variant="outline" className="text-xs">{read.category}</Badge>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {read.readTime} min read
                            </span>
                            <span>{new Date(read.readDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">+₦{read.tokensEarned}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(read.readDate).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Today's Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">₦150</div>
                  <p className="text-sm text-gray-600">3 articles completed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">₦600</div>
                  <p className="text-sm text-gray-600">12 articles completed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">₦2,350</div>
                  <p className="text-sm text-gray-600">47 articles completed</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Article Completions</span>
                    </div>
                    <span className="font-bold text-green-600">₦2,200</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Flame className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Streak Bonuses</span>
                    </div>
                    <span className="font-bold text-orange-600">₦100</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Weekly Goals</span>
                    </div>
                    <span className="font-bold text-purple-600">₦50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="text-2xl">
                        {profile?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: Square image, at least 200x200px
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user?.email || ''}
                          disabled
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={profile?.role || ''}
                          disabled
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <Label>Member Since</Label>
                        <div className="text-sm text-gray-600 mt-1">
                          {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Last updated: {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserDashboard