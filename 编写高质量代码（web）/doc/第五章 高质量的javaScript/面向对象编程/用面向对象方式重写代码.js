function PhonebookManager(o) {
  this._phonebook = o;
}
PhonebookManager.prototype = {
  //查询电话
  getTel: function(oName) {
    var tel = "";
    console.log(this);
    for (var i = 0; i < this._phonebook.length; i++) {
      if (this._phonebook[i].name === oName) {
        tel = this._phonebook[i].tel;
        break;
      }
    }
    if (tel === "") {
      tel = "暂无信息";
    }
    return tel;
  },
  //添加电话记录
  addItem: function(oName, oTel) {
    this._phonebook.push({
      name: oName,
      tel: oTel
    });
  },
  //删除记录
  removeItem: function(oName) {
    var n;
    for (var i = 0; i < this._phonebook[i].length; i++) {
      if (this._phonebook[i].name === oName) {
        n = i;
        break;
      }
    }
    if (n !== undefined) {
      this._phonebook.splice(n, 1);
    }
  }
}

var myPhone1 = new PhonebookManager([{
  name: "adang",
  tel: "1"
}, {
  name: "bdang",
  tel: "2"
}, {
  name: "cdang",
  tel: "3"
}]);
var myPhone2 = new PhonebookManager([{
  name: "aone",
  tel: "3"
}, {
  name: "bone",
  tel: "2"
}, {
  name: "cone",
  tel: "1"
}]);
