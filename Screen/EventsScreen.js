import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import colors from '../src/color';
import LocationService from './LocationService';

export default function EventsScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortByDistance, setSortByDistance] = useState(false);
    const [locationError, setLocationError] = useState(null);

    const originalEvents = [
        {
            id: 1,
            title: 'Ambush Airsoft',
            image: require('../src/photos/ambushAS.jpg'),
            status: 'Outdoor Airsoft & Paintball',
            description: 'Experience tactical combat in our expansive outdoor field with natural cover, bunkers, and objective-based missions. Perfect for both beginner and experienced players.',
            features: [
                'Large outdoor field',
                'Multiple game modes',
                'Rental equipment available',
                'Free parking'
            ],
            address: '7550 160 St, Surrey, BC',
            hours: 'Sat-Sun: 7:15AM-10:30PM',
            price: '$35 entry fee, $20 equipment rental',
            coordinates: { latitude: 49.1377, longitude: -122.7775 }
        },
        {
            id: 2,
            title: 'Panther Airsoft',
            image: require('../src/photos/pantherAS.jpg'),
            status: 'Outdoor Airsoft with CQB section',
            description: 'Panther Airsoft offers the best of both worlds with extensive outdoor terrain and a dedicated CQB section for close-quarters tactical training and gameplay.',
            features: [
                'Mixed terrain environment',
                'Dedicated CQB building',
                'Team-based scenarios',
                'Professional referees',
                'Pro shop on premises'
            ],
            address: '19022 16 Ave, Surrey, BC',
            hours: 'Fri: 4PM-10PM, Sat-Sun: 10AM-6PM',
            price: '$40 entry fee, $30 equipment rental',
            coordinates: { latitude: 49.0277, longitude: -122.6961 }
        },
        {
            id: 3,
            title: 'Richmond Airsoft',
            image: require('../src/photos/richmondAS.jpg'),
            status: 'Indoor Airsoft & Paintball for CQB lovers',
            description: 'Richmond Airsoft is the premier indoor facility featuring multi-level playing areas, urban-style structures, and climate-controlled environment for year-round gameplay.',
            features: [
                'Indoor climate-controlled facility',
                'Multi-level playing field',
                'Monthly tournaments',
                'Intense CQB with team-based scenarios'
            ],
            address: '6631 Westminster Hwy #160, Richmond, BC',
            hours: 'Wed-Fri: 5PM-11PM, Sat-Sun: 11AM-11PM',
            price: '$30 entry fee, $20 equipment rental',
            coordinates: { latitude: 49.1718, longitude: -123.1542 }
        },
        {
            id: 4,
            title: 'Delta Force Airsoft',
            image: require('../src/photos/deltaforceAS.jpg'),
            status: 'Outdoor Airsoft',
            description: 'Delta Force offers military-style missions on our expansive outdoor terrain with custom-built structures, bunkers, and varied landscape for dynamic gameplay scenarios.',
            features: [
                'Largest outdoor field in BC',
                'Military simulation events',
                'Full-day operations',
                'Experienced staff',
            ],
            address: '25927 128 Ave, Maple Ridge, BC',
            hours: 'Sat-Sun: 8AM-6PM',
            price: '$45 full day, $25 half day, $25 equipment rental',
            coordinates: { latitude: 49.2357, longitude: -122.5036 }
        },
        {
            id: 5,
            title: 'Hotel Fictional',
            image: require('../src/photos/hotel.jpg'),
            status: 'Indoor CQB',
            description: 'Hotel offers high-intensity close-quarters battle experiences in an abandoned hotel, featuring multiple buildings, and tactical scenarios designed for fast-paced action.',
            features: [
                'Night operations with tactical lighting',
                'Professional sound system',
                'Multiple game modes',
                'Tactical blindages applied'
            ],
            address: '17475 56 Ave, Surrey, BC',
            hours: 'Fri: 5PM-11PM, Sat-Sun: 9AM-4PM',
            price: '$30 entry, No equipment rental',
            coordinates: { latitude: 49.1051, longitude: -122.7391 }
        },

        {
            id: 6,
            title: 'Army Battelfield Fictional',
            image: require('../src/photos/armyBattelfield.jpg'),
            status: 'Woodland Scenario Play',
            description: 'Army Battelfield provides immersive woodland combat scenarios across 120 acres of dense forest terrain featuring natural cover, streams, hills, and strategically placed structures for authentic wilderness engagement.',
            features: [
                'Diverse terrain environments',
                'Weekend-long operations',
                'Camping available on-site',
                'Wilderness survival challenges'
            ],
            address: '14072 104 Ave, Surrey, BC',
            hours: 'Sat-Sun: 9AM-5PM, Special events: Fri-Sun',
            price: '$50 full day, $90 weekend pass, $35 equipment rental',
            coordinates: { latitude: 49.1913, longitude: -122.8321 }
        },
        {
            id: 7,
            title: 'Black Ops Fictional',
            image: require('../src/photos/blackOps.jpg'),
            status: 'Hybrid Indoor/Outdoor',
            description: 'Black Ops combines both indoor and outdoor playing fields with seamless transitions between environments, featuring a 30,000 sq ft facility connected to 15 acres of tactical terrain for versatile gameplay.',
            features: [
                'Weather-independent gameplay',
                'Realistic mission objectives',
                'On-site pro shop and repairs',
                'Advanced tracking system'
            ],
            address: '814 Weston St, Coquitlam, BC',
            hours: 'Thurs-Fri: 4PM-10PM, Sat-Sun: 9AM-8PM',
            price: '$40 standard entry, $65 all-access pass, $30 equipment rental',
            coordinates: { latitude: 49.2645, longitude: -122.8493 }
        }
    ];

    // Function to get current location
    const getCurrentLocation = async () => {
        setLoading(true);
        setLocationError(null);
        setCityName('');

        try {
            // First request permissions
            const hasPermission = await LocationService.requestPermissions();

            if (!hasPermission) {
                setLocationError('Location permission denied');
                setEvents(originalEvents);
                setLoading(false);
                return;
            }

            // Get current location
            const location = await LocationService.getCurrentPosition();
            setCurrentLocation(location);

            // Get city name
            const city = await LocationService.getCityName(
                location.latitude,
                location.longitude
            );
            setCityName(city);

            // Add distance to each event
            const eventsWithDistance = originalEvents.map(event => {
                const distance = LocationService.calculateDistance(location, event.coordinates);
                return {
                    ...event,
                    distance: distance ? (distance / 1000).toFixed(1) : null // Convert to km
                };
            });

            setEvents(eventsWithDistance);
        } catch (error) {
            console.error("Error getting location:", error);
            setLocationError(error.message || 'Error getting location');
            setEvents(originalEvents);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const toggleSortByDistance = () => {
        if (currentLocation) {
            if (sortByDistance) {
                // Reset to original order
                setEvents(originalEvents.map(event => {
                    const distance = LocationService.calculateDistance(currentLocation, event.coordinates);
                    return {
                        ...event,
                        distance: distance ? (distance / 1000).toFixed(1) : null
                    };
                }));
            } else {
                // Sort by distance
                setEvents(LocationService.sortEventsByDistance(events, currentLocation));
            }
            setSortByDistance(!sortByDistance);
        } else {
            Alert.alert(
                "Location Not Available",
                "Enable location services to sort by distance."
            );
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.odgreen} />
                <Text style={styles.loadingText}>Finding your location...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../src/photos/trident.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appName}>Airsoft Elite</Text>
            </View>

            {/* Location Information */}
            <View style={styles.locationContainer}>
                {currentLocation ? (
                    <>
                        <Text style={styles.locationTitle}>Your Current Location:</Text>
                        <Text style={styles.locationText}>
                            {cityName || 'Unknown area'}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.locationError}>
                        {locationError || 'Location not available'}
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={getCurrentLocation}
                >
                    <Text style={styles.refreshButtonText}>
                        Refresh Location
                    </Text>
                </TouchableOpacity>
            </View>

            {currentLocation && (
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={toggleSortByDistance}
                >
                    <Text style={styles.sortButtonText}>
                        {sortByDistance ? "Reset Order" : "Sort by Distance"}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.eventsContainer}>
                {events.map((event) => (
                    <TouchableOpacity
                        key={event.id}
                        style={styles.eventCard}
                        onPress={() => navigation.navigate('EventDetail', {
                            event,
                            userLocation: currentLocation,
                            userCityName: cityName
                        })}
                    >
                        <Image source={event.image} style={styles.eventImage} />
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventStatus}>{event.status}</Text>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            {event.distance && (
                                <Text style={styles.distanceText}>
                                    {event.distance} km away
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.odgreenLight,
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10,
    },
    logo: {
        width: 400,
        height: 400,
        marginVertical: -50,
    },
    appName: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.desertLight,
    },
    locationContainer: {
        backgroundColor: colors.desertLight,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    locationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.odgreen,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 16,
        color: colors.odgreen,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    locationError: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    refreshButton: {
        backgroundColor: colors.odgreen,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    refreshButtonText: {
        color: colors.desertLight,
        fontWeight: 'bold',
    },
    eventsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    eventCard: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: colors.desertLight,
    },
    eventImage: {
        width: '100%',
        height: 200,
    },
    eventInfo: {
        padding: 10,
    },
    eventStatus: {
        fontSize: 14,
        color: colors.odgreen,
        marginBottom: 5,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.odgreenLight,
    },
    distanceText: {
        fontSize: 14,
        color: colors.odgreen,
        marginTop: 5,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.odgreenLight,
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.desertLight,
    },
    sortButton: {
        backgroundColor: colors.odgreen,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    sortButtonText: {
        color: colors.desertLight,
        fontWeight: 'bold',
    }
});