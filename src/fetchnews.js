// utils/fetchNews.js

async function fetchNews() {
    const url = process.env.NEXT_PUBLIC_NEWS_API_SEARCH;
    const response = await fetch(url);
    const data = await response.json();

    // Return the array of articles, or an empty array if not present
    return data.articles || [];
}

export default fetchNews;
