import axios from 'axios';

const accessToken = 'EAAQN3oQcI0ABOxhfVS4y3vYDEar3InFHFsdhrz5mr3fxZBvZB1ZAPWKChlwNVvxqY83ZBmTWTX6CcZCue3NXihKIsJJ8szZBQWkIIqjlKOAqzxEljFZB6YJBHUJZAvZAv4IZCb6ZCtbX7uf0InZBDYmQMEulzzDBPS9s2mgYr3SDZBjfTfZC0WZAWEoN2bE9ZAWXj6UQCqhM'; // ここに認証トークンを入れる
const adSetId = '120223142802020198'; // 対象の広告セットID

async function getAdInsights() {
    try {
        const response = await axios.get(`https://graph.facebook.com/v18.0/${adSetId}/insights`, {
            params: {
                fields: 'impressions,clicks,spend',
                breakdown: 'publisher_platform',
                access_token: accessToken
            }
        });

        console.log(response.data); 
    } catch (error) {
        console.error('APIリクエスト失敗:', error.response ? error.response.data : error.message);
    }
}

getAdInsights();