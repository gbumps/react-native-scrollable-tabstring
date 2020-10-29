<p align="left">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://aleen42.github.io/badges/src/eslint.svg"><img src="https://aleen42.github.io/badges/src/eslint.svg"></a>
</p>

<img src="https://media.giphy.com/media/4vMWOXJFB8Jks2K3Fl/giphy.gif" />

A ScrollView-like component with animated horizontal tab when scrolling

# Get started

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
    dataTabs={yourTabNamesList}
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

## Component Detail
This component currently support tab list for **horizontal** side and vertical section list. Both of which are __**[Flatlist](https://facebook.github.io/react-native/docs/flatlist)**__

(*) Remember to avoid item like `renderItem`, `data`, `ref`, `onScroll` as may result in incorrect scrolling order or app crash.
(**) Default of selectedTabStyle 
```js
    {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
```
(***) Default of unselectedTabStyle
```js
    {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
```
| Property            | Type    | Required | Description |
| ------------------- | ------- | -------- | ----------- |
| dataTabs            | Array   | Yes      | A tab list to represent |
| dataSections        | Array   | Yes      | A Section list to represent |
| isParent            | Boolean | No       | A key to render Parent tab - children section, Default to `false` |
| isAnimatedHeader    | Boolean | No       | Animation at tab header when section scrolling, Default to `true` |
| tabPosition         | String  | No       | Tab list position arrangement, `top` and `bottom`, Default to `top` |
| renderSectionItem   | Func    | Yes      | Function to render Section Item, equal to [renderItem](https://reactnative.dev/docs/flatlist#renderitem) in `Flatlist` |
| renderTabNameItem   | Func    | Yes      | Function to render Tab Item, equal to [renderItem](https://reactnative.dev/docs/flatlist#renderitem) in `Flatlist` |
| customTabNamesProps | Object  | No       | Custom `Flatlist` Props (*) |
| customSectionProps  | Object  | No       | Custom `Flatlist` Props (*) |
| onPressTab          | Func    | No       | Custom function when pressing on a tab |
| onScrollSection     | Func    | No       | Custom function when scrolling |
| selectedTabStyle    | Object  | No       | Custom style when a tab is selected (**) |
| unselectedTabStyle  | Object  | No       | Custom style when a tab is unselected (***) | 

## Example
### Scrollable tab

Display a basic customizable scrollable tab

Length of `dataTabs` and `dataSections` must equal, otherwise may result in incorrect scrolling order

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
        dataTabs={tabNames}
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
        dataTabs={tabNames}
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
## Contributing
All contributions are welcome! Please open an issue if you get stuck and bugs, or open a pull request if you have any feature idea, i'm very appreciate. 

## License
MIT




