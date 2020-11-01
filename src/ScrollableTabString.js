import React, { Component } from 'react';
import {
    Animated,
    View,
    Platform,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    horizontalTabStyle: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%'
    }
});

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

const listViews = [];

class ScrollableTabString extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScrollIndex: 0,
        };
        this.tabNamesRef = React.createRef(null);
        this.tabScrollMainRef = React.createRef(null);
        this.heightTabNames = React.createRef(0);
        this.isPressToScroll = React.createRef(false);

        this.goToIndex = this.goToIndex.bind(this);
        this.dataTabNameChildren = this.dataTabNameChildren.bind(this);
        this.dataSectionsChildren = this.dataSectionsChildren.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        const { dataSections, dataTabs, isParent } = this.props;

        if (dataSections.length !== dataTabs.length && !isParent) {
            console.warn(`The 'dataSections' and 'dataTabs' length are not equal. This will cause some issues, especially when the section list is scrolling. Consider number of items of those lists to be equal, or add 'isParent' param if you are supporting parent tab - children sections`);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataSections.length > prevProps.dataSections.length) {
            console.warn(`Are you loading more items on the dataSections ? This component does not support on load more yet. Refer here: `);
        }
    }

    goToIndex(item) {
        const { tabScrollMainRef, isPressToScroll, heightTabNames } = this;
        const { onPressTab } = this.props;

        isPressToScroll.current = true;
        const findMinYAxis = Math.min(...listViews.filter((i) => i.item.index === item.index).map((ii) => ii.y));
        const res = findMinYAxis && listViews.find((i) => i.y === findMinYAxis);
        tabScrollMainRef?.current?.scrollToOffset({ offset: res.y - (heightTabNames.current * 2) });
        this.setState({
            selectedScrollIndex: res.item.index
        });
        onPressTab && onPressTab(item);
    }

    //map tab item
    dataTabNameChildren({ item, index }) {
        const { renderTabName, selectedTabStyle, unselectedTabStyle } = this.props;
        const { heightTabNames } = this;
        const { selectedScrollIndex } = this.state;

        return React.Children.map(
            React.Children.toArray(renderTabName(item, index)),
            (children) => React.cloneElement(children, {
                style: { ...(index === selectedScrollIndex) ? selectedTabStyle : unselectedTabStyle },
                onPress: () => this.goToIndex(item),
                onLayout: (e) => {
                    if (heightTabNames.current === 0) {
                        heightTabNames.current = e.nativeEvent.layout.height;
                    }
                }
            })
        );
    }

    //map section item
    dataSectionsChildren({ item, index }) {
        const { renderSection, dataSections } = this.props;

        return React.Children.map(
            React.Children.toArray(renderSection(item, index)),
            (children) => React.cloneElement(children, {
                onLayout: (e) => {
                    listViews.push({
                        item: { ...item },
                        y: e.nativeEvent.layout.y,
                    });
                    if (listViews.length >= dataSections.length) {
                        listViews.sort((a, b) => a.y - b.y);
                    }
                }
            })
        );
    }

    onScroll(e) {
        const { onScrollSection, dataTabs, isAnimatedHeader } = this.props;
        const { tabNamesRef, isPressToScroll } = this;
        const { selectedScrollIndex } = this.state;

        onScrollSection && onScrollSection(e);
        if (!isPressToScroll.current && isAnimatedHeader) {
            if (e.nativeEvent.contentOffset.y === 0) {
                tabNamesRef?.current?.scrollToOffset({
                    offset: 0,
                    animated: Platform.OS === 'ios',
                    viewPosition: 0.5,
                });
                this.setState({
                    selectedScrollIndex: 0,
                });
            } else if (isCloseToBottom(e.nativeEvent)) {
                const lastIndex = dataTabs.length - 1;
                tabNamesRef?.current?.scrollToIndex({
                    animated: Platform.OS === 'ios',
                    index: lastIndex,
                    viewPosition: 0.5,
                });
                this.setState({
                    selectedScrollIndex: lastIndex
                });
            } else {
                const res = binarySearch(listViews, e.nativeEvent.contentOffset.y);
                const indexToScrollTo = res.includes(-1)
                    ? listViews[Math.max(...res)]?.item?.index
                    : Math.max(listViews[res[0]]?.item?.index, listViews[res[1]]?.item?.index);
                if (indexToScrollTo && indexToScrollTo !== -1 && indexToScrollTo !== selectedScrollIndex) {
                    tabNamesRef?.current?.scrollToIndex({
                        animated: Platform.OS === 'ios',
                        index: indexToScrollTo,
                        viewPosition: 0.5,
                    });
                    this.setState({
                        selectedScrollIndex: indexToScrollTo
                    });
                }
            }
        }
    }

    render() {
        const {
            dataTabs,
            dataSections,
            isParent,
            tabPosition,
            customSectionProps,
            customTabNamesProps,
        } = this.props;
        const {
            tabScrollMainRef, isPressToScroll, dataSectionsChildren, dataTabNameChildren, tabNamesRef, onScroll
        } = this;
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
                            data={dataTabs.map((i, index) => ({ ...i, index }))}
                            {...customTabNamesProps}
                            ref={tabNamesRef}
                            keyExtractor={(item) => item.index}
                            keyboardShouldPersistTaps="always"
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={styles.horizontalTabStyle}
                            horizontal
                            renderItem={dataTabNameChildren}
                        />
                    ) : null}
                />
                {
                    (tabPosition === 'bottom' ? (
                        <Animated.FlatList
                            style={{ position: 'absolute', bottom: 0 }}
                            data={dataTabs.map((i, index) => ({ ...i, index }))}
                            {...customTabNamesProps}
                            ref={tabNamesRef}
                            keyExtractor={(item) => item.index}
                            keyboardShouldPersistTaps="always"
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={styles.horizontalTabStyle}
                            horizontal
                            renderItem={dataTabNameChildren}
                        />
                    ) : null)
                }
            </View>

        );
    }
}

ScrollableTabString.propTypes = {
    dataTabs: PropTypes.array,
    dataSections: PropTypes.array,
    isParent: PropTypes.bool,
    isAnimatedHeader: PropTypes.bool,
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
    dataTabs: [],
    isParent: false,
    isAnimatedHeader: true,
    tabPosition: 'top',
    selectedTabStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    unselectedTabStyle: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default ScrollableTabString;
