import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, LogBox, Dimensions } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import {
  Button,
  Text,
  TextInput,
  useThemeColor,
  View,
} from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { QuranParts } from "@/manager";
import { PanGestureHandler } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = 200;
const HANDLE_HEIGHT = 20;

LogBox.ignoreLogs(["Warning: This synthetic event is reused"]);

export const PagesNavigationModal = forwardRef(
  ({ scrollRef, sourasIndex, prePagesCount = 0, onGo }: any, ref: any) => {
    const insets = useSafeAreaInsets();

    const sheetRef = useRef<any>(null);
    const animatedIndex = useSharedValue(-1);
    const [pageNumber, setPageNumber] = useState("");
    const [surahQuery, setSurahQuery] = useState("");
    const [partQuery, setPartQuery] = useState("");

    const auto_backgroundColor = useThemeColor("color-basic-200");
    const auto_borderColor = useThemeColor("color-basic-400");
    const auto_placeholderColor = useThemeColor("color-basic-600");
    const auto_inputColor = useThemeColor("color-basic-800");
    const textColor = useThemeColor("text-basic-color");
    const backgroundColor = useThemeColor("backgroundColor");

    const [isOpen, setIsOpen] = useState(false);

    const translateY = useSharedValue(-SHEET_HEIGHT );
    const sheetOpen = () => {
      translateY.value = withSpring(0);
      setIsOpen(true);
    };
    const sheetClose = () => {
      translateY.value = withSpring(-SHEET_HEIGHT);
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: sheetOpen,
      close: sheetClose,
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx: any) => {
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx: any) => {
        const newY = ctx.startY + event.translationY;
        translateY.value = Math.min(
          Math.max(newY, -SHEET_HEIGHT),
          0
        );
      },
      onEnd: () => {
        if (translateY.value < -SHEET_HEIGHT / 3) {
          runOnJS(sheetClose)();
        } else {
          runOnJS(sheetOpen)();
        }
      },
    });

    const filteredSurahs: any = sourasIndex.filter((s: any) =>
      s.title.includes(surahQuery)
    );
    const filteredParts = QuranParts.filter((p) => p.includes(partQuery)).map(
      (p, i) => ({ id: `${i}`, title: p })
    );

    const renderContent = () => (
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          paddingHorizontal: 16,
          backgroundColor: "#2b62af80",
        }}
      >
        <View style={styles.row}>
          <TextInput
            placeholder="رقم الصفحة"
            keyboardType="numeric"
            value={pageNumber}
            onChangeText={setPageNumber}
            style={styles.inputFlex}
            textStyle={{ textAlign: "right" }}
          />
          <Button
            style={{ height: 10, paddingTop: 8 }}
            onPress={() => onGo?.(pageNumber)}
            title="اذهب"
          />
        </View>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          showClear={false}
          onSelectItem={(item: any) => {
            if (item) {
              onGo?.(item.pageNumber + prePagesCount);
              sheetClose();
            }
          }}
          dataSet={filteredSurahs}
          textInputProps={{
            placeholder: "اختر السورة",
            value: surahQuery,
            onChangeText: setSurahQuery,
            textAlign: "right",
            placeholderTextColor: auto_placeholderColor,
            style: {
              color: auto_inputColor,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: auto_backgroundColor,
            borderWidth: 1,
            borderColor: auto_borderColor,
            borderRadius: 10,
            marginVertical: 0,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: auto_backgroundColor,
            borderWidth: 1,
            borderColor: auto_borderColor,
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <Text style={{ color: textColor, padding: 15, textAlign: "right" }}>
              {item.title}
            </Text>
          )}
          inputHeight={50}
        />

        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          showClear={false}
          onSelectItem={(item: any) => item && setPartQuery(item.title)}
          dataSet={filteredParts}
          textInputProps={{
            placeholder: "اختر الجزء",
            value: partQuery,
            onChangeText: setPartQuery,
            textAlign: "right",
            placeholderTextColor: auto_placeholderColor,
            style: {
              color: auto_inputColor,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: auto_backgroundColor,
            borderWidth: 1,
            borderColor: auto_borderColor,
            borderRadius: 10,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: auto_backgroundColor,
            borderWidth: 1,
            borderColor: auto_borderColor,
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <Text style={{ color: textColor, padding: 15, textAlign: "right" }}>
              {item.title}
            </Text>
          )}
          inputHeight={50}
        />
      </View>
    );

    return (
      <Animated.View style={[styles.sheet, animatedStyle ,{}]}>
        {renderContent()}
        <PanGestureHandler onGestureEvent={gestureHandler} waitFor={scrollRef}>
          <Animated.View style={styles.handle}>
            <View style={styles.bar} />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    backgroundColor:'transparent',
  },
  inputFlex: { flex: 1,borderRadius:10 },
  sheet: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SHEET_HEIGHT + HANDLE_HEIGHT,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  handle: {
    height: HANDLE_HEIGHT,     
    backgroundColor: "#2b62af80",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFF",
  },
});
