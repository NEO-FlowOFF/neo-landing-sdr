<!-- markdownlint-disable MD003 MD007 MD013 MD022 MD023 MD025 MD029 MD032 MD033 MD034 -->

```text
========================================
         LINK HEADERS · SKILL
========================================
```

## ⟠ Overview

Add Link response headers to your homepage for agent discovery per
[RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) and
[RFC 9727 Section 3](https://www.rfc-editor.org/rfc/rfc9727#section-3).

## ◈ Requirements

- Return `Link` headers on your homepage response pointing to machine-readable resources.
- Use registered relation types: `api-catalog`, `service-desc`, `service-doc`, `describedby`.
- Example: `Link: </.well-known/api-catalog>; rel="api-catalog"`.
- Multiple Link headers or comma-separated values are both valid.

## ⬡ Cloudflare

Use [Transform Rules](https://developers.cloudflare.com/rules/transform/) or
[Workers](https://developers.cloudflare.com/workers/) to add Link headers
without modifying your origin server.

## ⟡ Validate

```http
POST https://isitagentready.com/api/scan
Content-Type: application/json

{"url": "https://sdr.neoflowoff.agency", "checks": ["discoverability.linkHeaders"]}
```

Check that `checks.discoverability.linkHeaders.status` is `"pass"`.