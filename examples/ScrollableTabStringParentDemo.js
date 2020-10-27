import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../..';
import Text from '../typography';
import ScrollableTabString from './ScrollableTabString';

const tabNames = [{
    title: 'Tab 1',
    index: 0
}, {
    title: 'Tab 2',
    index: 1
}, {
    title: 'Tab 3',
    index: 2
}, {
    title: 'Tab 4',
    index: 3
}, {
    title: 'Tab 5',
    index: 4
}, {
    title: 'Tab 6',
    index: 5
}];

const dataMain = [
    {
        name: 'Section 1 - Tab 1',
        index: 0,
        data: [
            {
                id: '0',
                name: 'Section 1 - 1',
            },
            {
                id: '1',
                name: 'Section 1 - 2',
            },
            {
                id: '2',
                name: 'Section 1 - 3',
            },
            {
                id: '3',
                name: 'Section 1 - 4',
            },
            {
                id: '4',
                name: 'Section 1 - 5',
            },
        ]
    },
    {
        name: 'Section 2 - Tab 1',
        index: 0,
        data: [
            {
                id: '5',
                name: 'Section 2 - 1',
            },
            {
                id: '6',
                name: 'Section 2 - 2',
            },
            {
                id: '7',
                name: 'Section 2 - 3',
            },
            {
                id: '8',
                name: 'Section 2 - 4',
            },
            {
                id: '9',
                name: 'Section 2 - 5',
            },
        ]
    },
    {
        name: 'Section 3 - Tab 2',
        index: 1,
        data: [
            {
                id: '10',
                name: 'Section 3 - 1',
            },
            {
                id: '11',
                name: 'Section 3 - 2',
            },
        ]
    },
    {
        name: 'Section 4 - Tab 2',
        index: 1,
        data: [
            {
                id: '15',
                name: 'Section 4 - 1',
            },
            {
                id: '16',
                name: 'Section 4 - 2',
            },
            {
                id: '17',
                name: 'Section 4 - 3',
            },
        ]
    },
    {
        name: 'Section 5 - Tab 3',
        index: 2,
        data: [
            {
                id: '18',
                name: 'Section 5 - 1',
            },
            {
                id: '19',
                name: 'Section 5 - 2',
            },
            {
                id: '20',
                name: 'Section 5 - 3',
            },
            {
                id: '21',
                name: 'Section 5 - 2',
            },
            {
                id: '22',
                name: 'Section 5 - 3',
            },
        ]
    },
    {
        name: 'Section 6 - Tab 3',
        index: 2,
        data: [
            {
                id: '18',
                name: 'Section 5 - 1',
            },
            {
                id: '19',
                name: 'Section 5 - 2',
            },
            {
                id: '20',
                name: 'Section 5 - 3',
            },
            {
                id: '21',
                name: 'Section 5 - 2',
            },
            {
                id: '22',
                name: 'Section 5 - 3',
            },
        ]
    },
    {
        name: 'Section 7 - Tab 4',
        index: 3,
        data: [
            {
                id: '18',
                name: 'Section 5 - 1',
            },
            {
                id: '19',
                name: 'Section 5 - 2',
            },
        ]
    },
    {
        name: 'Section 8 - Tab 4',
        index: 3,
        data: [
            {
                id: '18',
                name: 'Section 5 - 1',
            },
            {
                id: '19',
                name: 'Section 5 - 2',
            },
            {
                id: '20',
                name: 'Section 5 - 3',
            },
            {
                id: '21',
                name: 'Section 5 - 2',
            },
            {
                id: '22',
                name: 'Section 5 - 3',
            },
        ]
    },
    {
        name: 'Section 9 - Tab 5',
        index: 4,
        data: [
            {
                id: '18',
                name: 'Text',
            },
            {
                id: '19',
                name: 'Text',
            },
            {
                id: '20',
                name: 'Text',
            },
            {
                id: '21',
                name: 'Text',
            },
            {
                id: '22',
                name: 'Text',
            },
        ]
    },
    {
        name: 'Section 10 - Tab 5',
        index: 4,
        data: [
            {
                id: '18',
                name: 'Text',
            },
            {
                id: '19',
                name: 'Text',
            },
        ]
    },
    {
        name: 'Section 11 - Tab 6',
        index: 5,
        data: [
            {
                id: '18',
                name: 'Text',
            },
            {
                id: '19',
                name: 'Text',
            },
            {
                id: '20',
                name: 'Text',
            },
            {
                id: '21',
                name: 'Text',
            },
            {
                id: '22',
                name: 'Text',
            },
        ]
    },
    {
        name: 'Section 12 - Tab 6',
        index: 5,
        data: [
            {
                id: '18',
                name: 'Text',
            },
            {
                id: '19',
                name: 'Text',
            },
        ]
    },
];

const ScrollableTabStringDemo = () => (
    <ScrollableTabString
        isParent
        dataTabNames={tabNames}
        dataSections={dataMain}
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
            contentContainerStyle: {
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
            }
        }}
    />
);

export default ScrollableTabStringDemo;
