import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { readingsButtons } from "@/manager";



export default function Index() {
  const router = useRouter();
  const animValues = useRef(readingsButtons.map(() => new Animated.Value(50))).current;

  useEffect(() => {
    const animations = animValues.map((av:any) =>
      Animated.timing(av, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.container} level="3">
      <Text style={styles.title}>مصاحف القراءات</Text>
      {readingsButtons.map((btn:any, i:number) => (
        <Animated.View
          key={i}
          style={{
            transform: [{ translateY: animValues[i] }],
            opacity: animValues[i].interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0.5],
            }),
            width: "80%",
            marginBottom: 10,
          }}
        >
          <Button
            title={btn.title}
            disabled={btn.disabled}
            style={styles.button}
            onPress={() => {
              router.push({ pathname: btn.path, params: btn.params });
            }}
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  button: {
    elevation: 5,
  },
});
