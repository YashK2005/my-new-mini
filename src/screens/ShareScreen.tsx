import {Box, SafeAreaView, Text, IconButton, PressableAnimated, useTheme} from '@shopify/shop-minis-platform-sdk'
import {useNavigation} from '@react-navigation/native'
import {ScrollView} from 'react-native'

export function ShareScreen() {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors['backgrounds-regular']}}>
        <ScrollView>
            <Box flexDirection="row" padding="m" alignItems="center">
                <IconButton
                name="arrow-left"
                size="m"
                onPress={() => navigation.goBack()}
                accessibilityLabel="Go back"
                />
                <Text variant="headerBold" marginLeft="m">Share</Text>
            </Box>
        </ScrollView>

        <PressableAnimated
                onPress={() => {}}
                hapticOnPress
                bounceOnPress
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: 'action-primary',
                    borderRadius: 100,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <IconButton
                    name="share"
                    size="xl"
                    onPress={() => {}}
                    accessibilityLabel="Share"
                />
            </PressableAnimated>
    </SafeAreaView>
  )
}