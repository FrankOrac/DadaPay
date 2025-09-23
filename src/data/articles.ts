import { additionalArticles } from './moreArticles';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
}


export const articles: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Political Reform Announced',
    excerpt: 'Government unveils comprehensive reform package addressing key economic challenges.',
    content: 'In a landmark announcement today, the government has unveiled a comprehensive reform package that promises to address several key economic challenges facing the nation. The reforms include significant changes to fiscal policy, infrastructure investment, and regulatory frameworks.\n\nThe package, which has been in development for over six months, represents the most significant policy shift in recent years. Key stakeholders from various sectors have been consulted throughout the process.\n\nEconomic experts predict that these reforms could have far-reaching implications for both domestic and international markets. The implementation timeline spans the next 18 months, with initial phases beginning immediately.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b063b88a77f2e024002c88_1756390423216_fa38dfc3.webp',
    category: 'Politics',
    author: 'Sarah Johnson',
    publishedAt: '2 hours ago',
    readTime: 3
  },
  {
    id: '2',
    title: 'Tech Giants Report Record Quarterly Earnings',
    excerpt: 'Major technology companies exceed expectations with strong financial performance.',
    content: 'The technology sector continues to demonstrate remarkable resilience and growth, with several major companies reporting record-breaking quarterly earnings. This performance has exceeded analyst expectations and signals continued strength in the digital economy.\n\nKey drivers of this growth include increased cloud computing adoption, artificial intelligence investments, and sustained demand for digital services. Companies have also benefited from operational efficiency improvements and strategic acquisitions.\n\nInvestors are closely watching how these companies plan to reinvest their profits, particularly in emerging technologies and global expansion initiatives.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b063b88a77f2e024002c88_1756390435140_6ffece0a.webp',
    category: 'Technology',
    author: 'Michael Chen',
    publishedAt: '4 hours ago',
    readTime: 4
  },
  {
    id: '3',
    title: 'Championship Finals Set Record Viewership',
    excerpt: 'Sports fans worldwide tune in for the most-watched championship game in history.',
    content: 'Last night\'s championship game has officially become the most-watched sporting event in television history, with viewership numbers exceeding all previous records. The thrilling match kept audiences engaged throughout, with dramatic moments that will be remembered for years to come.\n\nThe game featured exceptional performances from both teams, with several players achieving career milestones. The final score reflected the competitive nature of the match, with the outcome decided in the final minutes.\n\nBroadcasters report that streaming platforms also saw unprecedented traffic, indicating the growing shift toward digital viewing habits among sports fans.',
    image: 'https://d64gsuwffb70l.cloudfront.net/68b063b88a77f2e024002c88_1756390445020_b46d61e9.webp',
    category: 'Sports',
    author: 'David Rodriguez',
    publishedAt: '6 hours ago',
    readTime: 3
  }
];

// Combine base articles with additional articles
export const allArticles: Article[] = [...articles, ...additionalArticles];