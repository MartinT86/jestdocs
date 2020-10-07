import { Describe, DocResult } from "./docBuilder"

export const reportBuilder = (projectName: string, docResults: DocResult[]) => {
    const header = `<h1>${projectName}</h1>`
    const lines = docResults.map(doc => {
        return buildLines(doc.describes)
    })
    return header + lines.join()
}

const buildLines = (describes: Describe[]) => {
    let lines = ''
    describes.forEach(d => {
        lines += `<h3>${d.name}</h3>`
        d.its.forEach(i => {
            lines += `<h4>${i.name}</h4>`
        })
        lines += buildLines(d.describes)
    })
    return lines
}