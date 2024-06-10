// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

@genType
type rec wanderValue =
    | String(string) 
    | Int(bigint) 
    | Identifier(Ligature.identifier) 
    | Network(array<statement>)
    | Bytes(Js.TypedArray2.Uint8Array.t)
    | HostFunction
    | Lambda

@genType
and statement = (Ligature.identifier, Ligature.identifier, wanderValue)

module StatementComparator =
  Belt.Id.MakeComparableU({
    type t = statement
    let cmp = (statement0, statement1) =>{
        let (e0, a0, v0) = statement0
        let (e1, a1, v1) = statement1
        let res = Pervasives.compare(e0, e1)
        if res == 0 {
            let res = Pervasives.compare(a0, a1)
            if (res == 0) {
                Pervasives.compare(v0, v1)
            } else {
                res
            }
        } else {
            res
        }
    }
  })

@genType
type network = Belt.Set.t<statement, StatementComparator.identity>

let emptyNetwork = Belt.Set.make(~id=module(StatementComparator))

let networkFromArray = (array) =>
    Belt.Set.fromArray(array, ~id=module(StatementComparator))
