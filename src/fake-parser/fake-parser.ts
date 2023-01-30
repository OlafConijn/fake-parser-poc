import ts, { factory } from "typescript";

//this function sets the pos & end of each node.
//  it also ensures that the sourcefile has the right amount of characters
function fixup(fakeSourceFile: ts.SourceFile): ts.SourceFile {
  const setPos = (node: ts.Node, start: number) => {
    let pos = Math.max(node.pos, start) + 1;
    (node as any).pos = pos;
    ts.forEachChild(node, node => { pos = setPos(node, pos + 1); });
    pos += 1;
    (node as any).end = pos;
    return pos;
  };
  let pos = 0;
  (fakeSourceFile as any).pos = pos;
  for (const statement of fakeSourceFile.statements) {
    pos = setPos(statement, pos);
  }
  (fakeSourceFile as any).end = pos;
  fakeSourceFile.text = Array(pos + 1).join('a');
  return fakeSourceFile; '';
}


export const createCompilerHostFromAst = (statements: ts.Statement[]) => {
  const sourceFile = fixup(factory.createSourceFile(statements, factory.createJSDocComment("") as any, ts.NodeFlags.None));
  (sourceFile as any).parseDiagnostics = [];
  ts.getParseTreeNode = (node: ts.Node | undefined) => node;
  let compilerOptions = { strict: false, target: ts.ScriptTarget.Latest, allowJs: true, module: ts.ModuleKind.Node16 } as ts.CompilerOptions;
  const host = ts.createCompilerHost(compilerOptions);
  const prevSourceFile = host.getSourceFile;
  host.getSourceFile = (filename: string, languageVersion: ts.ScriptTarget) => {
    if (filename === "fake.ts") return sourceFile;
    return prevSourceFile(filename, languageVersion);
  };
  const program = ts.createProgram(["fake.ts"], compilerOptions, host);
  const typeChecker = program.getTypeChecker();
  return { sourceFile, typeChecker, program };
};
