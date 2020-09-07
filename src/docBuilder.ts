import { promises } from "fs";
import { parse } from "@babel/parser";
import { Statement, ExpressionStatement, CallExpression, StringLiteral } from "@babel/types";

type DocResult = string[];

const getExpressions = (statement: Statement) => {
  return (
    statement.type === "ExpressionStatement" &&
    statement.expression.type === "CallExpression" &&
    statement.expression.callee.type === 'Identifier' &&
    statement.expression.callee.name === 'describe'
  );
};

const getDescribeText = (statement: Statement):string => {
  const expressionStatement = statement as ExpressionStatement
  const callExpression = expressionStatement.expression as CallExpression
  const stringLiteral = callExpression.arguments[0] as StringLiteral
  return stringLiteral.value
}

const getDocs = async (filePath: string): Promise<DocResult> => {
  const fileData = await promises.readFile(filePath);
  const parsed = parse(fileData.toString());
  const describeExpressions = parsed.program.body.filter(getExpressions) as Statement[];
  return describeExpressions.map(getDescribeText);
};

export { getDocs };
