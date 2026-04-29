// const { baseTemplate } = require("./baseTemplate")

import { baseTemplate } from "./baseTemplate"

export const registerTemplate = ({ name, password }: { name: string, password: string }) => {
    const content = `
    <h2>welcome to SKILLHUB</h2>
    <p>Hi, ${name}</p>
    <p>Thank you for choosing SKILLHUB.</p>
    <p>Your temparary password is ${password}.</p>
    `

    return baseTemplate({
        title: "welcome to SKILLHUB",
        content
    })
}