module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "plugin:vue/vue3-strongly-recommended",
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended"
    ],
    rules: {
        // 'vue/no-unused-vars': 'error'
    }
}