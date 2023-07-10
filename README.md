## 環境ナビゲーション表示

環境ごとに指定した色とテキストを表示します

## 使い方

① 識別子 + データを登録する

e.g.)
識別子: sample
データ：[{"url": "https://qiita.com/question-trend","color": "red","title": "本番"},{"url": "https://qiita.com/official-events","color": "white","title": "dev"}]

② データを削除する

e.g.)
識別子: sample

## データ構造

```
{appKeys : ["appKey1", "appKey2"]}

{
  "appKey1": [
    {
      "url": "https://qiita.com/question-trend",
      "color": "red",
      "title": "本番"
    },
    {
      "url": "https://qiita.com/official-events",
      "color": "white",
      "title": "dev"
    }
  ]
}
```
