import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState, useEffect} from 'react'

const STORAGE_KEY = '@collected_cards'

export function useCollectedCards() {
  const [collectedCardIds, setCollectedCardIds] = useState<string[]>([])

  useEffect(() => {
    loadCollectedCards()
  }, [])

  const loadCollectedCards = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCollectedCardIds(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading collected cards:', error)
    }
  }

  const clearCollectedCards = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
      setCollectedCardIds([])
    } catch (error) {
      console.error('Error clearing collected cards:', error)
    }
  }
  

  const addCollectedCard = async (cardId: string) => {
    try {
      // First get existing cards
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      let existingCards = stored ? JSON.parse(stored) : []
      
      // Add new card if it doesn't exist already
      if (!existingCards.includes(cardId)) {
        existingCards.push(cardId)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existingCards))
        setCollectedCardIds(existingCards)
      }
    } catch (error) {
      console.error('Error adding collected card:', error)
    }
  }

  return {
    collectedCardIds,
    addCollectedCard,
    clearCollectedCards,
  }
} 
