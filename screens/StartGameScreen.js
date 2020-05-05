import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 a 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={DefaultStyles.bodyText}>Select a Number</Text>
                    <Input
                        style={styles.input} 
                        blurOnSubmit 
                        autoCapitalize="none"
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 10
    },
    button: {
        width: 95
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;