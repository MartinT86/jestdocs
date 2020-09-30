var glob = require("glob")


export const getTestFiles = () => {
    return new Promise((resolve, reject) => {

        // options is optional
        glob( "**/?(*.)+(spec|test).[jt]s?(x)" , {realpath: true}, function (er: any, files: string[]) {
            if (er) {
                console.log('glog error: ', er)
                return reject(er)
            }
            console.log('files: ', files)
            resolve(files)
            // files is an array of filenames.
            // If the `nonull` option is set, and nothing
            // was found, then files is ["**/*.js"]
            // er is an error object or null.
        })

    })
}

