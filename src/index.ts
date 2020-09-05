import { parse } from "acorn";
import  { promises } from 'fs'

type DocResult = string[] 

const example = async (): Promise<DocResult> => {
    //need to read the file as a string
    const fileData = await promises.readFile('./test/two.test.ts')
  const parsed =  parse(fileData.toString(), { ecmaVersion: 2020 });
  return ['parsed']
};

export { example };
