import {StyleSheet} from 'react-native'

export const homeScreenStyles = StyleSheet.create({
  packButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  packImage: {
    width: 340,
    height: 230,
    borderRadius: 16, 
  },
  openPackButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
})