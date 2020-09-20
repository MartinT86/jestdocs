import { promises } from "fs";

export const reportBuilder = (projectName: string) => {
    return `<h1>${projectName}</h1>`
}