import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (articleId: string) => void;
  isLoggedIn: boolean;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ 
  article, isOpen, onClose, onComplete, isLoggedIn 
}) => {
  const [readProgress, setReadProgress] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && article) {
      setStartTime(Date.now());
      setReadProgress(0);
    }
  }, [isOpen, article]);

  useEffect(() => {
    if (!isOpen || !startTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / (article!.readTime * 60 * 1000)) * 100, 100);
      setReadProgress(progress);

      if (progress >= 100 && isLoggedIn) {
        onComplete(article!.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isOpen, article, onComplete, isLoggedIn]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
              {article.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {article.readTime} min read
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoggedIn && (
          <div className="bg-gray-100 p-2">
            <div className="flex justify-between items-center text-sm">
              <span>Reading Progress</span>
              <span>{Math.round(readProgress)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${readProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>By {article.author}</span>
              <span className="mx-2">•</span>
              <span>{article.publishedAt}</span>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;