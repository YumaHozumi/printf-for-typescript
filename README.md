# printf-for-ts

## 概要
printf-for-ts は、TypeScriptで実装された文字列フォーマットのためのユーティリティクラスです。フォーマット文字列に従って引数をフォーマットし、文字列として返します。

フォーマット文字列には、整数、浮動小数点数、文字列、16進数など、さまざまなフォーマット指定子を使用できます。

## インストール方法
npmでインストールする場合は、以下のコマンドを実行してください。

```
npm install printf-for-ts
```

## 使い方
`Format.printf` および `Format.sprintf` メソッドを使用して、フォーマット文字列に従って引数をフォーマットすることができます。

```typescript
import { Format } from 'printf-for-ts';

console.log(Format.printf("整数: %d, 浮動小数点数: %.3f, 文字列: %s, 16進数: %x", 42, 3, "Hello, world!", 10));
```

基本的な構文はC言語のprintfと同じになります。

## ライセンス
MIT License

## 開発者情報
- YumaHozumi
- GitHub: https://github.com/YumaHozumi
## 更新履歴
- 1.0.0 (2023-03-XX) : Initial Release
