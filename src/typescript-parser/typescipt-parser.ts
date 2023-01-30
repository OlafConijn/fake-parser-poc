import ts from "typescript";
import { existsSync, readFileSync } from "fs";
import path from "path";

export const createCompilerHostFromFile = (filePath: string, rootDirectory: string = process.cwd()) => {
  let compilerOptions = { strict: false, target: ts.ScriptTarget.Latest, allowJs: true, module: ts.ModuleKind.Node16 } as ts.CompilerOptions;
  const fullfilePath = path.resolve(rootDirectory, filePath);
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => [fullfilePath],
    getScriptVersion: () => "1",
    getScriptSnapshot: fileName => {
      if (!existsSync(fileName)) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => rootDirectory,
    getCompilationSettings: () => compilerOptions,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
  const program = services.getProgram()!;
  const sourceFile = program.getSourceFile(fullfilePath)!;
  const typeChecker = program.getTypeChecker();
  return { sourceFile, typeChecker, program };
};
