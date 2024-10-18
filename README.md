## 環境ナビゲーション表示

環境ごとに指定した色とテキストを表示します

## 使い方

① アプリケーション ID と環境ごとの config を登録する

e.g.)  
アプリケーション ID：sample
config:

- url: https://{domain}
- color: #f8f8f8 (hex)
- title: 本番環境

② データを削除する  
※アプリケーション ID 単位でのみの削除に対応しています

e.g.)
アプリケーション ID：sample

## データ構造

下記のようなデータの保持を行っています

```
{ applicationId : ["id1", "id2"] }

{
  "id1": [
    {
      "url": "https://{domain}",
      "color": "red",
      "title": "本番"
    },
    {
      "url": "https://{domain}",
      "color": "white",
      "title": "dev"
    }
    ...
  ]
}
```
