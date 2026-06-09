export default {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "scope-task-format": (parsed) => {
          const { scope } = parsed;
          const taskPattern = /^WG+-\d+$/;

          if (taskPattern.test(scope)) {
            return [true];
          }

          return [
            false,
            `scope must be in format "WG-123" (project prefix + hyphen + number). Examples: WG-1, APP-42, FEAT-7`,
          ];
        },
      },
    },
  ],

  rules: {
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
      ],
    ],

    "scope-case": [0],
    "scope-empty": [0],
    "scope-task-format": [2, "always"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};
