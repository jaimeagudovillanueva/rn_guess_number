import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton.android';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/success.png')}
                    // source={{uri: 'https://viajes.nationalgeographic.com.es/medio/2018/02/27/chamonix-francia__1280x720_2.jpg'}}
                    style={styles.image} 
                    resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <Text style={[DefaultStyles.bodyText, styles.resultText]}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text> 
                    rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </Text>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').width * 0.75,
        borderRadius: Dimensions.get('window').width * 0.75 / 2,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: Dimensions.get('window').width / 10,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 14 : 18
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;