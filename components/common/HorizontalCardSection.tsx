// components/HorizontalCardSection.tsx
import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View as RNView,
  ViewStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Text, View } from "../Themed";

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  cardSpacing?: number;
  cardHeight?: number;
};

export function HorizontalCardSection<T>({
  items,
  renderItem,
  cardSpacing = 16,
  cardHeight = 200,
}: Props<T>) {
  const scrollRef = useRef<ScrollView>(null);

  const handleContentSizeChange = (contentWidth: number) => {
    scrollRef.current?.scrollTo({ x: contentWidth, animated: false });
  };

  return (
    <View style={{ height: cardHeight }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            columnGap: cardSpacing,
            flexDirection: "row-reverse", // Ensure it's LTR first
          },
        ]}
      >
        {items.map((item, index) => (
          <View key={index}>{renderItem(item, index)}</View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
  },
});
