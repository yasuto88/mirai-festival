```mermaid
graph TD
    A[ログインページ] --> B[ホームページ]
    A --> C[管理者ページ]
    B --> D[開催一覧]
    B --> E[マイページ]
    D --> F[イベント詳細・参加・結果]
    C --> G[商品管理]
    G --> H[商品一覧]
    H --> I[購入ログ]
    C --> J[ユーザー管理]
    J --> K[ユーザー一覧]
    K --> L[ユーザー詳細]
    C --> M[賭け管理]
    M --> N[賭け一覧]
    N --> O[賭け結果反映]

```
