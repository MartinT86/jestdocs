var glob = require("glob")

export const getTestFiles = async (): Promise<string[]> => {
    const listOne = await getFiles("**/?(*.)+(spec|test).[jt]s?(x)")
    const listTwo = await getFiles("**/__tests__/**/*.[jt]s?(x)")
    return [...listOne, ...listTwo]
}

const getFiles = async (globPattern: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        glob(globPattern, { realpath: true, ignore: ["**/node_modules/**", "**/jestdocsTests/*.test.ts"] }, function (er: any, files: string[]) {
            if (er) {
                console.log('glob error: ', er)
                return reject(er)
            }
            resolve(files)
        })
    })
}
