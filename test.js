let data = [
    { id: 2, merchant: 'Ervin Howell', amount: 781, status: 'SUCCESS', date: '2026-03-26' },
    { id: 4, merchant: 'Patricia Lebsack', amount: 630, status: 'SUCCESS', date: '2026-03-26' },
    { id: 6, merchant: 'Mrs. Dennis Schulist', amount: 300, status: 'SUCCESS', date: '2026-03-26' }
]

let sum = data.reduce((acc, curr) => {
    return acc + curr.amount
},0)

console.log(sum)

// let arr = [2, 4, 2, 5]
// console.log(arr.reduce((acc, cur) => {
//     return acc + cur
// }))

