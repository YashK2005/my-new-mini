import {
    Text,
    IconButton,
    useTheme,
    Box,
    Icon,
} from '@shopify/shop-minis-platform-sdk'
import {
    Modal, 
    View, 
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {shareScreenStyles as styles} from '../screens/styles/share-screen.styles'
interface NotificationModalProps {
    isVisible: boolean
    onClose: () => void
}

export function NotificationModal({isVisible, onClose}: NotificationModalProps) {
    const theme = useTheme()

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.modalContainer} 
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity 
                    style={styles.modalContent}
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View style={styles.modalHeader}>
                        <Text variant="headerBold">Notifications</Text>
                        <IconButton
                            name="close"
                            size="m"
                            onPress={onClose}
                            accessibilityLabel="Close"
                        />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}