import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

interface ProductImageProps {
    product: {
        name: string;
        imageUrl: string;
    };
}

export default function ProductImage({ product }: ProductImageProps) {
    const router = useRouter();

    return (
        <View style={{ height: 360, width: '100%', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            <Image source={{ uri: product.imageUrl }} style={{ height: '100%', width: '100%', resizeMode: 'cover' }} />
            <TouchableOpacity
                onPress={router.back}
                style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: 'white',
                    borderRadius: 999,
                    padding: 8,
                }}
            >
                <ChevronLeft />
            </TouchableOpacity>
        </View>
    );
}
