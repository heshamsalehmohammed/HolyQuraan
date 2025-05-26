import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { DynamicSvg } from "@/components/common/DynamicSvg";

/**
 * A simple two-row welcome banner.
 *
 * ┌──────────────────────────────┐
 * │  100 %-wide header image     │  ← 100 px tall
 * ├───────────────┬──────────────┤
 * │ 100×100 img   │ 3-line text  │
 * └───────────────┴──────────────┘
 */
const WelcomeSection: React.FC = () => {
  const now = new Date();

  /** morning vs night greeting */
  const greeting =
    now.getHours() >= 5 && now.getHours() < 18
      ? "صبحك الله بالخير"
      : "مساك الله بالخير";

  /** Islamic (Hijri) date in Arabic, e.g. 26 ذو القعدة 1446 هـ */
  const islamicDate = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  /** Gregorian date in Arabic, prefixed by “يوم …” */
  const gregorianDate =
    "يوم " +
    new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);

  return (
    <View style={styles.container}>
      {/* row 1 – full-width banner image */}
      <DynamicSvg width={"100%"} height={120} uri={"WelcomeHeader"} />

      {/* row 2 – avatar + text */}
      <View style={styles.infoRow}>
        <Image
          source={require("@/assets/images/mohammed.jpeg")}
          style={styles.avatar}
        />

        <View style={styles.textColumn}>
          <Text style={styles.line1}>{greeting}</Text>
          <Text style={styles.line2}>{islamicDate}</Text>
          <Text style={styles.line3}>{gregorianDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeSection;

const styles = StyleSheet.create({
  container: { width: "100%" },

  /* row 1 */
  headerImage: { width: "100%", height: 100, resizeMode: "cover" },

  /* row 2 */
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  avatar: { width: 100, height: 100, borderRadius: 50,marginLeft: 12 },

  textColumn: { flex: 1, marginRight: 12 },

  line1: { fontSize: 24, fontWeight: "bold", textAlign: "right" },
  line2: { fontSize: 16, marginTop: 2, textAlign: "right" },
  line3: { fontSize: 16, textAlign: "right"},
});
