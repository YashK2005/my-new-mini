import {useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {
  Box,
  SafeAreaView,
  Text,
  PressableAnimated,
  useTheme,
  Image,
  Divider,
} from '@shopify/shop-minis-platform-sdk'

import {RootStackParamList} from '../types/screens'
import { homeScreenStyles as styles } from './styles/home-screen.styles'
import pack from '../assets/packs.jpg'
import binder from '../assets/binder.jpg'
import social from '../assets/social.jpg'

export function HomeScreen() {
  const theme = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
      >
        <Box flex={1} justifyContent="center" alignItems="center">

          <Box width="100%" paddingHorizontal="xl" marginTop="xs-s" marginBottom="xs-s" justifyContent="center" alignItems="center">
            <Text variant="headerBold" color="foregrounds-regular">
              Welcome to ShoPacks!
            </Text>
          </Box> 

          <Box width="100%" paddingHorizontal="xl">
            <Divider />
          </Box>
          
          <PressableAnimated
            onPress={() => {}}
            style={styles.packButton}
            opacityOnPress
          >
            <Image
              source={pack}
              style={styles.packImage}
              resizeMode="contain"
            />
          </PressableAnimated>
          
          <PressableAnimated
            onPress={() => {}}
            hapticOnPress
            bounceOnPress
            style={styles.openPackButton}
          >
            <Text variant="bodyLargeBold" color="badge-text-light">
              Open Pack
            </Text>
          </PressableAnimated>

          <Box width="100%" paddingHorizontal="xl">
            <Divider />
          </Box>

          <PressableAnimated
            onPress={() => {}}
            style={styles.packButton}
            opacityOnPress
          >
            <Image
              source={binder}
              style={styles.packImage}
              resizeMode="contain"
            />
          </PressableAnimated>
          
          <PressableAnimated
            onPress={() => {}}
            hapticOnPress
            bounceOnPress
            style={styles.openPackButton}
          >
            <Text variant="bodyLargeBold" color="badge-text-light">
              Shopidex
            </Text>
          </PressableAnimated>

          <Box width="100%" paddingHorizontal="xl">
            <Divider/>
          </Box>

          <PressableAnimated
            onPress={() => {}}
            style={styles.packButton}
            opacityOnPress
          >
            <Image
              source={social}
              style={styles.packImage}
              resizeMode="contain"
            />
          </PressableAnimated>
          
          <PressableAnimated
            onPress={() => {}}
            hapticOnPress
            bounceOnPress
            style={styles.openPackButton}
          >
            <Text variant="bodyLargeBold" color="badge-text-light">
              Share
            </Text>
          </PressableAnimated>
        </Box>  
      </ScrollView>
    </SafeAreaView>
  )
}