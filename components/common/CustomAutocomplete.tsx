/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState, useRef } from "react";
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import {
  Input,
  InputProps,
  List,
  Popover,
  ListItem,
} from "@ui-kitten/components";

export type AutocompleteItemProps = React.ComponentProps<typeof ListItem>;
export type AutocompleteItemElement = React.ReactElement<AutocompleteItemProps>;

export const AutocompleteItem: React.FC<AutocompleteItemProps> = (props) => (
  <ListItem {...props} />
);

export interface AutocompleteProps extends InputProps {
  children?: AutocompleteItemElement | AutocompleteItemElement[];
  onSelect?: (index: number) => void;
  placement?: any;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  children,
  onSelect,
  placement = "bottom",
  testID,
  ...inputProps
}) => {
  const [listVisible, setListVisible] = useState(false);
  const inputRef = useRef<Input>(null);
  const anchorRef = useRef<Input>(null);

  const data = React.Children.toArray(children || []).filter(
    React.isValidElement
  ) as AutocompleteItemElement[];

  const showOptions = () => setListVisible(true);
  const hideOptions = () => setListVisible(false);

  const focusInput = () => inputRef.current?.focus();
  const blurInput = () => inputRef.current?.blur();
  const blurAnchor = () => anchorRef.current?.blur();

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    // defer opening list until after render
    setTimeout(showOptions, 0);
    inputProps.onFocus?.(e);
  };

  const onAnchorFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    blurAnchor();
    // defer opening list and focusing real input until after render
    setTimeout(() => {
      showOptions();
      focusInput();
    }, 0);
    inputProps.onFocus?.(e);
  };

  const onSubmitEditing = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    hideOptions();
    inputProps.onSubmitEditing?.(e);
  };

  const onBackdropPress = () => {
    blurInput();
    blurAnchor();
    hideOptions();
  };

  const onItemPress = (index: number) => {
    hideOptions();
    onSelect?.(index);
  };

  const renderItem = (info: ListRenderItemInfo<AutocompleteItemElement>) =>
    React.cloneElement(info.item, { onPress: () => onItemPress(info.index) });

  const renderAnchor = () => (
    <View>
      <Input
        {...inputProps}
        ref={anchorRef}
        testID="@autocomplete/input-anchor"
        showSoftInputOnFocus={false}
        onFocus={onAnchorFocus}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );

  const renderInputElement = () => (
    <View>
      <Input
        {...inputProps}
        ref={inputRef}
        testID="@autocomplete/input"
        showSoftInputOnFocus={true}
        autoFocus={true}
        onFocus={onInputFocus}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );

  return (
    <Popover
      style={styles.popover}
      placement={placement}
      testID={testID}
      visible={listVisible}
      fullWidth={true}
      anchor={renderAnchor}
      onBackdropPress={onBackdropPress}
    >
      <View>
        {renderInputElement()}
        <List
          style={styles.list}
          keyboardShouldPersistTaps="always"
          data={data}
          bounces={false}
          renderItem={renderItem}
        />
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  popover: {
    maxHeight: 192,
    marginTop: -40,
    overflow: "hidden",
    borderWidth: 0,
  },
  list: {
    flexGrow: 0,
    overflow: "hidden",
  },
});
