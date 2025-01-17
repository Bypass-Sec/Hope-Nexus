import { cookies } from 'next/headers';

async function fetchNews() {
    try {
        const cookieStore = cookies();
        const token = await cookieStore.get('sb-ocwpaeocgsbqbiveglvn-auth-token');
        
        const url = process.env.NEXT_PUBLIC_NEWS_API_SEARCH;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token?.value || ''}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('Error in fetchNews:', error);
        return [];
    }
}

export default fetchNews;
