import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ScrollableTabString from '../src';

const tabNames = [{
    title: 'Tab 1',
}, {
    title: 'Tab 2',
}, {
    title: 'Tab 3',
}, {
    title: 'Tab 4',
}, {
    title: 'Tab 5',
}, {
    title: 'Tab 6',
}];

const dataMain = [
    {
        name: 'Section 1',
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
        name: 'Section 2',
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
        name: 'Section 3',
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
        name: 'Section 4',
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
        name: 'Section 5',
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
        name: 'Section 6',
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
];

const ScrollableTabStringDemo = () => (
    <ScrollableTabString
        dataTabs={tabNames}
        dataSections={dataMain}
        renderSection={(item) => (
            <View>
                <Text>{item.name}</Text>
                {
                    item.data.map((i) => (
                        <Text key={i.id} style={{ padding: 20 }}>{i.name}</Text>
                    ))
                }
            </View>
        )}
        renderTabName={(item) => (
            <TouchableOpacity>
                <Text style={{ padding: 10 }}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        )}
        selectedTabStyle={{
            borderColor: 'black',
            borderRadius: 10,
            borderWidth: 1,
            margin: 10
        }}
        unselectedTabStyle={{
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    />
);

export default ScrollableTabStringDemo;
