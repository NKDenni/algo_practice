const obj1 = {
    a: 0,
    b: 2,
    c: 4
};
const obj2 = Object.assign({ c: 5, d: 6 }, obj1);
console.log(obj2.c, obj2.d);

class Add {
    constructor(...words) {
        this.words = words;
    }
    
    print() {
        const arr = [];
        for (let word of this.words) {
            arr.push(word);
        }
        console.log(arr.join('$'));
    }
}

var x = new Add("hehe", "hoho", "haha", "hihi", "huhu");
var y = new Add("this", "is", "awesome");
var z = new Add("lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit");
x.print();
y.print();
z.print();