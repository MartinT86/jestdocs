import { promises } from "fs";
import { parse } from "@babel/parser";
import {
  Statement,
  ExpressionStatement,
  CallExpression,
  StringLiteral,
  ArrowFunctionExpression,
  BlockStatement, expressionStatement, Identifier
} from "@babel/types";

export type DocResult = {
  fileName: string;
  describes: Describe[];
};

type Describe = {
  name: string;
  describes: Describe[]
  its: It[]
};

type It = {
  name: string;
};

const getExpressions = (statement: Statement) => {
  return (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "CallExpression" &&
    statement.expression.callee.type === "Identifier" &&
    statement.expression.callee.name === "describe"
  );
};

const filterIts = (exp: ExpressionStatement) => {
  return filterByType(exp, 'it')
}

const filterDescribes = (exp: ExpressionStatement) => {
  return filterByType(exp, 'describe')
}

const filterByType = (exp: ExpressionStatement, type: string) => {
  const expression = exp.expression as CallExpression
  const callee = (expression.callee as Identifier).name
  return callee === type
}

const getDescribeArray = (describeArray: Describe[], statement: Statement): Describe[] => {
  const expressionStatement = statement as ExpressionStatement;
  const callExpression = expressionStatement.expression as CallExpression;
  const stringLiteral = callExpression.arguments[0] as StringLiteral;
  const stringValue = stringLiteral.value;

  const bodyExpressions = (((callExpression.arguments[1] as ArrowFunctionExpression)
    .body as BlockStatement)
    .body as ExpressionStatement[])

  const describeValues = bodyExpressions.filter(filterDescribes).reduce<Describe[]>(getDescribeArray, [])

  const itValues = bodyExpressions.filter(filterIts).map(exp => {
    const expression = exp.expression as CallExpression
    return { name: (expression.arguments[0] as StringLiteral).value }
  })

  const describe: Describe = {
    name: stringValue,
    describes: describeValues,
    its: itValues
  }
  return [...describeArray, describe]
}

const getDocs = async (filePath: string): Promise<DocResult> => {
  const fileData = await promises.readFile(filePath);
  const parsed = parse(fileData.toString(), { sourceFilename: filePath });
  const describeExpressions = parsed.program.body.filter(
    getExpressions
  ) as Statement[];

  const describes = describeExpressions.reduce<Describe[]>(getDescribeArray, [])

  const result: DocResult = {
    fileName: filePath,
    describes
  }

  return result
};

export { getDocs };
