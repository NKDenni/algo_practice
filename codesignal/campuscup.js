const schools = ['bobby@mit.edu', 'JohnDoe@harvard.edu', 'jimmy@mit.edu', 'noname@rain.info.ru', 'thisguy@ucb.edu', 'otherguy@harvard.edu'];
let zero = [];
let one = [];
let two = [];
let three = [];
let five = [];
const uni = new Map();

schools.forEach(x => {
    const school = x.split('@');
    const domain = school[1];
    const count = uni.get(domain) || 0;
    uni.set(domain, count + 1);
});


for ([domain, count] of uni.entries()) {
    if (count < 5) {
        zero.push(domain);
    }
    if(count >= 5 && count < 10 ){
        one.push(domain);
    }
    if(count >= 10 && count < 15 ){
        two.push(domain);
    }
    if(count >= 15 && count < 25 ){
        three.push(domain);
    }
    if (count >= 25){
        five.push(domain);
    }
}

five.sort();
three.sort();
two.sort();
one.sort();
zero.sort();

const result = five.concat(three,two,one,zero)

console.log(result);