import React from 'react'

import { StyleProp, ViewStyle, FlatListProps, StyleProp, FlatListProps } from 'react-native';

interface ScrollableTabStringProps {
    dataTabs: Array<Object>,
    dataSections: Array<Object>,
    isParent: boolean,
    headerTransitionWhenScroll: boolean,
    tabPosition?: 'top' | 'bottom',
    customTabNamesProps: FlatListProps<Object>,
    customSectionProps: FlatListProps<Object>,
    selectedTabStyle: StyleProp<ViewStyle>,
    unselectedTabStyle: StyleProp<ViewStyle>,
    onPressTab: Function,
    onScrollSection: Function,
    renderSectionItem: Function,
    renderTabNameItem: Function,
  }
  
  export class ScrollableTabString extends React.Component<ScrollableTabStringProps> { }
  