# Cloudinary Images Guide

This page explains how to enable Cloudinary image URL transformation in HikaeMe.

## Quick Summary

- Toggle feature: params.useCloudinary
- Cloud name: params.cloudinaryCloudName
- If useCloudinary is false, all image paths are used as normal (no transformation).

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
>}}
```

Optional parameters:

- class
- sizes
- loading
- crop
- caption

## Validation Rules

With useCloudinary=true, cldimg validates that:

- URL starts with your configured cloud name prefix.
- URL is in /image/upload/v... format.
- URL does not already include transformations before version.

## Fallback Behavior

If useCloudinary=false, cldimg renders a regular img tag with the provided URL and no transformation.
