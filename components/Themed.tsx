import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  Text as KittenText,
  TextProps as KittenTextProps,
  Input as KittenInput,
  InputProps as kittenInputProps,
  Button as KittenButton,
  ButtonProps as KittenButtonProps,
  Layout as KittenView,
  LayoutProps as KittenViewProps,
  CheckBox as KittenCheckBox,
  CheckBoxProps as KittenCheckBoxProps,
} from "@ui-kitten/components";

import { Formik, useFormikContext } from "formik";

import {
  SafeAreaView as DefaultSafeAreaView,
  SafeAreaViewProps as DefaultSafeAreaViewProps,
} from "react-native-safe-area-context";
import { FontAwesome as DefaultFontAwesome } from "@expo/vector-icons";
import { Ionicons as DefaultIonicons } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/useColorScheme";
import { customLightTheme } from "@/constants/custom-light-theme";
import { customDarkTheme } from "@/constants/custom-dark-theme";
import * as Haptics from "expo-haptics";

export function useThemeColor(colorName: string) {
  const theme = useColorScheme() ?? "light";
  const colorFromKittenThemes =
    theme === "light"
      ? customLightTheme[colorName]
      : customDarkTheme[colorName];
  return colorFromKittenThemes;
}

export function Text(props: KittenTextProps) {
  const { style, status, ...otherProps } = props;
  const color = useThemeColor("textColor");
  return <KittenText style={[{ color }, styles.text, style]} {...otherProps} />;
}

export function StatusText(
  props: KittenTextProps & { textStyle?: TextStyle; showIcon?: boolean }
) {
  const { style, textStyle, showIcon, status, ...otherProps } = props;
  const color = useThemeColor(`color-${status}-500`);

  return (
    <View style={[styles.statusTextContainer, style as ViewStyle]}>
      {showIcon && (
        <ThemedIcon
          style={{ marginRight: 10, color }}
          name="info-circle"
          size={20}
        />
      )}
      <KittenText
        style={[styles.text, textStyle]}
        status={status}
        {...otherProps}
      />
    </View>
  );
}

export function View(props: KittenViewProps) {
  const { style, ...otherProps } = props;
  return <KittenView style={[style]} {...otherProps} />;
}

export function SafeAreaView(props: DefaultSafeAreaViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = "transparent";
  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function ThemedIcon(
  props: React.ComponentProps<
    typeof DefaultFontAwesome | typeof DefaultIonicons
  > & { iconLib?: string }
) {
  const { style, iconLib = "DefaultFontAwesome", name, size } = props;

  const color = useThemeColor("iconColor");

  // Ensure the style is cast to TextStyle
  if (iconLib === "DefaultIonicons") {
    return (
      <DefaultIonicons
        style={[{ color } as TextStyle, style]}
        name={name as keyof typeof DefaultIonicons.glyphMap}
        size={size}
      />
    );
  }

  return (
    <DefaultFontAwesome
      style={[{ color } as TextStyle, style]}
      name={name as keyof typeof DefaultFontAwesome.glyphMap}
      size={size}
    />
  );
}

export type TextInputProps = kittenInputProps & {
  rightIcon?: string;
  leftIcon?: string;
  ref?: React.RefObject<KittenInput | null>;
  leftIconClickHandler?: (event: GestureResponderEvent) => void | undefined;
  rightIconClickHandler?: (event: GestureResponderEvent) => void | undefined;
};
export function TextInput(props: TextInputProps) {
  const {
    style,
    leftIcon,
    rightIcon,
    leftIconClickHandler,
    rightIconClickHandler,
    ref,
    ...otherProps
  } = props;

  const renderRightIcon = () => {
    return (
      <Pressable onPress={rightIconClickHandler}>
        <ThemedIcon name={rightIcon} size={20} />
      </Pressable>
    );
  };

  const renderLeftIcon = () => {
    return (
      <Pressable onPress={leftIconClickHandler}>
        <ThemedIcon name={leftIcon} size={20} />
      </Pressable>
    );
  };

  return (
    <KittenInput
      ref={ref}
      accessoryRight={rightIcon ? renderRightIcon : undefined}
      accessoryLeft={leftIcon ? renderLeftIcon : undefined}
      style={[style]}
      {...otherProps}
    />
  );
}

export type ErrorMessageProps = KittenTextProps & {
  error?: string;
  visible?: boolean;
};

export function ErrorMessage(props: ErrorMessageProps) {
  const { style, error, visible = true, ...otherProps } = props;
  if (!visible || !error) return null;

  return (
    <StatusText
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 0,
          margin: 0,
        },
        style,
      ]}
      status="danger"
      {...otherProps}
    >
      {error}
    </StatusText>
  );
}

export function AppForm(props: any) {
  const { children, ...otherProps } = props;
  return <Formik {...otherProps}>{() => <>{children}</>}</Formik>;
}

export function AppFormField(props: any) {
  const {
    name,
    style,
    leftIconClickHandler,
    rightIconClickHandler,
    ...otherProps
  } = props;
  const { setFieldTouched, handleChange, errors, touched }: any =
    useFormikContext();

  return (
    <View style={[{ width: "100%", backgroundColor: "transparent" }, style]}>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        rightIconClickHandler={rightIconClickHandler}
        leftIconClickHandler={leftIconClickHandler}
        {...otherProps}
      />
      <ErrorMessage
        error={errors[name]}
        visible={touched[name] || false}
        style={{ marginTop: 2, fontSize: 14 }}
      />
    </View>
  );
}

export function SubmitButton(props: KittenButtonProps & { title: string }) {
  const { title, ...otherProps } = props;
  const { handleSubmit }: any = useFormikContext();

  return <Button {...otherProps} onPress={handleSubmit} title={title} />;
}

export function Button(
  props: KittenButtonProps & {
    title?: string;
    icon?: string;
    iconStyle?: TextStyle;
  }
) {
  const {
    title = "",
    iconStyle,
    disabled,
    icon,
    onPress,
    style,
    ...otherProps
  } = props;

  return (
    <KittenButton
      onPress={(e) => {
        if (!disabled) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress && onPress(e);
        }
      }}
      style={[style, disabled && styles.buttonDisabled]}
      {...otherProps}
    >
      {icon && <ThemedIcon style={iconStyle} name={icon} size={20} />}
      {title}
    </KittenButton>
  );
}

type ValidTextChild = React.ReactText | React.ReactElement;

export function CheckBox(
  props: KittenCheckBoxProps & { children?: ValidTextChild | ValidTextChild[] }
) {
  const { status, children, ...otherProps } = props;
  const color = useThemeColor("textColor");
  return (
    <KittenCheckBox {...otherProps}>
      {(evaProps) => {
        const { style, ...otherEvaProps } = evaProps || {};
        return (
          <Text {...otherEvaProps} style={[style, { color }]}>
            {children}
          </Text>
        );
      }}
    </KittenCheckBox>
  );
}

export function Divider(props: KittenViewProps) {
  const { style, ...otherProps } = props;

  return <View style={[styles.divider, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  statusTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
