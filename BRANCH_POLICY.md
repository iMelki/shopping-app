# Branch policy

- Default integration branch is `main` when it exists, otherwise `master`.
- Day-to-day work uses a local `dev` branch. Do not publish a new `origin/dev` unless that remote branch already exists.
- Open pull requests into the default branch. CI runs on `pull_request` and on `push`.
- Never force-push shared branches. Never skip Git hooks (`--no-verify` is not allowed).
- Secret scanning (Gitleaks) is required locally via pre-commit and in GitHub Actions.
