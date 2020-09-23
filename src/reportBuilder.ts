import { Describe, DocResult } from "./docBuilder"

export const reportBuilder = (projectName: string, docResult: DocResult) => {
    const header = `<h1>${projectName}</h1>`
    const body = buildLines(docResult.describes, '')
    return header + body
}

const buildLines = (describes: Describe[], lines: string) => {
    describes.forEach(d => {
        lines += `<h3>${d.name}</h3>`
        d.its.forEach(i => {
            lines += `<h4>${i.name}</h4>`
        })
        lines += buildLines(d.describes, lines)
    })
    return lines
}