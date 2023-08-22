export type error = {
    error: string
}

export type Identifier = {
    identifier: string
}

export type Value = string | Identifier

export type State = {
    input: string,
    location: number
}

export type Statement = [Identifier, Identifier, Value]

type Node = string
type Edge = [Node, Node, {label: string}]

type Data = { id: number }
type Column = { title: string, field: string, sorter: string }

type TableData = { columns: Array<Column>, data: Array<Data> };
type GraphData = {nodes: Array<Node>, edges: Array<Edge>};
type Presentation = { tableData: TableData, graphData: GraphData };

export class StatementsPresentation {
    private store: Array<Statement> = [];

    public addStatement(statement: Statement): void {
        if (!this.store.find((s) => (statement[0] == s[0] && statement[1] == s[1] && statement[2] == s[2]))) {
            this.store.push(statement);
        }
    }

    public presentation(): Presentation {
        return { tableData: this.tableView(), graphData: this.graphElements()};
    }

    public tableView(): TableData {
        let columns: Array<Column> = [{title:"Entity", field:"<entity>", sorter:"string"}];
        let data: Array<Data> = [];
        let index = 0; //index used for tabulator

        this.store.forEach((statement: Statement) => {
            let columnName = statement[1].identifier;
            if (!columns.find((column) => column.title == columnName)) {
                columns.push({title: columnName, field: columnName, sorter:"string"});
            }

            let entity = statement[0].identifier;
            let match = data.find((d) => d["<entity>"] == entity)
            if (match) {
                if (columnName in match) {//  if so check if column exists
                    if (typeof match[columnName] == 'array') {
                        match[columnName].push(this.writeValue(statement[2]));
                    } else {
                        let oldValue = match[columnName];
                        match[columnName] = [oldValue, this.writeValue(statement[2])];
                    }
                    //if so make column a list (or add to list if it already exists)
                    //or maybe throw an error if showing a list is weird
                } else {
                    match[columnName] = this.writeValue(statement[2]); //this is wrong
                }
            } else {
                index++;
                let newRow = {id: index, "<entity>": entity};
                newRow[columnName] = this.writeValue(statement[2]); //this is wrong
                data.push(newRow);
            }
        });

        return {
            columns, 
            data
        };
    }

    public graphElements(): GraphData {
        let nodes: Set<Node> = new Set()
        let edges: Array<Edge> = []

        this.store.forEach((statement) => {
            let entity = this.writeValue(statement[0])
            let value = this.writeValue(statement[2])
            nodes.add(entity);
            nodes.add(value);
            edges.push([entity, value, {label: statement[1].identifier}])
            // result.push({data: {id: entity}})
            // result.push({data: {id: value}})
            // result.push({data: {label: statement[1].identifier, source: entity, target: value}})
        })
        return {nodes: Array.from(nodes), edges};
    }

    private writeValue(value: Value): string {
        if (typeof value == 'object' && 'identifier' in value) {
            return "<" + value.identifier + ">";
        } else {
            return value;
        }
    }
}

type BooleanValue = { "Boolean": boolean };
type StringValue = { "String": string };
type GraphValue = {};
type WanderValue = BooleanValue | StringValue;

function jsonToValue(value: any): Value {
    console.log("in jsonToValue")
    if ("String" in value) {
        return value["String"];
    } else if ("Identifier" in value) {
        return { identifier: value["Identifier"] };
    } else if ("Integer" in value) {
        return value["Integer"].toString();
    } else {
        throw new Error();
    }
}

/**
 * @param input - the result of the Wander query 
 * @returns - an object that can be used as a datasource for the table or graph display
 * 
 * Examples:
 *  Scalars (just return the Scalar):
 *   input:  5
 *   output: 5
 * 
 *  Graph:
 *   input:
 *    <a> <b> <c>
 *    <a> <bb> <cc>
 *    <b> <e> <f>
 *   output:
 *    {
 *      columns: [
 *        {title:"Entity", field:"<entity>", sorter:"string"},  //use <entity> as a field name so it's unique
 *        {title:"b", field:"b", sorter:"string"},
 *        {title:"bb", field:"bb", sorter:"string"},
 *        {title:"e", field:"e", sorter:"string"}, 
 *      ],
 *      data: [
 *        {"id": 1, "<entity>": "<a>", "b": "<c>", "bb": "<cc>", "e" null},
 *        {"id": 2, "<entity>": "<b>", "b": null, "bb": null, "e": "<f>"}
 *      ]
 *    }
 */
export function wanderResultToPresentation(input: WanderValue): Presentation | error {
    let result = new StatementsPresentation();

    if (input["Graph"] == undefined) {
        return result.presentation();
    }

    for (let statement of input["Graph"]["statements"]) {
        let entity: Identifier = { identifier: statement.entity };
        let attribute: Identifier = { identifier: statement.attribute };
        let value: Value = jsonToValue(statement.value);
        result.addStatement([entity, attribute, value]);
    }
    console.log(result.presentation());
    return result.presentation();
}
