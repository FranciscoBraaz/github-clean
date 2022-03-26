import { View, Text, Animated, Easing, ViewProps } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Container } from './styles';

interface SkeletonProps extends ViewProps {
  widthComponent: string;
  widthSkeleton: string;
  heightComponent: string;
  outputRangeFinal: number;
}

export function Skeleton({
  widthComponent,
  widthSkeleton,
  heightComponent,
  outputRangeFinal,
  ...rest
}: SkeletonProps) {
  const AnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    linearAnimation();

    return () => linearAnimation();
  }, []);

  const linearAnimation = () => {
    AnimatedValue.setValue(0);
    Animated.timing(AnimatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setTimeout(() => {
        linearAnimation();
      }, 800);
    });
  };

  const translateX = AnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, outputRangeFinal],
  });

  return (
    <Container width={widthComponent} height={heightComponent} {...rest}>
      <Animated.View
        style={{
          width: widthSkeleton,
          height: '100%',
          opacity: 0.6,
          backgroundColor: '#fff',
          transform: [{ translateX: translateX }],
        }}
      ></Animated.View>
    </Container>
  );
}
