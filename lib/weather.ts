export const getWeatherCondition = async (): Promise<string> => {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;
  
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e66413f2cc967b1879131ada729f0aae`
      );
      const weatherData = await weatherRes.json();
      return weatherData.weather[0].main; // e.g., "Clear", "Rain", etc.
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      return "Unknown";
    }
  };
  