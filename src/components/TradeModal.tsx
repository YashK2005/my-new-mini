import {
    Text,
    Icon,
    IconButton,
    TextField,
    PressableAnimated,
    Image,
    useTheme,
    KeyboardAvoidingView,
    Box,
} from '@shopify/shop-minis-platform-sdk'
import {
    Modal, 
    View, 
    TouchableOpacity, 
    Platform, 
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'
import {useState} from 'react'
import {shareScreenStyles as styles} from '../screens/styles/share-screen.styles'

const MY_PRODUCT = {
    id: '22',
    name: 'Arcteryx Jacket',
    image: 'https://cdn.shopify.com/s/files/1/0078/0333/8829/files/Arcteryx-Beta-Insulated-Jacket-Men-s_BLKSAPPH_1.png?v=1727998098&format=webp&width=1500',
}

interface TradeModalProps {
    isVisible: boolean
    onClose: () => void
    onSubmit: (message: string) => void
    theirProduct: {
        name: string
        image: string
    }
}

export function TradeModal({isVisible, onClose, onSubmit, theirProduct}: TradeModalProps) {
    const theme = useTheme()
    const [message, setMessage] = useState('')

    const handleSubmit = () => {
        Keyboard.dismiss()
        onSubmit(message)
        setMessage('')
        onClose()
    }

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}
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
                                <Text variant="headerBold">Propose Trade</Text>
                                <IconButton
                                    name="close"
                                    size="m"
                                    onPress={onClose}
                                    accessibilityLabel="Close"
                                />
                            </View>

                            <Box style={styles.tradeContainer}>
                                <Box style={styles.productSection}>
                                    <Text variant="bodyLargeBold" style={styles.sectionTitle}>
                                        Getting:
                                    </Text>
                                    <View style={styles.productPreview}>
                                        <Image
                                            source={{uri: theirProduct.image}}
                                            style={styles.productImage}
                                            resizeMode="cover"
                                        />
                                        <Text variant="bodySmall" style={styles.productName}>
                                            {theirProduct.name}
                                        </Text>
                                    </View>
                                </Box>

                                <Box style={styles.exchangeIcon}>
                                    <Icon
                                        name="arrow-down"
                                        size="s"
                                    />
                                </Box>

                                <Box style={styles.productSection}>
                                    <Text variant="bodyLargeBold" style={styles.sectionTitle}>
                                        Sending:
                                    </Text>
                                    <View style={styles.productPreview}>
                                        <Image
                                            source={{uri: MY_PRODUCT.image}}
                                            style={styles.productImage}
                                            resizeMode="cover"
                                        />
                                        <Text variant="bodySmall" style={styles.productName}>
                                            {MY_PRODUCT.name}
                                        </Text>
                                    </View>
                                </Box>
                            </Box>

                            <TextField
                                value={message}
                                onChangeText={setMessage}
                                placeholder="Add a message..."
                                returnKeyType="done"
                                blurOnSubmit={true}
                            />

                            <PressableAnimated
                                onPress={handleSubmit}
                                hapticOnPress
                                bounceOnPress
                                disabled={!message.trim()}
                                style={[
                                    styles.submitButton,
                                    {
                                        backgroundColor: message.trim() 
                                            ? 'action-primary'
                                            : 'action-disabled'
                                    }
                                ]}
                            >
                                <Text 
                                    variant="bodyLargeBold" 
                                    color={message.trim() ? 'foregrounds-regular' : 'foregrounds-subdued'}
                                >
                                    Send Trade Request
                                </Text>
                            </PressableAnimated>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}