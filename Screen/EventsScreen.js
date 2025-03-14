import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../src/color';

export default function EventsScreen() {
    const events = [
        {
            id: 1,
            title: 'Ambush Airsoft',
            image: require('../photos/ambushAS.jpg'),
            status: 'Outdoor Airsoft & Paintball'
        },
        {
            id: 2,
            title: 'Panther Airsoft',
            image: require('../photos/pantherAS.jpg'),
            status: 'Outdoer Airsoft with CQB section'
        },
        {
            id: 3,
            title: 'Richmond Airsoft',
            image: require('../photos/richmondAS.jpg'),
            status: 'Indoor Airsoft & Paintball for CQB lovers'
        },
        {
            id: 4,
            title: 'Delta Force Airsoft',
            image: require('../photos/deltaforceAS.jpg'),
            status: 'Outdoor Airsoft'
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Vancouver Airsoft Events</Text>

            <View style={styles.eventsContainer}>
                {events.map((event) => (
                    <TouchableOpacity key={event.id} style={styles.eventCard}>
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        marginLeft: 10,
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