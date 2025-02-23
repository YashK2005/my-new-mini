import {StyleSheet} from 'react-native'

export const shareScreenStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    cardName: {
        marginTop: 4,
        textAlign: 'center',
    },
    tradeButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 8,
    },
})