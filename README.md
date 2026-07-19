# Review PRs using Actions + Cursor

This repo shows off an example workflow that uses Cursor Agent with Composer 2.5 to inspect a pull-request diff,
check existing feedback, and submit inline comments on a pull request.

The workflow is specified in [`.github/workflows/agent-pr-review.yml`](.github/workflows/agent-pr-review.yml).

## Setup

1. Copy the workflow into your repository.
2. Create a Cursor API key.
3. In GitHub, open **Settings > Secrets and variables > Actions**.
4. Add the key as a repository secret named `CURSOR_API_KEY`.
5. Open or update a pull request targeting `main`.

The model is configured through the `MODEL` environment variable in the
workflow.

## Permissions

The job deliberately grants:

- `contents: read` to check out and inspect the code.
- `pull-requests: write` to submit review comments.

## References

- [Cursor CLI in GitHub Actions](https://docs.cursor.com/en/cli/github-actions)
- [Cursor CLI headless mode](https://docs.cursor.com/en/cli/headless)
- [GitHub Actions workflow permissions](https://docs.github.com/actions/using-jobs/assigning-permissions-to-jobs)

## License

MIT
