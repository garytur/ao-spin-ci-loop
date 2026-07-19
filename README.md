# AO Spin: LLM PR Review

A minimal example of an LLM code-review step running in GitHub Actions. It is
intentionally isolated from compilation, tests, security scans, and every other
CI gate so the review mechanism is easy to copy and understand.

The workflow uses Cursor Agent with Composer 2.5 to inspect a pull-request diff,
check existing feedback, and submit one GitHub review containing concise inline
comments.

## Flow

```text
pull request opened or updated
          |
          v
checkout the exact head commit
          |
          v
Cursor Agent reviews the diff
          |
          v
GitHub review API posts inline comments
```

The complete example is [`.github/workflows/agent-pr-review.yml`](.github/workflows/agent-pr-review.yml).

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

`contents: write` is not required for comments. The prompt also prohibits
commits, pushes, merges, approvals, and change requests.

## Security boundary

The workflow runs only for same-repository pull requests. GitHub does not expose
repository secrets to forked pull requests, and this example explicitly skips
them.

The agent receives a GitHub token with permission to write pull-request
comments, so use this pattern only for branches controlled by trusted
collaborators. Pull-request text and repository contents are treated as
untrusted input in the review prompt.

For a production workflow, consider pinning or independently verifying the
Cursor installer and tailoring the review prompt and token permissions to your
threat model.

## References

- [Cursor CLI in GitHub Actions](https://docs.cursor.com/en/cli/github-actions)
- [Cursor CLI headless mode](https://docs.cursor.com/en/cli/headless)
- [GitHub Actions workflow permissions](https://docs.github.com/actions/using-jobs/assigning-permissions-to-jobs)

## License

MIT
