import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import NewsCard from './NewsCard';
import { allArticles as articles, Article } from '@/data/articles';
import ArticleModal from './ArticleModal';
import Footer from './Footer';
import StatsSection from './StatsSection';
import { toast } from '@/components/ui/use-toast';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const { user, profile, updateProfile } = useAuth();
  const isMobile = useIsMobile();
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleReadArticle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      setSelectedArticle(article);
    }
  };

  const handleCompleteReading = async (articleId: string) => {
    if (!user || !profile) {
      toast({
        title: "Please login",
        description: "You need to be logged in to earn tokens",
        variant: "destructive"
      });
      return;
    }

    if (!readArticles.has(articleId)) {
      setReadArticles(new Set([...readArticles, articleId]));
      
      // Update user tokens
      const newTokens = (profile.tokens || 0) + 50;
      await updateProfile({ tokens: newTokens });
      
      toast({
        title: "Congratulations! 🎉",
        description: "You earned ₦50 for reading this article!",
      });
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Politics', 'Technology', 'Sports', 'Business', 'Entertainment'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">
              Stay Informed, Get Rewarded
            </h1>
            <p className="text-xl mb-8">
              Read quality news and earn tokens for every article you complete. 
              Join thousands of readers earning while staying informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white text-lg">Welcome back, {profile?.username}!</span>
                  <div className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold">
                    Balance: ₦{profile?.tokens || 0}
                  </div>
                </div>
              ) : (
                <a 
                  href="/login"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block text-center"
                >
                  Start Reading & Earning
                </a>
              )}
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <NewsCard
              key={article.id}
              {...article}
              onRead={handleReadArticle}
            />
          ))}
        </div>
      </div>

      <StatsSection />

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onComplete={handleCompleteReading}
        isLoggedIn={!!user}
      />

      <Footer />
    </div>
  );
};

export default AppLayout;