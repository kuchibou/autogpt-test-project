# e-Gov 法令 API 補助資料（Lambda 実装向け）

## 目的

日本の法令データを取得するための REST API です。  
このスキルでは、ユーザが指定した「法令名」と「条番号」に対応する条文を取得し、
Alexa に読み上げさせるために使用します。

## 基本情報

- ベース URL（例）：  
  `https://elaws.e-gov.go.jp/api/1/`
- 認証：不要（公開 API）
- 主な利用フロー：  
  1. 法令一覧から法令名に対応する法令番号（lawId）を取得  
  2. lawId を使って法令本文（XML）を取得  
  3. XML から指定条番号の条文を抽出  
  4. 読み上げ用にテキストを整形

## 主なエンドポイント

### 1. 法令一覧取得

- メソッド: GET  
- パス: `/laws`  
- 概要: 全法令の一覧を取得する。  
- 主なフィールド:
  - `lawId` : 法令番号（例: `429AC0000000089`）  
  - `lawName` : 法令名（例: `民法`）

このスキルでは、ユーザが指定した法令名（例: 「民法」「刑法」）に対して、
`lawName` を部分一致または前方一致で検索し、対応する `lawId` を取得します。

### 2. 法令本文取得

- メソッド: GET  
- パス: `/law/{lawId}`  
- 概要: 指定した法令番号の全文を XML 形式で取得する。  
- 主な構造（概念レベル）:

```xml
<Law>
  <LawBody>
    <MainProvision>
      <Article>
        <ArticleNum>第九条</ArticleNum>
        <Paragraph>
          <ParagraphNum>１</ParagraphNum>
          <Sentence>（条文本文）</Sentence>
        </Paragraph>
      </Article>
      <!-- 以降、他の条文 -->
    </MainProvision>
  </LawBody>
</Law>
