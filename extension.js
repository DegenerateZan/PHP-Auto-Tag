const vscode = require('vscode');
function activate(context) {
  console.log("begin init");
  let disposable = vscode.workspace.onDidCreateFiles((e) => {
    console.log("loaded");
    e.files.forEach((file) => {
      if (file.fsPath.endsWith('.php')) {
        console.log("new .php file detected");
        const document = vscode.workspace.textDocuments.find((doc) => doc.fileName === file.fsPath);
        if (document && document.lineCount === 1 && document.lineAt(0).isEmptyOrWhitespace) {
          const edit = new vscode.WorkspaceEdit();
          edit.insert(document.uri, new vscode.Position(0, 0), '<?php\n');
          vscode.workspace.applyEdit(edit);
        }
      }
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
