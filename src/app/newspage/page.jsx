import { Suspense } from 'react';
import TextCard from '../../components/newscard';
import fetchNews from '../../fetchnews';

export default async function NewsPage() {
  const newsArray = await fetchNews();

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Image */}
      <div className="w-full h-[40vh] relative">
        <img 
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070" 
          alt="News Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto p-4">
        <div className="max-w-[95%] mx-auto space-y-4">
          <h1 className="text-center text-6xl font-bold mt-8 mb-10 bg-gradient-to-r from-sky-600 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Latest News
          </h1>

          <Suspense fallback={<div className="text-center">Loading news...</div>}>
            {newsArray.length === 0 ? (
              <div className="text-center text-xl my-4">
                No news articles available
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {newsArray.map((article, index) => (
                  <TextCard
                    key={index}
                    heading={article.title || 'No Title Available'}
                    subheading={`${article.authorsByline || 'Anonymous'}, ${article.source?.domain || 'Unknown Publisher'}`}
                    bodyText={article.summary || 'No Summary Available'}
                    imageUrl={article.imageUrl || 'https://via.placeholder.com/150'}
                    linkUrl={article.url || '#'}
                  />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}