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
  scrollToEnd?: boolean;
};

export function HorizontalCardSection<T>({
  items,
  renderItem,
  cardSpacing = 16,
  cardHeight = 200,
  scrollToEnd = true,
}: Props<T>) {
  const scrollRef = useRef<ScrollView>(null);

  const handleContentSizeChange = (contentWidth: number) => {
    if(scrollToEnd){
    scrollRef.current?.scrollTo({ x: contentWidth, animated: false });
  }
  };

  React.useEffect(() => {
    if(scrollToEnd){
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [items]);

  return (
    <View level="3" style={{ height: cardHeight }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            columnGap: cardSpacing,
            flexDirection: scrollToEnd?"row-reverse":'row', // Ensure it's LTR first
          },
        ]}
      >
        {items.map((item, index) => (
          <View level="3" key={index}>
            {renderItem(item, index)}
          </View>
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
