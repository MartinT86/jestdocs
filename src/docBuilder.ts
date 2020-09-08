import { promises } from "fs";
import { parse } from "@babel/parser";
import {
  Statement,
  ExpressionStatement,
  CallExpression,
  StringLiteral,
  ArrowFunctionExpression,
  BlockStatement,
} from "@babel/types";

export type DocResult = {
  fileName: string;
  describe: Describe;
};

type Describe = {
  name: string;
  it: It;
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

const getDescribeText = (
  docResult: DocResult,
  statement: Statement
): DocResult => {
  const expressionStatement = statement as ExpressionStatement;
  const callExpression = expressionStatement.expression as CallExpression;
  const stringLiteral = callExpression.arguments[0] as StringLiteral;
  const stringValue = stringLiteral.value;

  const itValue = (((((callExpression.arguments[1] as ArrowFunctionExpression)
    .body as BlockStatement)
    .body[0] as ExpressionStatement)
    .expression as CallExpression)
    .arguments[0] as StringLiteral)
    .value

  return {
    ...docResult,
    describe: {
      name: stringValue,
      it: {
        name: itValue
      }
    },
  } as DocResult;
};

const getDocs = async (filePath: string): Promise<DocResult> => {
  const fileData = await promises.readFile(filePath);
  const parsed = parse(fileData.toString(), { sourceFilename: filePath });
  const describeExpressions = parsed.program.body.filter(
    getExpressions
  ) as Statement[];
  return describeExpressions.reduce<DocResult>(getDescribeText, {
    fileName: filePath,
    describe: {
      name: "describe name",
      it: {
        name: "it name",
      },
    },
  });
};

export { getDocs };
