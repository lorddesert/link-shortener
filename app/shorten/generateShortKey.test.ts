import { expect, test } from 'vitest'

function generateShortKey() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const keyLength = 6 // Why 6?

    return Array.from({ length: keyLength }, () => {
        const randomIndex = Math.floor(Math.random() * charset.length)
        return charset[randomIndex]
    })
        .reduce((acum, curr) => acum + curr, "")
}


const shortKey = generateShortKey()

test('Should return as string', () => {
    expect(typeof shortKey).toBe('string')
})