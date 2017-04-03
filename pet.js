"use strict";

function run(args) {
  var debug = false;

  var app = Application.currentApplication();
  if (/^iTerm/.test(app.properties().name) == false) {
    if (debug == true) {
      app = Application('iTerm');
    } else {
      return false;
    }
  }
  app.includeStandardAdditions = true;

  var systemEvents = Application('System Events');
  systemEvents.includeStandardAdditions = true;

  // 文字列じゃない時は諦める
  if (app.clipboardInfo({'for': 'string'}).length != 1) {
    return false;
  }

  // 末尾の改行は削除してクリップボードを更新しておく
  var data = app.theClipboard({'as': 'string'}).trim();
  app.setTheClipboardTo(data);

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
  app.activate();
  systemEvents.keystroke("_", {using:"command down"});
  
  return true;
}
