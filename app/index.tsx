import { useRef, useState, useEffect, FC, useCallback } from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { Text, TextInput, View } from "@/components/Themed";
import { readingsButtons } from "@/manager";
import { HorizontalCardSection } from "@/components/common/HorizontalCardSection";
import { Input as KittenInput } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { DynamicSvg } from "@/components/common/DynamicSvg";

// Infer the item type from readingsButtons array
type ReadingItem = (typeof readingsButtons)[number];

interface ReadingSectionProps {
  title: string;
  items: ReadingItem[];
}

const CARD_WIDTH = 230;
const CARD_HEIGHT = 100;

const LIKED_CARD_HEIGHT = 75; // Adjusted for liked tracks
const LIKED_CARD_WIDTH = 280; // Adjusted for liked tracks

const ReadingSection: FC<ReadingSectionProps> = ({ title, items }) => {
  const router = useRouter();
  const inputRef = useRef<KittenInput>(null);
  const [searching, setSearching] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // hide search overlay on keyboard dismiss
  useEffect(() => {
    const sub = Keyboard.addListener("keyboardDidHide", () => {
      setSearching(false);
    });
    return () => sub.remove();
  }, []);

  // clear loading when screen focused
  useFocusEffect(
    useCallback(() => {
      setLoadingId(null);
    }, [])
  );

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const onPress = (item: ReadingItem) => {
    setLoadingId(item.id);
    router.push({ pathname: item.path, params: item.params });
  };

  return (
    <View level="3" style={styles.sectionContainer}>
      <View level="3" style={styles.header}>
        <TextInput
          ref={inputRef}
          leftIcon="search"
          value={filterText}
          onChangeText={setFilterText}
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          leftIconClickHandler={() => {
            setSearching(true);
            inputRef.current?.focus();
          }}
          style={[styles.input, { width: searching ? "40%" : 38 }]}
        />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <HorizontalCardSection<ReadingItem>
        cardHeight={CARD_HEIGHT}
        items={filtered}
        renderItem={(item) => {
          const disabled = item.disabled || loadingId === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => !disabled && onPress(item)}
              disabled={disabled}
              style={({ pressed }) => [
                styles.card,
                disabled && styles.cardDisabled,
                pressed && !disabled && { opacity: 0.7 },
              ]}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.image}
              />
              <Text style={styles.subtitle}>{item.title}</Text>
              {loadingId === item.id && (
                <View style={styles.spinnerOverlay}>
                  <ActivityIndicator size="small" />
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

interface SectionData {
  title: string;
  data: ReadingItem[];
}

const likedTracks: ReadingItem[] = [
  {
    id: 101,
    title: "قراءه شعبة",
    details: "سورة البقرة - الآية 1",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 102,
    title: "قراءه حفص",
    details: "سورة آل عمران - الآية 5",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 103,
    title: "قراءه ورش",
    details: "سورة النساء - الآية 10",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
  {
    id: 1024,
    title: "قراءه قالون",
    details: "سورة المائدة - الآية 15",
    image: "word-00001-shuba",
    path: "",
    params: {},
    disabled: false,
    sideNotes: false,
  },
];

const LikedTracksSection: FC<{ items: ReadingItem[] }> = ({ items }) => {
  const items_firstHalf = items.slice(0, Math.ceil(items.length / 2));
  const items_secondHalf = items.slice(Math.ceil(items.length / 2));

  const noColorSubtitle = { ...StyleSheet.flatten(styles.audioSubtitle) };
  delete noColorSubtitle.color;

  const noColorSubtitleDetails = {
    ...StyleSheet.flatten(styles.audioSubtitleDetails),
  };
  delete noColorSubtitleDetails.color;

  return (
    <View level="3" style={styles.likedContainer}>
      <View style={styles.likedHeader}>
        <View style={styles.likedIcon}>
          {/* use your heart icon here */}
          <Ionicons name="heart" size={24} color="#f50" />
        </View>
        <Text style={styles.likedTitle}>الصوتيات المفضله</Text>
        <Pressable style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={20} color="#fff" />
        </Pressable>
      </View>
      <HorizontalCardSection<ReadingItem>
        cardHeight={LIKED_CARD_HEIGHT}
        items={items_firstHalf}
        renderItem={(item) => (
          <View key={item.id} style={styles.trackCard}>
            <View
              style={[styles.trackCardSections, { justifyContent: "center" }]}
            >
              <DynamicSvg width={50} height={50} uri={item.image ?? ""} />
            </View>

            <View
              style={[styles.trackCardSections, { justifyContent: "center" }]}
            >
              {/* use your heart icon here */}
              <Ionicons name="play" size={24} color="#000" />
            </View>

            <View
              style={[
                styles.trackCardSections,
                {
                  flexGrow: 1,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Text style={noColorSubtitle}>{item.title}</Text>
              <Text style={noColorSubtitleDetails}>{item.details}</Text>
            </View>
          </View>
        )}
      />
      <View level="3" style={{ height: 8 }}></View>
      <HorizontalCardSection<ReadingItem>
        cardHeight={LIKED_CARD_HEIGHT}
        items={items_secondHalf}
        renderItem={(item) => (
          <View key={item.id} style={styles.trackCard}>
            <View
              style={[styles.trackCardSections, { justifyContent: "center" }]}
            >
              <DynamicSvg width={50} height={50} uri={item.image ?? ""} />
            </View>

            <View
              style={[styles.trackCardSections, { justifyContent: "center" }]}
            >
              {/* use your heart icon here */}
              <Ionicons name="play" size={24} color="#000" />
            </View>

            <View
              style={[
                styles.trackCardSections,
                {
                  flexGrow: 1,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Text style={noColorSubtitle}>{item.title}</Text>
              <Text style={noColorSubtitleDetails}>{item.details}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Index: FC = () => {
  const sections: SectionData[] = [
    {
      title: "القراءات مع الهامش",
      data: readingsButtons.filter((item: any) => item.sideNotes),
    },
    {
      title: "القراءات بدون هامش",
      data: readingsButtons.filter((item: any) => !item.sideNotes),
    },
    { title: "liked", data: likedTracks },
  ];

  const renderSection = ({ section }: { section: SectionData }) => {
    if (section.title === "liked") {
      return <LikedTracksSection items={section.data} />;
    } else {
      return <ReadingSection title={section.title} items={section.data} />;
    }
  };

  return (
    <View style={styles.container} level="3">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={renderSection}
        renderItem={() => null}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  sectionContainer: { display: "flex", alignItems: "flex-end", width: "100%" },
  listContent: {
    paddingVertical: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
    textAlign: "right",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  cardDisabled: { opacity: 0.5 },
  image: { width: "100%", height: "100%", resizeMode: "stretch" },
  subtitle: {
    position: "absolute",
    bottom: 10,
    right: 5,
    padding: 8,
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },

  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },

  likedContainer: {
    width: "100%",
    marginVertical: 20,
    height: 2 * LIKED_CARD_HEIGHT + 72 + 32 + 8, // Adjust height to fit header and cards
  },
  likedHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: /* "linear-gradient(180deg, #4c0000, #000)" */ "#FFF",
    padding: 16,
    marginBottom: 16,
  },
  likedIcon: {
    marginRight: 12,
  },
  likedTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 8,
  },
  shuffleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  trackCard: {
    width: LIKED_CARD_WIDTH,
    height: LIKED_CARD_HEIGHT,
    borderRadius: 12,
    overflow: "scroll",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  trackCardSections: {
    height: "100%",
    display: "flex",
    paddingHorizontal: 5,
  },
  audioSubtitle: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },
  audioSubtitleDetails: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "right",
  },
});
