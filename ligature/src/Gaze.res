// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

type gaze<'i> =
    { content: array<'i>,
      mutable offset: int }

type gazeError = | NoMatch

type nibbler<'i, 'o> = gaze<'i> => result<'o, gazeError>

let explode = (input: string): array<string> => %raw(`[...input]`)

// Create an instance of Gaze that works with a String as input.
let fromString = (input: string) =>
    { content: explode(input),
      offset: 0 }

let fromArray = (array) => { content: array, offset: 0 }

let isComplete = (gaze: gaze<'i>) =>
    gaze.offset >= Array.length (gaze.content)

let peek = (gaze: gaze<'i>) : result<'i, gazeError> =>
    if isComplete(gaze) {
        Error(NoMatch)
    } else {
        Ok(gaze.content->Array.getUnsafe(gaze.offset))
    }

let next = (gaze: gaze<'i>) : result<'i, gazeError> =>
    if isComplete(gaze) {
        Error(NoMatch)
    } else {
        let result = gaze.content->Array.getUnsafe(gaze.offset)
        gaze.offset = gaze.offset + 1
        Ok(result)
    }

// let check = (nibbler: nibbler<'i, 'o>, gaze: gaze<'i>) => {
//     let startOffset = gaze.offset
//     let res = nibbler(gaze)
//     gaze.offset <- startOffset
//     res
// }

let attempt = (nibbler, gaze: gaze<'i>) => {
    let startOffset = gaze.offset

    switch nibbler(gaze) {
    | Ok(res) => Ok(res)
    | Error(err) =>
        gaze.offset = startOffset
        Error(err)
    }
}

// let offset (gaze: Gaze<_>) = gaze.offset

// let map (nibbler: Nibbler<_, _>) mapper (gaze: Gaze<_>) =
//     match attempt nibbler gaze with
//     | Ok(result) -> Ok(mapper (result))
//     | Error(err) -> Error(err)

// let remaining (gaze: Gaze<_>) = gaze.content[gaze.offset]