import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";

import { Button, Text, useThemeColor, View } from "@/components/Themed";
import { Input } from "@ui-kitten/components";
/* import { Autocomplete } from "@/components/common/CustomAutocomplete";
 */

import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";


export const allSurahs = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
  "الأنعام",
  "الأعراف",
  "الأنفال",
  "التوبة",
  "يونس",
  "هود",
  "يوسف",
  "الرعد",
  "إبراهيم",
  "الحجر",
  "النحل",
  "الإسراء",
  "الكهف",
  "مريم",
  "طه",
  "الأنبياء",
  "الحج",
  "المؤمنون",
  "النور",
  "الفرقان",
  "الشعراء",
  "النمل",
  "القصص",
  "العنكبوت",
  "الروم",
  "لقمان",
  "السجدة",
  "الأحزاب",
  "سبأ",
  "فاطر",
  "يس",
  "الصافات",
  "ص",
  "الزمر",
  "غافر",
  "فصلت",
  "الشورى",
  "الزخرف",
  "الدخان",
  "الجاثية",
  "الأحقاف",
  "محمد",
  "الفتح",
  "الحجرات",
  "ق",
  "الذاريات",
  "الطور",
  "النجم",
  "القمر",
  "الرحمن",
  "الواقعة",
  "الحديد",
  "المجادلة",
  "الحشر",
  "الممتحنة",
  "الصف",
  "الجمعة",
  "المنافقون",
  "التغابن",
  "الطلاق",
  "التحريم",
  "الملك",
  "القلم",
  "الحاقة",
  "المعارج",
  "نوح",
  "الجن",
  "المزمل",
  "المدثر",
  "القيامة",
  "الإنسان",
  "المرسلات",
  "النبأ",
  "النازعات",
  "عبس",
  "التكوير",
  "الانفطار",
  "المطففين",
  "الانشقاق",
  "البروج",
  "الطارق",
  "الأعلى",
  "الغاشية",
  "الفجر",
  "البلد",
  "الشمس",
  "الليل",
  "الضحى",
  "الشرح",
  "التين",
  "العلق",
  "القدر",
  "البينة",
  "الزلزلة",
  "العاديات",
  "القارعة",
  "التكاثر",
  "العصر",
  "الهمزة",
  "الفيل",
  "قريش",
  "الماعون",
  "الكوثر",
  "الكافرون",
  "النصر",
  "المسد",
  "الإخلاص",
  "الفلق",
  "الناس",
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = 240;
const HANDLE_HEIGHT = 25;
const parts = Array.from({ length: 30 }, (_, i) => `الجزء ${i + 1}`);

export const TopSheet = ({ scrollRef, onGo }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(-SHEET_HEIGHT + HANDLE_HEIGHT);

  const [pageNumber, setPageNumber] = useState("");
  const [surahQuery, setSurahQuery] = useState("");
  const [partQuery, setPartQuery] = useState("");

    const auto_backgroundColor = useThemeColor("color-basic-200");
    const auto_borderColor = useThemeColor("color-basic-400");
    const auto_placeholderColor = useThemeColor("color-basic-600");
    const auto_inputColor = useThemeColor("color-basic-800");
    const autoPanel_backgroundColor = useThemeColor("color-basic-200");

    const textColor = useThemeColor("text-basic-color");

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const newY = ctx.startY + event.translationY;
      translateY.value = Math.min(
        Math.max(newY, -SHEET_HEIGHT + HANDLE_HEIGHT),
        0
      );
    },
    onEnd: () => {
      if (translateY.value < -SHEET_HEIGHT / 3) {
        translateY.value = withSpring(-SHEET_HEIGHT + HANDLE_HEIGHT);
        runOnJS(setIsOpen)(false);
      } else {
        translateY.value = withSpring(0);
        runOnJS(setIsOpen)(true);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const closeSheet = () => {
    translateY.value = withSpring(-SHEET_HEIGHT + HANDLE_HEIGHT);
    setIsOpen(false);
  };

  const filteredSurahs:any = allSurahs
    .filter((s) => s.includes(surahQuery))
    .map((s, i) => ({ id: `${i}`, title: s }));
  const filteredParts = parts
    .filter((p) => p.includes(partQuery))
    .map((p, i) => ({ id: `${i}`, title: p }));

  return (
    <>
      {isOpen && <Pressable style={styles.overlay} onPress={closeSheet} />}

      <Animated.View style={[styles.sheet, animatedStyle]}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.row}>
            <Input
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
            onSelectItem={(item: any) => item && setSurahQuery(item.title)}
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
              borderRadius: 25,
            }}
            suggestionsListContainerStyle={{
              backgroundColor: auto_backgroundColor,
              borderWidth: 1,
              borderColor: auto_borderColor,
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => (
              <Text
                style={{ color: textColor, padding: 15, textAlign: "right" }}
              >
                {item.title}
              </Text>
            )}
            inputHeight={50}
          />

          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
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
              borderRadius: 25,
            }}
            suggestionsListContainerStyle={{
              backgroundColor: auto_backgroundColor,
              borderWidth: 1,
              borderColor: auto_borderColor,
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => (
              <Text
                style={{ color: textColor, padding: 15, textAlign: "right" }}
              >
                {item.title}
              </Text>
            )}
            inputHeight={50}
          />
        </ScrollView>

        <PanGestureHandler onGestureEvent={gestureHandler} waitFor={scrollRef}>
          <Animated.View style={styles.handle}>
            <View style={styles.bar} />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 998,
  },
  sheet: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SHEET_HEIGHT,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
  },
  scroll: {
    padding: 16,
    gap: 12,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  inputFlex: { flex: 1 },
  label: {
    textAlign: "right",
    fontWeight: "bold",
    marginVertical: 8,
  },
  autoContainer: {
    direction: "rtl",
  },
  handle: {
    height: HANDLE_HEIGHT,
    backgroundColor: "#2b62af80",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    alignSelf: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#888",
  },
});