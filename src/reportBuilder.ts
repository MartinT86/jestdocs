import { Describe, DocResult } from "./docBuilder"

export const reportBuilder = (projectName: string, docResults: DocResult[]) => {
    const header = `<h1>${projectName}</h1>`
    const lines = docResults.map(doc => {
        return buildLines(doc.describes)
    })
    return header + lines.join()
}

//TODO: buildlines seems to be duplicating
const buildLines = (describes: Describe[]) => {
    let linesBlah = ''
    describes.forEach(d => {
        linesBlah += `<h3>${d.name}</h3>`
        d.its.forEach(i => {
            linesBlah += `<h4>${i.name}</h4>`
        })
        linesBlah += buildLines(d.describes)
    })
    return linesBlah
}