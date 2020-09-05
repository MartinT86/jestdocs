// import { parse } from "acorn";
import  { promises } from 'fs'
import {parse} from '@babel/parser'

type DocResult = string[] 

const example = async (): Promise<DocResult> => {
    const fileData = await promises.readFile('./test/two.test.ts')

    const parsed = parse(fileData.toString())
  // const parsed =  parse(fileData.toString(), { ecmaVersion: 2020 });
  
  return ['Name of the group example']
};

export { example };
