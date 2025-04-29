import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

export default function PromoBanner(props: ImageProps) {
    return <Image style={[styles.image, props.style]} resizeMode='contain' {...props} />;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
});
