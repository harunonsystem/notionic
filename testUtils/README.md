# Test Utils

このディレクトリには、再利用可能なテストユーティリティが含まれています。

## NextRouter Mock

### 使用方法

```typescript
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'

// テストでデフォルトのEnglishロケールを設定
setupMockRouter('en')

// 日本語ロケールの場合
setupMockRouter('ja')

// カスタムパスで設定
setupMockRouterWithCustomPath('en', '/custom-path', { id: '123' })
```

### グローバルセットアップ

`setupTests.ts`にすべてのテスト関連のセットアップが統合されています：

- `@testing-library/jest-dom` のインポート
- `TextEncoder`/`TextDecoder` のポリフィル
- NextRouterモック（デフォルト英語）
- fetchモック
- alertモック

### 特徴

- **統合セットアップ**: `setupTests.ts`にすべてのテスト設定が集約
- **TypeScript対応**: NextRouter interfaceに準拠
- **多言語対応**: 日本語と英語のロケールをサポート
- **再利用性**: どのテストファイルでも簡単に利用可能

## 注意点

- `vitest.config.mts`には `setupFiles: './setupTests.ts'` のみ指定
- グローバルにnext/router、fetch、alertがモックされています
- 各テストファイルで`setupMockRouter()`を呼び出す必要があります
