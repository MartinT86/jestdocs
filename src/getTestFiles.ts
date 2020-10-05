var glob = require("glob")

export const getTestFiles = async (): Promise<string[]> => {
    const listOne = await getFiles("**/?(*.)+(spec|test).[jt]s?(x)")
    const listTwo = await getFiles("**/__tests__/**/*.[jt]s?(x)")
    return [...listOne, ...listTwo]
}

const getFiles = async (globPattern: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        glob(globPattern, { realpath: true, ignore: ["**/node_modules/**"] }, function (er: any, files: string[]) {
            if (er) {
                console.log('glog error: ', er)
                return reject(er)
            }
            console.log('files: ', files)
            resolve(files)
        })
    })
}
