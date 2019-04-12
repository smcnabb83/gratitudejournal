module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["airbnb", "plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "linebreak-style": 'off',
        "no-unused-vars": "warn",
        "no-console": "off",
        "prettier/prettier": [
            "error",
            {
                trailingComma: "es5",
                singleQuote: true,
                printWidth: 80,
            },
        ]
    }
};