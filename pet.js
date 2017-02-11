"use strict";

function run(args) {
  var app = Application.currentApplication();
  app.includeStandardAdditions = true;
  var iterm = app;
  if (/^iTerm/.test(app.properties().name) == false) {
    iterm = Application('iTerm');
    iterm.includeStandardAdditions = true;
  }

  var systemEvents = Application('System Events');
  systemEvents.includeStandardAdditions = true;

  // 文字列じゃない時は諦める
  if (app.clipboardInfo({'for': 'string'}).length != 1) {
    return false;
  }

  var data = app.theClipboard({'as': 'string'});

  // 改行コードが有る場合はユーザーに問い合わせる
  if (data.indexOf('\r') > -1) { 
    try {
      var result = app.displayDialog(
        '以下の内容をペーストしてよろしいですか？',
        {
          'withTitle': 'pet',
          'defaultAnswer': data,
          'defaultButton': 1
        }
      );
      // OKの場合はダイアログのテキストを取得する
      data = result.textReturned;

      // クリップボードを更新
      app.setTheClipboardTo(data);
    } catch (e) {
      return false;
    }
  }

  // キーストローク経由でペーストする
  iterm.activate();
  systemEvents.keystroke("_", {using:"command down"});
  
  return true;
}
