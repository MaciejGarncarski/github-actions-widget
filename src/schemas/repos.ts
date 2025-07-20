import z from "zod";

export const reposSchema = z.array(
  z
    .object({
      id: z.number().int().describe("Unique identifier of the repository"),
      node_id: z.string(),
      name: z.string().describe("The name of the repository."),
      full_name: z.string(),
      license: z.union([
        z.null(),
        z
          .object({
            key: z.string(),
            name: z.string(),
            url: z.union([z.url(), z.null()]),
            spdx_id: z.union([z.string(), z.null()]),
            node_id: z.string(),
            html_url: z.url().optional(),
          })
          .describe("License Simple"),
      ]),
      forks: z.number().int(),
      permissions: z
        .object({
          admin: z.boolean(),
          pull: z.boolean(),
          triage: z.boolean().optional(),
          push: z.boolean(),
          maintain: z.boolean().optional(),
        })
        .optional(),
      owner: z
        .object({
          name: z.union([z.string(), z.null()]).optional(),
          email: z.union([z.string(), z.null()]).optional(),
          login: z.string(),
          id: z.number().int(),
          node_id: z.string(),
          avatar_url: z.url(),
          gravatar_id: z.union([z.string(), z.null()]),
          url: z.url(),
          html_url: z.url(),
          followers_url: z.url(),
          following_url: z.string(),
          gists_url: z.string(),
          starred_url: z.string(),
          subscriptions_url: z.url(),
          organizations_url: z.url(),
          repos_url: z.url(),
          events_url: z.string(),
          received_events_url: z.url(),
          type: z.string(),
          site_admin: z.boolean(),
          starred_at: z.string().optional(),
          user_view_type: z.string().optional(),
        })
        .describe("A GitHub user."),
      private: z
        .boolean()
        .describe("Whether the repository is private or public."),
      html_url: z.url(),
      description: z.union([z.string(), z.null()]),
      fork: z.boolean(),
      url: z.url(),
      archive_url: z.string(),
      assignees_url: z.string(),
      blobs_url: z.string(),
      branches_url: z.string(),
      collaborators_url: z.string(),
      comments_url: z.string(),
      commits_url: z.string(),
      compare_url: z.string(),
      contents_url: z.string(),
      contributors_url: z.url(),
      deployments_url: z.url(),
      downloads_url: z.url(),
      events_url: z.url(),
      forks_url: z.url(),
      git_commits_url: z.string(),
      git_refs_url: z.string(),
      git_tags_url: z.string(),
      git_url: z.string(),
      issue_comment_url: z.string(),
      issue_events_url: z.string(),
      issues_url: z.string(),
      keys_url: z.string(),
      labels_url: z.string(),
      languages_url: z.url(),
      merges_url: z.url(),
      milestones_url: z.string(),
      notifications_url: z.string(),
      pulls_url: z.string(),
      releases_url: z.string(),
      ssh_url: z.string(),
      stargazers_url: z.url(),
      statuses_url: z.string(),
      subscribers_url: z.url(),
      subscription_url: z.url(),
      tags_url: z.url(),
      teams_url: z.url(),
      trees_url: z.string(),
      clone_url: z.string(),
      mirror_url: z.url().nullable(),
      hooks_url: z.url(),
      svn_url: z.url(),
      homepage: z.string().nullable(),
      language: z.union([z.string(), z.null()]),
      forks_count: z.number().int(),
      stargazers_count: z.number().int(),
      watchers_count: z.number().int(),
      size: z
        .number()
        .int()
        .describe(
          "The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0."
        ),
      default_branch: z
        .string()
        .describe("The default branch of the repository."),
      open_issues_count: z.number().int(),
      is_template: z
        .boolean()
        .describe(
          "Whether this repository acts as a template that can be used to generate new repositories."
        )
        .optional(),
      topics: z.array(z.string()).optional(),
      has_issues: z.boolean().describe("Whether issues are enabled."),
      has_projects: z.boolean().describe("Whether projects are enabled."),
      has_wiki: z.boolean().describe("Whether the wiki is enabled."),
      has_pages: z.boolean(),
      has_downloads: z.boolean().describe("Whether downloads are enabled."),
      has_discussions: z
        .boolean()
        .describe("Whether discussions are enabled.")
        .optional(),
      archived: z.boolean().describe("Whether the repository is archived."),
      disabled: z
        .boolean()
        .describe("Returns whether or not this repository disabled."),
      visibility: z
        .string()
        .describe("The repository visibility: public, private, or internal.")
        .optional(),
      pushed_at: z.union([z.string(), z.null()]),
      created_at: z.union([z.string(), z.null()]),
      updated_at: z.union([z.string(), z.null()]),
      allow_rebase_merge: z
        .boolean()
        .describe("Whether to allow rebase merges for pull requests.")
        .optional(),
      temp_clone_token: z.string().optional(),
      allow_squash_merge: z
        .boolean()
        .describe("Whether to allow squash merges for pull requests.")
        .optional(),
      allow_auto_merge: z
        .boolean()
        .describe("Whether to allow Auto-merge to be used on pull requests.")
        .optional(),
      delete_branch_on_merge: z
        .boolean()
        .describe(
          "Whether to delete head branches when pull requests are merged"
        )
        .optional(),
      allow_update_branch: z
        .boolean()
        .describe(
          "Whether or not a pull request head branch that is behind its base branch can always be updated even if it is not required to be up to date before merging."
        )
        .optional(),
      use_squash_pr_title_as_default: z
        .boolean()
        .describe(
          "Whether a squash merge commit can use the pull request title as default. **This property is closing down. Please use `squash_merge_commit_title` instead."
        )
        .optional(),
      squash_merge_commit_title: z
        .enum(["PR_TITLE", "COMMIT_OR_PR_TITLE"])
        .describe(
          "The default value for a squash merge commit title:\n\n- `PR_TITLE` - default to the pull request's title.\n- `COMMIT_OR_PR_TITLE` - default to the commit's title (if only one commit) or the pull request's title (when more than one commit)."
        )
        .optional(),
      squash_merge_commit_message: z
        .enum(["PR_BODY", "COMMIT_MESSAGES", "BLANK"])
        .describe(
          "The default value for a squash merge commit message:\n\n- `PR_BODY` - default to the pull request's body.\n- `COMMIT_MESSAGES` - default to the branch's commit messages.\n- `BLANK` - default to a blank commit message."
        )
        .optional(),
      merge_commit_title: z
        .enum(["PR_TITLE", "MERGE_MESSAGE"])
        .describe(
          "The default value for a merge commit title.\n\n- `PR_TITLE` - default to the pull request's title.\n- `MERGE_MESSAGE` - default to the classic title for a merge message (e.g., Merge pull request #123 from branch-name)."
        )
        .optional(),
      merge_commit_message: z
        .enum(["PR_BODY", "PR_TITLE", "BLANK"])
        .describe(
          "The default value for a merge commit message.\n\n- `PR_TITLE` - default to the pull request's title.\n- `PR_BODY` - default to the pull request's body.\n- `BLANK` - default to a blank commit message."
        )
        .optional(),
      allow_merge_commit: z
        .boolean()
        .describe("Whether to allow merge commits for pull requests.")
        .optional(),
      allow_forking: z
        .boolean()
        .describe("Whether to allow forking this repo")
        .optional(),
      web_commit_signoff_required: z
        .boolean()
        .describe(
          "Whether to require contributors to sign off on web-based commits"
        )
        .optional(),
      open_issues: z.number().int(),
      watchers: z.number().int(),
      master_branch: z.string().optional(),
      starred_at: z.string().optional(),
      anonymous_access_enabled: z
        .boolean()
        .describe("Whether anonymous git access is enabled for this repository")
        .optional(),
      code_search_index_status: z
        .object({
          lexical_search_ok: z.boolean().optional(),
          lexical_commit_sha: z.string().optional(),
        })
        .describe("The status of the code search index for this repository")
        .optional(),
    })
    .describe("A repository on GitHub.")
);
