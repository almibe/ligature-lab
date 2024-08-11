import moo from 'moo'
import { Network, Slot, Statement, Value, Word } from './ligature'
import { inMemoryNetwork } from './in-memory-network'

const lexer = moo.compile({
    WS:          /[ \t]+/,
    number:      /0|[1-9][0-9]*/,
    word:        /[a-zA-Z0-9=][a-zA-Z0-9-_=.]*/,
    string:      /"(?:\\["\\]|[^\n"\\])*"/,
    opensquare:  '[',
    closesquare: ']',
    openbrace:   '{',
    closebrace:  '}',
    comma:       ',',
    NL:          { match: /\n/, lineBreaks: true },
  })

type Element = {word: Word, arguments: Value[]} | Network

type Error = string

const readWordSlot = (lexer): Word | Slot | Error => {
    throw "TODO"
}

const readValue = (lexer): Value | Error => {
    throw "TODO"
}

const readStatement = (lexer, entity): Statement | Error => {
    const attribute = readWordSlot(lexer)
    const value = readValue(lexer)
    throw "TODO"
}

export const parse = (input: string): Element[] => {
    const elements: Element[] = []
    console.log(lexer)
    lexer.reset(input)
    var cont = true
    while (cont) {
        const next = lexer.next()
        if (next == undefined) {
            cont = false
        } else if (next.type == "word") {
            //tokens.push({word: next.text})
            throw "TODO handle word call"
        } else if (next.type == "openbrace") {
            const contents = inMemoryNetwork()
            const next = lexer.next()
            if (next.type == "closebrace") {
                elements.push()
            } else {
                const statement = readStatement(lexer, next)
            }
            
            throw "TODO handle network literals"
        } else {
            throw "Unexpected token."
        }
    }
    return elements
}

// console.log(lexer)
// lexer.reset(input)
// var cont = true
// while (cont) {
//     const next = lexer.next()
//     if (next == undefined) {
//         cont = false
//     } else if (next.type == "number") {
//         tokens.push(BigInt(next.text))
//     } else if (next.type == "word") {
//         tokens.push({word: next.text})
//     } else if (next.type == "openbrace") {
//         throw "TODO handle network literals"
//     } else {
//         throw "Unexpected token."
//     }
// }
