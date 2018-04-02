class A {
    setName(key){
        this.name = key;
    }

    getName(){
        console.log(this.name);
    }
}

class B extends A{
    constructor(){
        super();
    }
}


var b1 = new B();

var a1 = new A();