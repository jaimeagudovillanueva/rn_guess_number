import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors';

const Header = props => {
    return (
        <View style={{
            ...styles.headerBase, 
            ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}
        }>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 80,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color: 'white'
    }
});

export default Header;