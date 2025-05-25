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
const parts = Array.from({ length: 30 }, (_, i) => `الجزء ${i + 1}`);

import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, LogBox } from "react-native";
import { useSharedValue } from "react-native-reanimated";
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

const HEADER_HEIGHT = 250;

LogBox.ignoreLogs(["Warning: This synthetic event is reused"]);

export const PagesNavigationModal = forwardRef(
  ({ scrollRef, onGo }: any, ref: any) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => {
      const initial = HEADER_HEIGHT + insets.bottom;
      return [initial];
    }, [insets]);

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

    useImperativeHandle(ref, () => ({
      open() {
        sheetRef?.current?.snapToIndex(0);
      },
      close() {
        sheetRef?.current?.close();
      },
    }));

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close" // ✅ Automatically closes on outside press
        />
      ),
      []
    );

    const filteredSurahs: any = allSurahs
      .filter((s) => s.includes(surahQuery))
      .map((s, i) => ({ id: `${i}`, title: s }));
    const filteredParts = parts
      .filter((p) => p.includes(partQuery))
      .map((p, i) => ({ id: `${i}`, title: p }));

    const renderContent = () => (
      <BottomSheetView style={{ pointerEvents: "box-none", padding: 20 }}>
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
            borderRadius: 10,
            marginBottom: 5,
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
      </BottomSheetView>
    );

    return (
      <BottomSheet
        ref={sheetRef}
        style={{ zIndex: 1000 }}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        animatedIndex={animatedIndex}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        handleIndicatorStyle={{ backgroundColor: "#bcc0c1" }}
        onClose={() => {}}
        backdropComponent={renderBackdrop}
      >
        {renderContent()}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  content__header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 100,
    paddingHorizontal: 30,
    paddingBottom: 5,
  },

  content__cover: {
    zIndex: 100,
    width: 80,
    height: 80,
    marginLeft: 20,
    marginTop: 5,
  },

  content__inner: {
    top: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "right",
    marginRight: 30,
  },

  contentText: {
    fontSize: 18,
    textAlign: "right",
    marginRight: 30,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  inputFlex: { flex: 1 },
});
