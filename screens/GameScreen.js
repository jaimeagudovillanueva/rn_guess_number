import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor((Math.random() * (max - min))) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPasGuesses] = useState([initialGuess.toString()]);

    // Usamos useRef en lugar de useState, porque con useState se renderiza el componente cada vez que cambia 
    // el estado y en este caso no queremos que se vuelva a renderizar el componente cuando cambia el valor
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) 
            || direction === 'greater' && currentGuess > userChoice) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', 
                [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPasGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            {/* <ScrollView style={styles.listContainer} contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView> */}
            <FlatList 
                keyExtractor={item => item} 
                data={pastGuesses} 
                // FlatList espera un único argumento pero se pueden bindear más, en este
                // caso pasamos el número de rondas. Los argumentos bindeados se añaden primero
                // y cualquier otro argumento como data se añadiría después como argumento. Por
                // eso el orden de los parámetros en renderListItem 
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                style={styles.listContainer}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '60%',
        marginVertical: 10,
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // Shadow for IOS
        shadowColor: 'black',
        shadowOffset: { width: 0, heigth: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
        // Shadow for Android
        elevation: 4
    }
});

export default GameScreen;