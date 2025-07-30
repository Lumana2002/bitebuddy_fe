export interface WeatherRecommendation {
    item: string;
    count: number;
  }
  
  export async function fetchRecommendations(weatherCondition: string): Promise<WeatherRecommendation[]> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const url = `${apiUrl}/api/recommendations?weatherCondition=${encodeURIComponent(weatherCondition)}`;
      
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add other fetch options as needed
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch recommendations: ${res.statusText}`
        );
      }
  
      return await res.json();
    } catch (error) {
      console.error("Error fetching recommendations:", error instanceof Error ? error.message : error);
      return [];
    }
  }