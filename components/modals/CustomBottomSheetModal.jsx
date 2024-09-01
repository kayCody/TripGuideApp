import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BottomSheetModal({ bottomSheetRef, content, snapPointsValue, enablePanDownToClose }) {
  const snapPoints = useMemo(() => [snapPointsValue], []);
  // Custom backdrop component
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  return (
    <BottomSheet
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      enabledGestureInteraction={true}
      handleIndicatorStyle={{ width: wp('30%') }}
    >
      <View className={``}>
        {content ? content : <Text>This View has no Content to display</Text>}
      </View>
    </BottomSheet>
  )
}

