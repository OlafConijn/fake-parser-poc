import ts from "typescript";


export const printVariableType = (typeChecker: ts.TypeChecker, node: ts.Node, variableName: string) => {
  ts.forEachChild(node, child => {
    printVariableType(typeChecker, child, variableName);
    if (ts.isVariableDeclaration(child) && ts.isIdentifier(child.name)) {
      if (variableName == child.name.text) {
        const type = typeChecker.getTypeAtLocation(child);
        const typename = type.flags === 1 ? "error" : typeChecker.typeToString(type);
        console.log(`variable ${variableName.padEnd(10)} has type ${typename}`);
      }
    }
  });
};
