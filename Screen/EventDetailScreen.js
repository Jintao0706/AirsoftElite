import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import colors from '../src/color';

export default function EventDetailScreen({ route }) {
    const { event } = route.params;
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeather(event.coordinates.latitude, event.coordinates.longitude);
    }, []);

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
        <ScrollView style={styles.container}>
            
            <Image source={event.image} style={styles.eventImage} />

            {/* Event Details */}
            <View style={styles.detailsSection}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.status}>{event.status}</Text>
                <Text style={styles.description}>{event.description}</Text>

                {/* Event Characteristics */}
                <View style={styles.featuresContainer}>
                    <Text style={styles.sectionTitle}>Features:</Text>
                    {event.features.map((feature, index) => (
                        <Text key={index} style={styles.featureItem}>• {feature}</Text>
                    ))}
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address:</Text>
                    <Text style={styles.infoValue}>{event.address}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Hours:</Text>
                    <Text style={styles.infoValue}>{event.hours}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Price:</Text>
                    <Text style={styles.infoValue}>{event.price}</Text>
                </View>
            </View>

            {/* Weather Information */}
            <View style={styles.weatherContainer}>
                <Text style={styles.sectionTitle}>Current Weather</Text>
                {weatherData ? (
                    <>
                        <Text style={styles.city}>{weatherData.name}</Text>
                        <View style={styles.weatherRow}>
                            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
                            <Text style={styles.weather}>{weatherData.weather[0].description}</Text>
                        </View>
                        <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
                        <Text style={styles.details}>Wind: {weatherData.wind.speed} m/s</Text>
                        {weatherData.main.temp < 10 && (
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
                    <Text style={styles.loading}>Loading weather data...</Text>
                )}
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <Text style={styles.sectionTitle}>Location</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: event.coordinates.latitude,
                        longitude: event.coordinates.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    <Marker
                        coordinate={event.coordinates}
                        title={event.title}
                    />
                </MapView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.odgreenLight,
    },
    eventImage: {
        width: '100%',
        height: 250,
    },
    detailsSection: {
        padding: 15,
        backgroundColor: colors.desertLight,
        borderRadius: 10,
        margin: 10,
        shadowColor: colors.odgreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.odgreenLight,
    },
    status: {
        fontSize: 16,
        color: colors.odgreen,
        marginTop: 5,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 10,
        color: colors.odgreen,
    },
    featuresContainer: {
        marginVertical: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.odgreenLight,
    },
    featureItem: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
        color: colors.odgreen,
    },
    infoRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        color: colors.odgreenLight,
    },
    infoValue: {
        fontSize: 16,
        flex: 1,
        color: colors.odgreen,
    },
    weatherContainer: {
        padding: 15,
        backgroundColor: colors.desertLight,
        borderRadius: 10,
        margin: 10,
        shadowColor: colors.odgreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    city: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.odgreenLight,
    },
    temp: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 15,
        color: colors.odgreen,
    },
    weather: {
        fontSize: 18,
        fontStyle: 'italic',
        color: colors.odgreen,
    },
    details: {
        fontSize: 16,
        marginTop: 5,
        color: colors.odgreen,
    },
    warning: {
        fontSize: 15,
        marginTop: 10,
        color: 'red',
        fontWeight: '500',
        backgroundColor: colors.desertLight,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
    },
    loading: {
        fontSize: 16,
        color: colors.odgreen,
        textAlign: 'center',
        marginVertical: 20,
    },
    mapContainer: {
        backgroundColor: colors.desertLight,
        borderRadius: 10,
        margin: 10,
        padding: 15,
        overflow: 'hidden',
        shadowColor: colors.odgreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    map: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
});