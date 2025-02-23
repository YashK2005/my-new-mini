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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
        maxWidth: 400,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
      productContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        marginBottom: 12,
    },
    productPreview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    productName: {
        marginLeft: 12,
        flex: 1,
    },
    submitButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
})