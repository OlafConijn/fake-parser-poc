import ts from "typescript";
import { printVariableType } from "../util";
import { createCompilerHostFromFile } from "./typescipt-parser";

const { sourceFile, typeChecker, program } = createCompilerHostFromFile("./cat-dog.ts", "src/typescript-parser/");


console.log("typescript-parser.ts");
console.log();
console.log("before narrowing to either Cat or Dog");
printVariableType(typeChecker, sourceFile, "catName_0");
printVariableType(typeChecker, sourceFile, "dogName_0");
printVariableType(typeChecker, sourceFile, "age_0");

console.log();
console.log("after narrowing to Cat");
printVariableType(typeChecker, sourceFile, "catName_1");
printVariableType(typeChecker, sourceFile, "dogName_1");
printVariableType(typeChecker, sourceFile, "age_1");

console.log();
console.log("after narrowing to Dog");
printVariableType(typeChecker, sourceFile, "catName_2");
printVariableType(typeChecker, sourceFile, "dogName_2");
printVariableType(typeChecker, sourceFile, "age_2");
