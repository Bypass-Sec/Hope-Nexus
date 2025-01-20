import { Suspense } from 'react';
import TextCard from '../../components/newscard';
import fetchNews from '../../fetchnews';

export default async function NewsPage() {
  const newsArray = await fetchNews();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner Image */}
      <div className="w-full h-[40vh] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-950/80 z-1" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="News Banner"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold z-2 text-white text-center">
          Latest News
        </h1>
        <p className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-xl text-slate-200 text-center mt-4 max-w-2xl">
          Stay informed with updates from around the world
        </p>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-[1440px] mx-auto">
          <Suspense fallback={<div className="text-center text-slate-600">Loading news...</div>}>
            {newsArray.length === 0 ? (
              <div className="text-center text-xl text-slate-700 my-4">
                No news articles available
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
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