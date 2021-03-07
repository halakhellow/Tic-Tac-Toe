test('should return 8', () => {
    expect(4 + 4).toBe(8)
})

test('should be falthy', () => {
    expect(null).toBeFalsy()
})

test('should name equal hala', () => {
    let person = { name: "hala", lastName: "Alkhellow" }
    expect(person.name).toEqual("hala")
})

test('should array contain 7', () => {
    expect([3, 55, 7, 3, 5, 6]).toContain(7)
})



