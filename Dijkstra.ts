export enum IsCalc {
    Not = 0,
    Yes = 1
}
export enum IsStart {
    Not = 0,
    Yes = 1
}
export enum IsEnd {
    Not = 0,
    Yes = 1
}

export type NodeName = string
export type Distance = number
export type Way = Array<Node>

export interface Node {
    name: string;
    start: IsStart;
    end: IsEnd;
    neighbor: {
        [name: NodeName]: Distance
    }
}

export type Collection = {
    [name: NodeName]: Node
}

export interface TableCtn {
    name: NodeName;
    way: Way;
    distance: Distance;
}

export type Table = {
    [name: NodeName]: TableCtn
};


let a: Node = {
    name: "a",
    start: IsStart.Yes,
    end: IsEnd.Not,
    neighbor: {
        b: 1,
        c: 2,
        d: 3
    }
}
let b: Node = {
    name: "b",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        e: 4
    }
}
let c: Node = {
    name: "c",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        e: 5,
        f: 6,
        g: 7,
    }
}
let d: Node = {
    name: "d",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        g: 8,
    }
}
let e: Node = {
    name: "e",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        h: 2,
    }
}
let f: Node = {
    name: "f",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        e: 9,
        g: 1,
        h: 3,
    }
}
let g: Node = {
    name: "g",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        z: 4,
    }
}
let h: Node = {
    name: "h",
    start: IsStart.Not,
    end: IsEnd.Not,
    neighbor: {
        z: 5,
    }
}
let z: Node = {
    name: "z",
    start: IsStart.Not,
    end: IsEnd.Yes,
    neighbor: {
    }
}

let _collection: Collection = {
    a: a,
    b: b,
    c: c,
    d: d,
    e: e,
    f: f,
    g: g,
    h: h,
    z: z,
};
let _table: Table = {
    a: {
        name: "a",
        way: [a],
        distance: 0
    }
};

function getWay(from: Node): Array<Node> {
    let neighbor: Array<Node> = [];
    for (const key in from.neighbor) {
        neighbor.push(_collection[key]);
        if (Object.prototype.hasOwnProperty.call(from.neighbor, key)) {
            if (!Object.prototype.hasOwnProperty.call(_table, key)) {
                let _way: Way = [..._table[from.name].way];
                _way.push(_collection[key]);
                _table[key] = {
                    name: key,
                    way: _way,
                    distance: _table[from.name].distance + from.neighbor[key],
                }
            } else {
                if (_table[from.name].distance + from.neighbor[key] < _table[key].distance) {
                    let _way: Way = [..._table[from.name].way];
                    _way.push(_collection[key]);

                    _table[key].way = _way;
                    _table[key].distance = _table[from.name].distance + from.neighbor[key];
                }
            }
        }
    }
    return neighbor;
}
let _start: Node = _collection.a;
let _quene: Array<Node> = [_start];
while (_quene.length > 0) {
    let _neighbor: Array<Node> = getWay(_quene.shift());
    while (_neighbor.length > 0) {
        _quene.push(_neighbor.shift())
    }
}

console.log(JSON.stringify(_table));

