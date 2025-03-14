import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function WeatherMap() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const API_KEY = 'f220c79e0f4c6ea0deb2d22fd7b36274';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const isRaining = () => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      const condition = weatherData.weather[0].main.toLowerCase();
      return condition.includes('rain') || condition.includes('drizzle');
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Weather Section */}
      <View style={styles.weatherContainer}>
        {weatherData ? (
          <>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text style={styles.weather}>{weatherData.weather[0].description}</Text>
            <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
            <Text style={styles.details}>Wind: {weatherData.wind.speed} m/s</Text>
            {weatherData.main.temp < 7 && (
              <Text style={styles.warning}>
                Temperature is too low for Gas-Blow-Back! Electric rifles recommended!
              </Text>
            )}
            {isRaining() && (
              <Text style={styles.warning}>
                Anti-Fog sprays are recommended!
              </Text>
            )}
          </>
        ) : (
          <Text>Click a marker to see the weather!</Text>
        )}
      </View>

      {/* Map Section */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.2827,
          longitude: -123.1207,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        {/* Vancouver Marker */}
        <Marker
          coordinate={{ latitude: 49.2827, longitude: -123.1207 }}
          title="Camouflage International"
          onPress={() => fetchWeather(49.2827, -123.1207)}
        />
        {/* Richmond Marker */}
        <Marker
          coordinate={{ latitude: 49.1666, longitude: -123.1336 }}
          title="Richmond Indoor PaintBall"
          onPress={() => fetchWeather(49.1666, -123.1336)}
        />
        {/* Surrey Marker */}
        <Marker
          coordinate={{ latitude: 49.1913, longitude: -122.8490 }}
          title="Panther PaintBall & AirSoft"
          onPress={() => fetchWeather(49.1913, -122.8490)}
        />
        {/* Burnaby Marker */}
        <Marker
          coordinate={{ latitude: 49.2488, longitude: -122.9805 }}
          title="Camouflage Military"
          onPress={() => fetchWeather(49.2488, -122.9805)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    padding: 10,
    marginTop: 0,
    borderRadius: 10,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    marginVertical: 10,
  },
  weather: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
  warning: {
    fontSize: 15,
    marginTop: 5,
    color: 'blue',
  }
});

