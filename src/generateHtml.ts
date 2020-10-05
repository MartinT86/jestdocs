import { promises } from "fs";
import { getDocs } from "./docBuilder";
import { getTestFiles } from "./getTestFiles";
import { reportBuilder } from "./reportBuilder";

export const generateHtml = async () => {
    const files = await getTestFiles()
    const docData = await getDocs(files[0])

    //TODO: need to figure out how to map over async
    // const blah = files.map(file => {
    //     return getDocs(file)
    // })
    // const docData = await Promise.all(files.map(file => {
    //     return getDocs(file)
    // }))
    const report = reportBuilder('Project Name', [docData])
    await promises.writeFile('./test.html', report)
}