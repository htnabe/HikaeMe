# Cloudinary Images Guide

This page explains how to enable Cloudinary image URL transformation in HikaeMe.

## Quick Summary

- Toggle feature: params.useCloudinary
- Cloud name: params.cloudinaryCloudName
- If useCloudinary is false, all image paths are used as normal (no transformation).

> [!IMPORTANT]
> If your site uses Cloudinary images as the primary source, prefer the cldimg shortcode directly.
> The img shortcode still works with Cloudinary URLs, but it does not generate responsive srcset/sizes.
> Use cldimg when you want image and bandwidth optimization across device widths.

> [!NOTE]
> If your site does not use Cloudinary images, set useCloudinary: false and use the img shortcode.

## Configuration

Add the following to your params configuration:

```yaml
useCloudinary: true
cloudinaryCloudName: "your-cloud-name"
```

## How It Works

When useCloudinary is true, HikaeMe checks image URLs.

- Cloudinary base URLs in non-transformed format are automatically transformed with f_auto and q_auto.
- Non-Cloudinary URLs stay unchanged.

This behavior is applied to:

- Markdown images rendered by render-image
- Home/list thumbnails
- Article thumbnails
- Open Graph and Twitter card images
- Author thumbnail
- img shortcode source URL

## cldimg Shortcode

Use cldimg when you want explicit responsive srcset generation.

```markdown
{{< cldimg
url="https://res.cloudinary.com/your-cloud-name/image/upload/v1234/path/to/image.webp"
alt="Example image"
caption="Optional caption"

> }}
```

Optional parameters:

- class
- sizes
- loading
- crop
- caption

> [!NOTE]
> cldimg and img do not produce the same output with useCloudinary=true.
> img renders a single src URL, while cldimg renders src plus responsive srcset and sizes.

## Validation Rules

With useCloudinary=true, cldimg validates that:

- URL starts with your configured cloud name prefix.
- URL is in /image/upload/v... format.
- URL does not already include transformations before version.

> [!CAUTION]
> For cldimg, pass a non-transformed base Cloudinary URL.
> If the URL already includes transformations before the version segment, cldimg fails validation by design.

## Fallback Behavior

If useCloudinary=false, cldimg renders a regular img tag with the provided URL and no transformation.