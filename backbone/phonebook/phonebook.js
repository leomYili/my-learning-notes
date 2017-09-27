$(function () {
    var Phonebook = Backbone.Model.extend({
        initialize: function () {
            this.bind("error", function (model, error) {
                alert(error);
            });
            this.bind("invalid", function (model, error) {
                alert(model.get("name") + " " + error);
            });
        },
        defaults: {
            name: '',
            tell: ''
        },
        validate: function (attr) {
            console.log(attr);
            if (!attr.name || attr.name.length < 5) {
                return '姓名格式错误';
            }
        }
    });

    var PhonebookList = Backbone.Collection.extend({
        model: Phonebook,
        localStorage: new Store('phonebooks')
    });

    var list = new PhonebookList();

    var PhonebookView = Backbone.View.extend({
        tagName: 'li',
        template: _.template('<div><%= name %>：<%= tell %> <a href="javascript:;" class="delete">[删除]</a></div>'),
        events: {
            'click .delete': 'destroy'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('destroy', this.remove);
        },
        render: function () {
            var html = this.template(this.model.toJSON());
            //this.el是生成的空div
            $(this.el).html(html);
            //返回了当前视图
            return this;
        },
        destroy: function(){
            this.model.destroy();
        },
        remove: function () {
            $(this.el).remove();
        }
    });

    var AppView = Backbone.View.extend({
        el: $('body'),
        tmplate: _.template('<li><%= name %>：<%= tell %></li>'),
        initialize: function () {
            _.bindAll(this, 'save', 'add');

            this.nameInput = $("#name");
            this.tellInput = $("#tell");
            this.list = $("#phonebook-list");

            _.bindAll(this, 'render', 'add', 'loadList', 'save');
            //为集合绑定事件
            list.bind('add', this.add);
            //添加修改时触发
            list.bind('refresh', this.loadList);
            list.fetch();
        },
        events: {
            'click #save': 'save'
        },
        add: function (model) {
            var view = new PhonebookView({ model: model });
            this.list.append(view.render().el);
            //view.model.save({ name: model.name, tell: model.tell });
        },
        loadList: function () {
            list.each(this.add);
        },
        save: function () {
            var model = new Phonebook({ name: this.nameInput.val(), tell: this.tellInput.val() });
            if (model.isValid()) {
                list.add(model);
                this.nameInput.val('');
                this.tellInput.val('');
            }
        }
    });

    var app = new AppView();
});