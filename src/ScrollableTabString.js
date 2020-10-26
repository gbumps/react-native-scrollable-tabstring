import React, { useCallback, useRef, useState } from 'react';
import {
    Animated,
    View,
    Platform
} from 'react-native';

import PropTypes from 'prop-types';
import Colors from '../../colors';

const binarySearch = (arr, element) => {
    let right = arr.length - 1;
    let left = 0;
    let mid;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        if (arr[mid].y <= element) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [left, right];
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y
      >= contentSize.height - paddingToBottom;
};

const ScrollableTabString = ({
    dataTabNames,
    dataSections,
    isParent,
    tabPosition,
    renderSection,
    renderTabName,
    customSectionProps,
    customTabNamesProps,
    onPressTab,
    onScrollSection,
    selectedTabStyle,
    unselectedTabStyle,
}) => {
    const listViews = [];
    const tabNamesRef = useRef(null);
    const tabScrollMainRef = useRef(null);
    const heightTabNames = useRef(0);

    const [selectedScrollIndex, changeSelectedScrollIndex] = useState(0);
    const isPressToScroll = useRef(false);

    const goToIndex = (item) => {
        isPressToScroll.current = true;
        const findMinYAxis = Math.min(...listViews.filter((i) => i.item.index === item.index).map((ii) => ii.y));
        const res = listViews.find((i) => i.y === findMinYAxis);
        tabScrollMainRef?.current?.getNode()?.scrollToOffset({ offset: res.y - (heightTabNames.current * 2) });
        changeSelectedScrollIndex(res.item.index);
        onPressTab && onPressTab(item);
    };

    const dataTabNameChildren = useCallback(({ item, index }) => React.Children.map(
        React.Children.toArray(renderTabName(item, index)),
        (children) => React.cloneElement(children, {
            style: { ...(index === selectedScrollIndex) ? selectedTabStyle : unselectedTabStyle },
            onPress: () => goToIndex(item),
            onLayout: (e) => {
                if (heightTabNames.current === 0) {
                    heightTabNames.current = e.nativeEvent.layout.height;
                }
            }
        })
    ), []);

    const dataSectionsChildren = useCallback(({ item, index }) => React.Children.map(
        React.Children.toArray(renderSection(item, index)),
        (children) => React.cloneElement(children, {
            onLayout: (e) => {
                listViews.push({
                    item: { ...item },
                    y: e.nativeEvent.layout.y,
                });
                if (listViews.length === dataSections.length) {
                    listViews.sort((a, b) => a.y - b.y);
                }
            }
        })
    ), []);

    const onScroll = (e) => {
        onScrollSection && onScrollSection(e);
        if (!isPressToScroll.current) {
            if (e.nativeEvent.contentOffset.y === 0) {
                tabNamesRef?.current?.getNode().scrollToOffset({
                    offset: 0,
                    animated: Platform.OS === 'ios',
                    viewPosition: 0.5,
                });
                changeSelectedScrollIndex(0);
            } else if (isCloseToBottom(e.nativeEvent)) {
                const lastIndex = dataTabNames.length - 1;
                tabNamesRef?.current?.getNode().scrollToIndex({
                    animated: Platform.OS === 'ios',
                    index: lastIndex,
                    viewPosition: 0.5,
                });
                changeSelectedScrollIndex(lastIndex);
            } else {
                const res = binarySearch(listViews, e.nativeEvent.contentOffset.y);
                const indexToScrollTo = res.includes(-1)
                    ? listViews[Math.max(...res)]?.item?.index
                    : Math.max(listViews[res[0]]?.item?.index, listViews[res[1]]?.item?.index);
                if (indexToScrollTo && indexToScrollTo !== -1 && indexToScrollTo !== selectedScrollIndex) {
                    tabNamesRef?.current?.getNode().scrollToIndex({
                        animated: Platform.OS === 'ios',
                        index: indexToScrollTo,
                        viewPosition: 0.5,
                    });
                    changeSelectedScrollIndex(indexToScrollTo);
                }
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.FlatList
                {...customSectionProps}
                style={{ flex: 1 }}
                data={isParent ? dataSections : dataSections.map((i, index) => ({ ...i, index }))}
                scrollEventThrottle={16}
                ref={tabScrollMainRef}
                bounces={false}
                onScrollBeginDrag={() => isPressToScroll.current = false}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                stickyHeaderIndices={tabPosition === 'top' ? [0] : null}
                CellRendererComponent={dataSectionsChildren}
                ListHeaderComponent={tabPosition === 'top' ? (
                    <Animated.FlatList
                        data={isParent ? dataTabNames : dataTabNames.map((i, index) => ({ ...i, index }))}
                        {...customTabNamesProps}
                        ref={tabNamesRef}
                        initialNumToRender={dataTabNames.length}
                        keyExtractor={(item) => item.index}
                        keyboardShouldPersistTaps="always"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            backgroundColor: Colors.white,
                            alignItems: 'center',
                            width: '100%'
                        }}
                        horizontal
                        renderItem={dataTabNameChildren}
                    />
                ) : null}
            />
            {
                (tabPosition === 'bottom' ? (
                    <Animated.FlatList
                        style={{ position: 'absolute', bottom: 0 }}
                        data={isParent ? dataTabNames : dataTabNames.map((i, index) => ({ ...i, index }))}
                        {...customTabNamesProps}
                        ref={tabNamesRef}
                        initialNumToRender={dataTabNames.length}
                        keyExtractor={(item) => item.index}
                        keyboardShouldPersistTaps="always"
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            backgroundColor: Colors.white,
                            alignItems: 'center',
                            width: '100%'
                        }}
                        horizontal
                        renderItem={dataTabNameChildren}
                    />
                ) : null)
            }
        </View>

    );
};

ScrollableTabString.propTypes = {
    dataTabNames: PropTypes.array,
    dataSections: PropTypes.array,
    isParent: PropTypes.bool,
    tabPosition: PropTypes.oneOf(['top', 'bottom']),
    renderSection: PropTypes.func,
    renderTabName: PropTypes.func,
    customTabNamesProps: PropTypes.object,
    customSectionProps: PropTypes.object,
    onPressTab: PropTypes.func,
    onScrollSection: PropTypes.func,
    selectedTabStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    unselectedTabStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ScrollableTabString.defaultProps = {
    dataSections: [],
    dataTabNames: [],
    isParent: false,
    tabPosition: 'top',
};

export default ScrollableTabString;
