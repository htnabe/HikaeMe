![theme thumbnail](https://raw.githubusercontent.com/htnabe/HikaeMe/dev/images/tn.png)

# HikaeMe

A simple theme that displays only the bare minimum of elements readers need.

## Documentation Index

### Guidance (for HikaeMe users)

- [English](./docs/guidance/getting-started.en.md)
- [日本語](./docs/guidance/getting-started.ja.md)
- [Troubleshooting](./docs/guidance/troubleshooting.md)

### Develop (for contributors/developers/AI)

- Project Structure: [docs/develop/project-structure.md](./docs/develop/project-structure.md)
- Testing Policy: [docs/develop/testing-policy.md](./docs/develop/testing-policy.md)

## Demo

- [My personal blog](https://t-pot.me/)

## Multilingual Support

HikaeMe now supports Hugo multilingual sites.

- Recommended setup: single host with default language at root.
- Existing Japanese users can keep current URLs as canonical paths.
- Secondary languages can be served with language prefixes such as `/en/`.
- UI strings can be managed in dedicated translation files:
	- `i18n/ja.yaml`
	- `i18n/en.yaml`

### Example settings

```yaml
defaultContentLanguage: "ja"
defaultContentLanguageInSubdir: false

languages:
	ja:
		languageCode: "ja-JP"
		languageName: "日本語"
		weight: 1
	en:
		languageCode: "en-US"
		languageName: "English"
		weight: 2
```

## LICENSE

This theme is released under the [MIT](https://opensource.org/license/MIT) License.
