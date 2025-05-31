import { Stack } from "expo-router";

import ModalHeader from "@/components/common/ModalHeader";
import HomeHeader from "@/components/screens/Home/HomeHeader/HomeHeader";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="quraan-modal"
        options={({ route }: any) => ({
          header: () => <ModalHeader title={route.params?.title ?? "Quraan"} />,
          presentation: "modal",
        })}
      />
      <Stack.Screen
        name="notifications-modal"
        options={{
          header: () => <ModalHeader title="الاشعارات" />,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings-modal"
        options={{
          header: () => <ModalHeader title="الاعدادات" />,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="liked-tracks-modal"
        options={{
          header: () => <ModalHeader title="الصوتيات المفضله" />,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
