import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {HomeScreen} from './screens/HomeScreen'

const Stack = createNativeStackNavigator()

export function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GettingStarted.Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
