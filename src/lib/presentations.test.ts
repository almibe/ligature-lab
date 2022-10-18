import { Value, readIdentifier, wanderResultToPresentation, resultToTableData, type Identifier } from './presentation';

test('Read Identifier', () => {
    let input = "<a>";
    let expected = {identifier: "a"};
    expect(readIdentifier({input, location:0})).toEqual(expected);
});

test('Read basic Statement', () => {
    let input = "<a> <b> <c>";
    let expected = {
        data: [
            {"id": 1, "<entity>": "a", "b": "<c>"},
        ],
        columns: [
            {title:"Entity", field:"<entity>", sorter:"string"},
            {title:"b", field:"b", sorter: "string"}
        ]
    };
    expect(wanderResultToPresentation(input).tableView()).toEqual(expected);
});

// test('Read multiple Statements aobut a single Entity', () => {
//     let input = "<a> <b> <c>\n<a> <b> <e>";
//     let expected = new Map<Identifier, Map<Identifier, Set<Value>>>();
//     let bMap = new Map<Identifier, Set<Value>>();
//     let values = new Set<Value>();
//     values.add({identifier: "c"});
//     values.add({identifier: "e"});
//     bMap.set({identifier: "b"}, values);
//     expected.set({identifier:"a"}, bMap);

//     console.log(wanderResultToPresentation(input));
//     console.log(expected);
//     expect(wanderResultToPresentation(input)).toEqual(expected);
// });
