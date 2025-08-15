/** @type {import('stylelint').Config} */
export default {
    extends: ["stylelint-config-standard-scss"],
    plugins: [
        "stylelint-scss"
    ],
    ignoreFiles: ["dist", "**/*.min.css", "node_modules", "**/*.css"],
    rules: {
        "at-rule-no-unknown": null,
        "scss/at-rule-no-unknown": true,

        "selector-class-pattern": [
            "^[a-z0-9\\-]+(__[a-z0-9\\-]+)?(--[a-z0-9\\-]+)?$",
            {
                "message": "Class names should follow BEM pattern: .block, .block__element, .block--modifier"
            }
        ]
    }
};
