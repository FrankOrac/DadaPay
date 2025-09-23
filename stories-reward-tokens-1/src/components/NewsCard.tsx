import React from 'react';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: number;
  author: string;
  publishedAt: string;
  onRead: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id, title, excerpt, image, category, readTime, author, publishedAt, onRead
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
         onClick={() => onRead(id)}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>By {author}</span>
          <div className="flex items-center gap-2">
            <span>{readTime} min read</span>
            <span>•</span>
            <span>{publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;