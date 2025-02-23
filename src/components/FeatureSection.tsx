import {Image, PressableAnimated, Text} from '@shopify/shop-minis-platform-sdk'
import {ImageRequireSource} from 'react-native'
import {homeScreenStyles as styles} from '../screens/styles/home-screen.styles'

interface FeatureSectionProps {
  image: ImageRequireSource
  title: string
  onPress: () => void
}

export function FeatureSection({image, title, onPress}: FeatureSectionProps) {
  return (
    <>
      <PressableAnimated
        onPress={() => {}}
        style={styles.packButton}
        opacityOnPress
      >
        <Image
          source={image}
          style={styles.packImage}
          resizeMode="contain"
        />
      </PressableAnimated>
      
      <PressableAnimated
        onPress={onPress}
        hapticOnPress
        bounceOnPress
        style={styles.openPackButton}
      >
        <Text variant="bodyLargeBold" color="badge-text-light">
          {title}
        </Text>
      </PressableAnimated>
    </>
  )
}
