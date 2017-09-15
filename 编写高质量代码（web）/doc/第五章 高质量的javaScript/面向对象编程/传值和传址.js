function z1() {
  var a = 10;
  var b = a;
  var c = [1, 2, 3];
  var d = c;
  b++;
  d.push(4);
  console.log(a);
  console.log(b); //11 变量b保存的数据更改不会影响到变量a
  console.log(c); //变量c和d指向同一份数据，数据更改会互相影响
  console.log(d);
};

function z2() {
  var a = [1, 2, 3],
    b = {
      name: "dange",
      sex: "nan",
      tel: "12121212",
      data: [{
        id: "1"
      }, {
        id: "2"
      }]
    };
  var c = [],
    d = {};
  for (var p in a) {
    c[p] = a[p];
  }
  for (var p in b) {
    d[p] = b[p]
  }
  c.push("4");
  d.email = "xxx.@qq.com";
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(b.email);
  console.log(d.email);
}

function z3() {
  var a = [1, 2, 3];
  var b = a.slice(),
    c = a.concat();
  b.pop(); //用于删除并返回数组的最后一个元素。
  c.push(4); //向数组的末尾添加一个或更多元素，并返回新的长度。

  console.log(a);
  console.log(b);
  console.log(c);
}

function Animal(name) {
  this.name = name;
  this.type = "animal";
}
Animal.prototype = {
  say: function() {
    console.log("I'm a " + this.type + " , my name is " + this.type);
  }
}

function Bird(name) {
  Animal.call(this, name);
}
Bird.prototype = new Animal();
Bird.prototype.constructor = Bird;
Bird.prototype.fly = function() {
  console.log("I'm flying");
}

