import * as Location from 'expo-location';
import { getDistance } from 'geolib';

class LocationService {
    // Request location permissions
    async requestPermissions() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permission to access location was denied');
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // Get current position
    async getCurrentPosition() {
        try {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                return {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    accuracy: location.coords.accuracy,
                };
            } else {
                throw new Error('Current location not obtained');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Get city name from coordinates
    async getCityName(latitude, longitude) {
        try {
            const locations = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            if (locations && locations.length > 0) {
                const location = locations[0];

                // Return city name if available
                if (location.city) {
                    return location.city;
                }

            }
            return 'Unknown area';
        } catch (error) {
            console.log('Error getting location name:', error);
            return 'Unknown area';
        }
    }

    // Calculate distance between current location and event
    calculateDistance(currentLocation, eventLocation) {
        if (!currentLocation || !eventLocation) return null;

        return getDistance(
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: eventLocation.latitude, longitude: eventLocation.longitude }
        );
    }

    // Sort events by distance from current location
    sortEventsByDistance(events, currentLocation) {
        if (!currentLocation) return events;

        return [...events].sort((a, b) => {
            const distanceA = this.calculateDistance(currentLocation, a.coordinates);
            const distanceB = this.calculateDistance(currentLocation, b.coordinates);
            return distanceA - distanceB;
        });
    }
}

export default new LocationService();