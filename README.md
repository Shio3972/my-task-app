# my-task-app
# Hitöme
チームの進捗を「ひと目で」把握できるタスク管理アプリです。
ReactとJavaScriptを用いて実装しました。

## 使用技術
- React
- JavaScript
- CSS

## 機能
- タスクの追加・削除
- ステータス管理（未着手 / 進行中 / 完了）
- 担当者・期限の設定
- キーワード検索
- タブ切り替え（自分のタスク / すべて / 完了済み）

## 工夫した点
- localStorageを使用し、ページ更新後もデータを保持
- Header・Sidebar・TaskItem・AddTaskModalにコンポーネント分割し可読性を向上
- Date.now()によるID生成でタスク重複を防止

## 今後改善したい点
- Firebaseを用いたリアルタイムデータ管理
- ログイン機能によるマルチユーザー対応
- レスポンシブ対応
