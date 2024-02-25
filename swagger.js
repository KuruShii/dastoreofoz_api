const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "DaStoreOfOz",
            version: "0.0.1",
            description: "A e-commerce store made for codecademy project",
            contact: {
                name: "KuruShi",
            },
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            servers: {
                url: "http://localhost:3000",
                variables: {},
            }
        }
    },
    apis: ['./components/routes/*.js']
}

module.exports = options;