import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../src/color';

export default function EventsScreen({ navigation }) {
    const events = [
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
        }
    ];

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

            <View style={styles.eventsContainer}>
                {events.map((event) => (
                    <TouchableOpacity
                        key={event.id}
                        style={styles.eventCard}
                        onPress={() => navigation.navigate('EventDetail', { event })}
                    >
                        <Image source={event.image} style={styles.eventImage} />
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventStatus}>{event.status}</Text>
                            <Text style={styles.eventTitle}>{event.title}</Text>
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
    }
});