// const test = ['a','b','c'];虽然不能test =[]这样重新赋值，但是可以通过test.push('d')这样修改，所以不是不变的或者只读的，如果要将test改成常量或者只读，在后面加上as const，这是typescript的魔法;
const categories = ["Groceries", "Utilities", "Entertainment"] as const;

export default categories;
