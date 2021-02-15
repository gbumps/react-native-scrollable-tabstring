import React, { Component } from 'react';
import {
    Animated,
    Platform,
    View
} from 'react-native';

import PropTypes from 'prop-types';

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

    static TAB_POSITION_TOP = 'top'
    static TAB_POSITION_BOTTOM = 'bottom'

    constructor(props) {
        super(props);
        this.state = {
            selectedScrollIndex: 0,
            isPressToScroll: false,
        };
        this.heightTabNames = 0;

        this.goToIndex = this.goToIndex.bind(this);
        this.dataTabNameChildren = this.dataTabNameChildren.bind(this);
        this.dataSectionsChildren = this.dataSectionsChildren.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        const { dataSections, dataTabs, isParent, tabPostion } = this.props;

        if (dataSections.length !== dataTabs.length && !isParent) {
            console.warn('The \'dataSections\' and \'dataTabs\''
            + ' length are not equal. This will cause some issues, especially when the section list is scrolling.'
            + ' Consider number of items of those lists to be equal, or add \'isParent\''
            + ' param if you are supporting parent tab - children sections');
        }
        
        if (tabPostion && 
            (tabPostion !== ScrollableTabString.TAB_POSITION_BOTTOM) 
            || 
            (tabPostion !== ScrollableTabString.TAB_POSITION_TOP)) 
        {
            console.warn('The tabPosition only accept \'top\' or \'bottom\' only !')
        } 
    }

    componentDidUpdate(prevProps) {
        const { dataSections } = this.props;

        if (dataSections.length > prevProps.dataSections.length) {
            console.warn('Are you loading more items on the dataSections ? This component does not support on load more yet !');
        }
    }

    goToIndex(item) {
        const { onPressTab } = this.props;

        this.setState({ isPressToScroll: true });

        const findMinYAxis = Math.min(...listViews.filter((i) => i.item.index === item.index).map((ii) => ii.y));
        const res = findMinYAxis && listViews.find((i) => i.y === findMinYAxis);

        this.tabScrollMainRef?.scrollTo({ animated: true, y: res?.y || 0 });
        this.setState({
            selectedScrollIndex: res?.item?.index || 0
        });

        onPressTab && onPressTab(item);
    }

    // map tab item
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
                    if (heightTabNames === 0) {
                        this.heightTabNames = e.nativeEvent.layout.height;
                    }
                }
            })
        );
    }

    // map section item
    dataSectionsChildren(item, index) {
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
        const { onScrollSection, dataTabs, headerTransitionWhenScroll } = this.props;
        const { selectedScrollIndex, isPressToScroll } = this.state;

        onScrollSection && onScrollSection(e);

        if (!isPressToScroll && headerTransitionWhenScroll) {
            try {
                if (e.nativeEvent.contentOffset.y === 0) {
                    this.tabNamesRef?.scrollToOffset({
                        offset: 0,
                        animated: Platform.OS === 'ios',
                        viewPosition: 0.5,
                    });

                    this.setState({
                        selectedScrollIndex: 0,
                    });
                } else if (isCloseToBottom(e.nativeEvent)) {
                    const lastIndex = dataTabs.length - 1;

                    this.tabNamesRef?.scrollToIndex({
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
                        : Math.max(
                            listViews[res[0]]?.item?.index,
                            listViews[res[1]]?.item?.index
                        );

                    if (
                        indexToScrollTo
                        && indexToScrollTo !== -1
                        && indexToScrollTo !== selectedScrollIndex) {
                        this.tabNamesRef?.scrollToIndex({
                            animated: Platform.OS === 'ios',
                            index: indexToScrollTo,
                            viewPosition: 0.5,
                        });

                        this.setState({
                            selectedScrollIndex: indexToScrollTo
                        });
                    }
                }
            } catch (err) {
                console.warn('err: ', err);
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
        return (
            <>
                <Animated.ScrollView
                    {...customSectionProps}
                    scrollEventThrottle={16}
                    ref={(ref) => { this.tabScrollMainRef = ref; }}
                    bounces={false}
                    onScrollBeginDrag={() => this.setState({ isPressToScroll: false })}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                    onScroll={this.onScroll}
                    stickyHeaderIndices={tabPosition === 'top' ? [0] : null}
                >
                    {
                        (tabPosition === 'top' ? (
                            <View>
                                <Animated.FlatList
                                    data={dataTabs.map((i, index) => ({ ...i, index }))}
                                    nestedScrollEnabled
                                    keyboardShouldPersistTaps="always"
                                    {...customTabNamesProps}
                                    ref={(ref) => { this.tabNamesRef = ref; }}
                                    keyExtractor={(item) => item.index}
                                    contentContainerStyle={{
                                        backgroundColor: 'white',
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                    bounces={false}
                                    horizontal
                                    renderItem={this.dataTabNameChildren}
                                />
                            </View>
                        ) : null)
                    }
                    <View>
                        { (isParent ? dataSections : dataSections.map((i, index) => ({ ...i, index }))).map(this.dataSectionsChildren) }
                    </View>
                </Animated.ScrollView>
                {
                    (tabPosition === 'bottom' ? (
                        <View>
                            <Animated.FlatList
                                style={{ position: 'absolute', bottom: 0 }}
                                keyboardShouldPersistTaps="always"
                                nestedScrollEnabled
                                data={dataTabs.map((i, index) => ({ ...i, index }))}
                                {...customTabNamesProps}
                                contentContainerStyle={{
                                    backgroundColor: 'white',
                                }}
                                ref={(ref) => { this.tabNamesRef = ref; }}
                                keyExtractor={(item) => item.index.toString()}
                                showsHorizontalScrollIndicator={false}
                                bounces={false}
                                horizontal
                                renderItem={this.dataTabNameChildren}
                            />
                        </View>

                    ) : null)
                }
            </>
        );
    }
}

ScrollableTabString.propTypes = {
    dataTabs: PropTypes.array,
    dataSections: PropTypes.array,
    isParent: PropTypes.bool,
    headerTransitionWhenScroll: PropTypes.bool,
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
    headerTransitionWhenScroll: true,
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
