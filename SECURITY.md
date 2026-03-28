# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in FamilyBridge, please report it responsibly.

**Do not open a public issue.** Instead, email the maintainers or use GitHub's private vulnerability reporting feature on this repository.

Please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 48 hours and aim to provide a fix or mitigation plan within 7 days.

## Scope

This policy covers the FamilyBridge application code and its deployment configuration. Third-party dependencies are managed via `npm` and should be reported upstream.

## Architecture Notes

- The Azure OpenAI API key is **not** exposed to the browser. It is injected server-side by the nginx reverse proxy.
- No user data is stored server-side. Message history is kept in the browser's `localStorage` only.
- The application does not collect personal information or require authentication.
