---
title: '静的生成とサーバーサイドレンダリング、いつどれを使うべきか'
date: '2020-01-02'
---

**静的生成**（データあり・なし）を可能な限り使用することをお勧めします。なぜなら、ページは一度ビルドされてCDNによって配信されるため、各リクエストでサーバーがページをレンダリングするよりもはるかに高速です。

静的生成は、多くの種類のページで使用できます。例えば：

- マーケティングページ
- ブログ記事
- 電子商取引の商品リスト
- ヘルプとドキュメント

自分自身に問いかけてみてください："このページをユーザーのリクエスト**より先に**事前レンダリングできますか？" もし答えが「はい」であれば、静的生成を選ぶべきです。

一方で、ユーザーのリクエストより先にページを事前レンダリングできない場合、静的生成は**良いアイデアではありません**。たとえば、ページが頻繁に更新されるデータを表示する場合や、ページ内容が毎回のリクエストで変わる場合があります。

そのような場合は、**サーバーサイドレンダリング**を使用できます。それは遅くなるかもしれませんが、事前レンダリングされたページは常に最新の状態になります。または、事前レンダリングをスキップして、クライアントサイドのJavaScriptでデータを埋め込むこともできます。