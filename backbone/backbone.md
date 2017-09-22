# 正文

> 对于backbone使用过程中的记录和总结

# Backbone.Model（模型）
constructor 实际上会返回一个新的函数,其中的this即该函数,可以调用之前扩展的方法,但如果想使用backbone的model的方法,则需要重新制定上下文对象.
extend的properties属性,实际上分为实例属性,和attributes属性,其中attributes才能使用一系列backbone内置方法来操作.new时传入的参数,相当于set()到了attributes中.
内置了xhr对象,或者说其操作了jquery返回的jqXHR对象,来发起各种回调.

# Backbone.Collection（集合）
其是对于模型的有序集合
