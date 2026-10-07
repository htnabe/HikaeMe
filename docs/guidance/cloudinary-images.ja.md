# Cloudinary 画像ガイド

このページでは、HikaeMeでCloudinary画像URL変換を有効化する方法を説明します。

## 要点

- 切り替えフラグ: params.useCloudinary
- Cloud名: params.cloudinaryCloudName
- useCloudinaryがfalseの場合、全画像を通常URLのまま使います（変換なし）。

> [!IMPORTANT]
> サイトで Cloudinary 画像を主に使う場合は、cldimg shortcode を優先してください。
> img shortcode でも Cloudinary URL は動作しますが、レスポンシブな srcset/sizes は生成されません。
> 端末幅ごとの画像・帯域最適化を行いたい場合は cldimg を使ってください。

> [!NOTE]
> Cloudinary 画像を使わないサイトでは useCloudinary: false とし、img shortcode を使ってください。

## 設定

params設定に次を追加します。

```yaml
useCloudinary: true
cloudinaryCloudName: "your-cloud-name"
```

## 動作

useCloudinary=true のとき、HikaeMeは画像URLを判定します。

- Cloudinaryの非変換URLは f_auto と q_auto を付与して自動変換
- Cloudinary以外のURLはそのまま使用

この挙動は次に適用されます。

- Markdown画像（render-image）
- ホーム/一覧サムネイル
- 記事サムネイル
- OGP/Twitterカード画像
- 著者サムネイル
- img shortcode のsrc

## cldimg Shortcode

cldimg は、明示的にレスポンシブsrcsetを出したい場合に使います。

```markdown
{{< cldimg
url="https://res.cloudinary.com/your-cloud-name/image/upload/v1234/path/to/image.webp"
alt="画像の説明"
caption="任意のキャプション"

> }}
```

任意パラメータ:

- class
- sizes
- loading
- crop
- caption

> [!NOTE]
> useCloudinary=true の場合でも、cldimg と img は同じ出力になりません。
> img は単一の src を出力し、cldimg は src に加えて srcset と sizes を出力します。

## 検証ルール

useCloudinary=true の場合、cldimg は次を検証します。

- URLが設定したcloud nameのprefixで始まること
- URLが /image/upload/v... 形式であること
- バージョン前に変換オプションが入っていないこと

> [!CAUTION]
> cldimg には、変換オプションを含まない Cloudinary ベースURLを渡してください。
> バージョンセグメントより前に変換オプションが入っているURLは、仕様上バリデーションエラーになります。

## フォールバック

useCloudinary=false の場合、cldimg は変換せず、指定URLで通常のimgタグを出力します。