# 设计模式之策略模式

> 策略模式定义了算法家族，分别封装起来，让他们可以互相替换，此模式让算法的变化不会影响到使用算法的客户。

## 正文

如果我们要做数据合法性验证，很多时候都是按照switch语句来判断，但是如果增加需求，我们还要再次修改这段代码来增加逻辑，而且在进行单元测试的时候也会越来越复杂。
而根据策略模式，我们可以将相同的工作代码单独封装成不同的类，然后通过统一的策略处理类来处理：
```
var validator = {
  //所有可以的验证规则处理类存储的地方
  types: {},

  //验证类型所对应的错误信息
  messages: [],

  config:{},

  //暴露的公开验证方法，传入的参数是 key => value;
  vaildate: function(data){
    var i,msg,type,checker,result_ok;

    //清空所有的错误信息
    this.messages = [];

    for(i in data){
      if(data.hasOwnProperty(i)){
        type = this.config[i];//根据key查询是否有存在的验证规则
        checker = this.types[type];//获取验证规则的验证类

        if(!type){
          continue;//如果验证规则不存在，则不处理
        }
        if(!checker){
          throw{
            name:"ValidationError",
            message:"no handler to validate type"+type
          }
        }

        result_ok = checker.validate(data[i]);//使用查到的单个验证类进行验证
        if(!result_ok){
          msg = "Invalid value for *"+i+"*,"+checker.instructions;
          this.messages.push(msg);
        }
      }
    }
    return this.hasErrors()
  },

  hasErrors: function(){
    return this.messages.length !== 0;
  }
}

validator.types.isNonEmpty = {
  validate: function(value){
    return value !== "";
  },
  instructions:"传入的值不能为空"
}

validator.types.isNumber = {
  validate:function(value){
    return !isNaN(value);
  },
  instructions:"传入的值职能是合法的数字"
}

validator.types.isAlphaNum = {
  validate:function(value){
    return !/[^a-z0-9]/i.test(value);
  },
  instructions:"传入的值只能保护字母和数字，不能包含特殊字符"
}

var data = {
  first_name: "Tom",
  last_name: "Xu",
  age: "unknown",
  username: "TomXu"
};

validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
}

//use
validator.validate(data);
if(validator.hasErrors()){
  console.log(validator.messages.join("\n"));
}
```
