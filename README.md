# react-native-scrollable-tabstring

Scrollable list with animated horizontal tab when scrolling

Parent Tab and Children Section are supported 

<img src="https://media.giphy.com/media/4vMWOXJFB8Jks2K3Fl/giphy.gif" />


## Installation 
Install the dependency.
```sh
$ npm install react-native-scrollable-tabstring
```
```sh
$ yarn add react-native-scrollable-tabstring
```

## Usage

Start using the components or try it on Snack
[here](https://snack.expo.io).

```js
import ScrollableTabString from 'react-native-scrollable-tabstring';
//Standard scrollable tab
<ScrollableTabString
    onPressTab={() => yourCustomOnPressIfNeeded}
    dataTabNames={yourTabNamesList}
    dataSections={yourDataSectionList}
    renderSection={(item) => yourCustomSectionItemRender} 
    renderTabName={(item) => yourCustomSectionTabName}
    selectedTabStyle={{
        ...your custom styles when a Tab is scrolled to or selected
    }}
    unselectedTabStyle={{
        ...your custom styles when a Tab is normal
    }}
/>

//Scrollable tab with parent tab - children sections
<ScrollableTabString
    isParent
    onPressTab={() => yourCustomOnPressIfNeeded}
    dataTabNames={yourTabNamesList}
    dataSections={yourDataSectionList}
    renderSection={(item) => yourCustomSectionItemRender} 
    renderTabName={(item) => yourCustomSectionTabName}
    selectedTabStyle={{
        ...your custom styles when a Tab is scrolled to or selected
    }}
    unselectedTabStyle={{
        ...your custom styles when a Tab is normal
    }}
/>
```

## Props
    [dataTabNames] (#dataTabNames)
    [dataSections] (#dataSections)
    [isParent] (#isParent)
    [tabPosition] (#tabPosition),
    [renderSectionItem] (#renderSectionItem)
    [renderTabNameItem] (#renderTabNameItem)
    [customTabNamesProps] (#customTabNamesProps)
    [customSectionProps] (#customSectionProps)
    [onPressTab] (#onPressTab)
    [onScrollSection] (#onScrollSection)
    [selectedTabStyle] (#selectedTabStyle)
    [unselectedTabStyle] (#unselectedTabStyle)

## Example
### Scrollable tab

Display a basic customizable scrollable tab

Length of `dataTabNames` and `dataSections` must equal, otherwise may result in incorrect scrolling order

<img src="https://media.giphy.com/media/4vMWOXJFB8Jks2K3Fl/giphy.gif" />

```js
   const tabNames = [{
    title: 'Tab 1',
},
...................
{
    title: 'Tab 6',
}];

const dataSections = [
    {
        name: 'Section 1',
        data: [..........]
    },
    ...............
    {
        name: 'Section 6',
        data: [..........]

    },
];

const ScrollableTabStringDemo = () => (
    <ScrollableTabString
        dataTabNames={tabNames}
        dataSections={dataSections}
        renderSection={(item) => (
            <View>
                <Text.H3>{item.name}</Text.H3>
                {
                    item.data.map((i) => (
                        <Text key={i.id} style={{ padding: 20 }}>{i.name}</Text>
                    ))
                }
            </View>
        )}
        renderTabName={(item) => (
            <TouchableOpacity>
                <Text.H4 style={{ padding: 10 }}>
                    {item.title}
                </Text.H4>
            </TouchableOpacity>
        )}
        selectedTabStyle={{
            borderColor: Colors.brown_grey,
            borderRadius: 10,
            borderWidth: 1,
            margin: 10
        }}
        unselectedTabStyle={{
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    />
);
```

### Scrollable tab with parent tab

Scrollable tab with parent tab - children section 

Remember to map exact parent index with child index from both lists, all must be sorted by index from 0 and add param `isParent=true` 

For example Tab 1 has 2 children sections. They are Section 1 and Section 2 -> index of Tab 1, Section 1 and 2 are 0

<img src="https://media.giphy.com/media/XOgtvUrZd2xxE3W1vu/giphy.gif" />

```js 
const tabNames = [{
    title: 'Tab 1',
    index: 0
}
.....
, {
    title: 'Tab 6',
    index: 5
}];

const dataSections = [
    {
        name: 'Section 1',
        index: 0,
        data: [..........]
    },
    {
        name: 'Section 2',
        index: 0,
        data: [..........]
    },
    {
        name: 'Section 3',
        index: 1,
        data: [..........]
    },
    {
        name: 'Section 4',
        index: 1,
        data: [..........]
    },
    {
        name: 'Section 5',
        index: 2,
        data: [..........]
    },
    {
        name: 'Section 6',
        index: 2,
        data: [..........]
    },
    {
        name: 'Section 7',
        index: 3,
        data: [..........]
    },
    {
        name: 'Section 8',
        index: 4,
        data: [..........]
    },
];

const ScrollableTabStringDemo = () => (
    <ScrollableTabString
        isParent
        dataTabNames={tabNames}
        dataSections={dataSections}
        renderSection={(item) => (
            <View>
                <Text.H3>{item.name}</Text.H3>
                {
                    item.data.map((i) => (
                        <Text key={i.id} style={{ padding: 20 }}>{i.name}</Text>
                    ))
                }
            </View>
        )}
        renderTabName={(item) => (
            <TouchableOpacity>
                <Text.H4 style={{ padding: 10 }}>
                    {item.title}
                </Text.H4>
            </TouchableOpacity>
        )}
        selectedTabStyle={{
            borderColor: Colors.brown_grey,
            borderRadius: 10,
            borderWidth: 1,
            margin: 10
        }}
        unselectedTabStyle={{
            backgroundColor: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    />
);
```
## Conclusion




