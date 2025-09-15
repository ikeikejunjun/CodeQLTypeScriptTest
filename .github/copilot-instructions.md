# Copilot Instructions for This Codebase

## 概要
このリポジトリは TypeScript プロジェクトであり、CodeQL を用いたセキュリティスキャンと GitHub Actions による自動化が特徴です。主なファイルは `index.ts`、`package.json`、`tsconfig.json` です。

## アーキテクチャと主要コンポーネント
- 単一の TypeScript エントリポイント (`index.ts`) を中心に構成。
- ビルド・型チェックは `tsconfig.json` で管理。
- 依存管理・スクリプトは `package.json` で定義。
- セキュリティスキャンは `.github/workflows/code_scan_make_issue.yml` で自動化。

## 開発・CI/CD ワークフロー
- **ビルド**: `npm run build` または `tsc` コマンドで TypeScript をビルド。
- **テスト**: テストスクリプトが `package.json` に未定義の場合は、追加が必要。
- **CodeQL スキャン**: GitHub Actions のワークフローで毎月1日午前3時に自動実行。手動実行も可能。
- **Issue 自動生成**: CodeQL アラート検出時、Copilot Bot へ自動割り当て。

## プロジェクト固有のパターン・注意点
- CodeQL スキャンのステップはデフォルトでコメントアウトされているため、本番運用時はコメント解除が必要。
- Copilot Bot への Issue 割り当てには `COPILOT_TOKEN` (PAT) をリポジトリ Secrets に登録必須。
- Issue 作成ロジックは GraphQL と REST API を組み合わせている (`code_scan_make_issue.yml` 参照)。
- ワークフローのカスタム Bash スクリプトは Ubuntu 環境前提。Windows でのローカル実行は考慮されていない。

## 依存・外部連携
- `github/codeql-action` を利用。
- Copilot Bot (`copilot-swe-agent`) との連携。
- `jq`, `curl` などのコマンドラインツール必須。

## 参考ファイル
- `index.ts`: メインロジック
- `package.json`: 依存・スクリプト定義
- `.github/workflows/code_scan_make_issue.yml`: CI/CD・CodeQL・Issue 自動化

## 例: Issue 自動生成ワークフロー
```bash
# Copilot Bot ID 取得
copilot_bot_id=$(curl ...)
# CodeQL アラート取得
alerts=$(curl ...)
# Issue 作成
issue=$(curl ...)
# Copilot Bot 割り当て
curl ...
```

---

この内容で不明点や追加したい情報があればご指摘ください。
