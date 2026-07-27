# Image Accessibility Guide

This page describes the image accessibility policy for HikaeMe.

## Policy

- Every rendered img element must include an alt attribute.
- Decorative images should use an explicit empty alt: alt="".
- Informative images should use meaningful alt text that explains the content or purpose.

## Current Enforcement Level

> [!IMPORTANT]
> The current enforcement level is warning-based.

- Markdown images always render an alt attribute (empty alt="" is allowed for decorative images).
- The img shortcode emits a warning when neither alt nor caption is provided.
- Existing templates and shortcodes now always output alt attributes.

## Usage

### Markdown Image

```markdown
![A short and meaningful description](/img/example.webp)
```

### Decorative Markdown Image

```markdown
![](/img/decorative-divider.svg)
```

### img Shortcode

Preferred:

```markdown
{{< img src="img/example.webp" alt="A short description" caption="Optional caption" >}}
```

Fallback (legacy compatible, warning-free):

```markdown
{{< img src="img/example.webp" caption="Used as alt fallback" >}}
```

## Future Direction

> [!CAUTION]
> This policy may be tightened from warnings to build errors in a future release after migration guidance is complete.
