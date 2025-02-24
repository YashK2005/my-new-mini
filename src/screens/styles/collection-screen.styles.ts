import {StyleSheet} from 'react-native'
import {useMinisDimensions} from '@shopify/shop-minis-platform-sdk'

const {height} = useMinisDimensions()

export const collectionScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: height * 0.08,
      paddingRight: 36,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: 16,
    },
    backButtonText: {
      fontSize: 24,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    headerCounter: {
      fontSize: 20,
      fontWeight: '900',
      color: '#666666',
    },
    contentContainer: {
      height: height * 0.94,
      paddingBottom: 16,
    },
    categorySection: {
      height: height * 0.25,
      marginTop: 8,
    },
    categoryHeaderContainer: {
      paddingTop: 0,
      paddingBottom: 8,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginHorizontal: 16,
    },
    categoryHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginLeft: 12,
    },
    categoryHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryHeaderCounter: {
      fontSize: 18,
      fontWeight: '800',
      color: '#FFFFFF',
      marginLeft: 'auto',
    },
    cardsRow: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingTop: 4,
    },
    card: {
      width: 130,
      height: height * 0.18,
      marginHorizontal: 4,
      padding: 8,
      borderRadius: 12,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardUncollected: {
      opacity: 0.3,
    },
    cardImage: {
      width: '100%',
      height: height * 0.12,
      marginBottom: 4,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    cardTitleUncollected: {
      color: '#666666',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardModal: {
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 16,
      overflow: 'hidden',
      maxHeight: '80%',
      justifyContent: 'center',
    },
    cardModalHeader: {
      alignItems: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#EEEEEE',
      backgroundColor: '#FFFFFF',
    },
    shopifyLogo: {
      width: 100,
      height: 28,
    },
    cardModalImage: {
      width: '100%',
      height: undefined,
      aspectRatio: 745/1040,
      backgroundColor: '#F5F5F5',
      alignSelf: 'center',
      maxHeight: '80%',
    },
    cardModalInfo: {
      padding: 16,
    },
    cardModalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    cardModalDescription: {
      fontSize: 16,
      color: '#666666',
      marginBottom: 12,
    },
    cardModalPrice: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    cardModalButton: {
      backgroundColor: '#008060',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      marginHorizontal: 16,
      marginBottom: 8,
    },
    cardModalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  })
  
