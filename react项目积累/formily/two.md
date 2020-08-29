# 正文

> 本篇抛开业务代码,从`formily`底层阅读代码,进行分析.

## Anything comes from Observable Graph

这是官网的描述,介绍了内部使用 `Observable Graph`,来记录任意时刻的全量状态,也方便回滚.

## 如何接入第三方组件库

分为以下几步:

* 接入 Form/FormItem 组件
* 接入组件库表单组件
* 实现表单布局组件
* 实现自增列表组件

### 如何接入Form/FormItem组件

接入方式目前提供了全局注册机制与单例注册机制,全局注册主要使用 registerFormComponent 和 registerFormItemComponent 两个API来注册,单例注册则是直接在 SchemaForm 属性上传 formComponent 和 formItemComponent。如果是 SPA 场景,推荐使用单例注册的方式

```()
import React from 'react'
import {
  SchemaForm,
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { Form } from 'antd'

export const CompatFormComponent = ({ children, ...props }) => {
  return <Form {...props}>{children}</Form> //很简单的使用Form组件，props是SchemaForm组件的props，这里会直接透传
}

export const CompatFormItemComponent = ({ children, ...props }) => {
  const messages = [].concat(props.errors || [], props.warnings || [])
  let status = ''
  if (props.loading) {
    status = 'validating'
  }
  if (props.invalid) {
    status = 'error'
  }
  if (props.warnings && props.warnings.length) {
    status = 'warning'
  }
  return (
    <Form.Item
      {...props}
      label={props.schema.title}
      help={
        messages.length ? messages : props.schema && props.schema.description
      }
      validateStatus={status}
    >
      {children}
    </Form.Item>
  )
}

/***
全局注册方式
registerFormComponent(CompatFormComponent)
registerFormItemComponent(CompatFormItemComponent)
***/

//单例注册方式
export default () => {
  return (
    <SchemaForm
      formComponent={CompatFormComponent}
      formItemComponent={CompatFormItemComponent}
    />
  )
}
```

可以看到，扩展表单整体或局部的样式，仅仅只需要通过扩展 Form/FormItem 组件就可以轻松解决了，这里需要注意的是，FormItem 组件接收到的 props 有点复杂，不用担心，后面会列出详细 props API，现在我们只需要知道大概是如何注册的就行了.

### 如何接入表单组件

因为组件库的所有组件都是原子型组件，同时大部分都兼容了 value/onChange 规范，所以我们可以借助 connect 函数快速接入组件库的组件，通常，我们接入组件库组件，大概要做 3 件事情：

* 处理状态映射，将 formily 内部的 loading/error 状态映射到该组件属性上，当然，前提是要求组件必须支持 loading 或 error 这类的样式
* 处理详情态样式，将 formily 内部的 editable 状态，映射到一个 PreviewText 组件上去，用于更友好更干净的展示数据
* 处理组件枚举态，我们想一下，JSON Schema，每一个节点都应该支持 enum 属性的，如果配了 enum 属性，我们最好都以 Select 形式来展现，所以我们需要处理一下组件枚举态.

```()
import React from 'react'
import { connect, registerFormField } from '@formily/react-schema-renderer'
import { InputNumber } from 'antd'

const mapTextComponent = (
  Target: React.JSXElementConstructor<any>,
  props: any = {},
  fieldProps: any = {}
): React.JSXElementConstructor<any> => {
  const { editable } = fieldProps
  if (editable !== undefined) {
    if (editable === false) {
      return PreviewText
    }
  }
  if (Array.isArray(props.dataSource)) {
    return Select
  }
  return Target
}

const mapStyledProps = (
  props: IConnectProps,
  fieldProps: MergedFieldComponentProps
) => {
  const { loading, errors } = fieldProps
  if (loading) {
    props.state = props.state || 'loading'
  } else if (errors && errors.length) {
    props.state = 'error'
  }
}

const acceptEnum = (component: React.JSXElementConstructor<any>) => {
  return ({ dataSource, ...others }) => {
    if (dataSource) {
      return React.createElement(Select, { dataSource, ...others })
    } else {
      return React.createElement(component, others)
    }
  }
}

registerFormField(
  'number',
  connect({
    getProps: mapStyledProps, //处理状态映射
    getComponent: mapTextComponent //处理详情态
  })(acceptEnum(InputNumber)) //处理枚举态
)
```

### 如何处理表单布局

JSON Schema 描述表单数据结构，其实是天然支持的，但是表单最终还是落在 UI 层面的，可惜在 UI 层面上我们有很多组件其实并不能作为 JSON Schema 的一个具体数据节点，它仅仅只是一个 UI 节点

```()
import React from 'react'
import { SchemaForm, registerVirtualBox } from '@formily/react-schema-renderer'
import { Card } from 'antd'

registerVirtualBox('card', ({ children, ...props }) => {
  return <Card {...props.schema.getExtendsComponentProps()}>{children}</Card>
})

export default () => {
  return (
    <SchemaForm
      schema={{
        type: 'object',
        properties: {
          layout_card: {
            //layout_card这个属性名，您改成什么都不会影响最终提交的数据结构
            type: 'object',
            'x-component': 'card',
            'x-component-props': {
              title: 'This is Card'
            },
            properties: {
              array: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    input: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }}
    />
  )
}
```

card 就是一个正常的 Object Schema 节点，只是需要指定一个 x-component 为 card，这样就能和 registerVirtualBox 注册的 card 匹配上，就达到了虚拟节点的效果.

这里需要注意的是 x-component-props 是直接透传到 registerVirtualBox 的回调函数参数上的。 这是 JSON Schema 形式的使用.

```()
import React from 'react'
import { SchemaForm, createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from 'antd'

const Card = createVirtualBox('card', ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>
})

export default () => {
  return (
    <SchemaForm>
      <Card title="This is Card">
        <Field type="array" name="array">
          <Field type="object">
            <Field type="string" name="input" />
          </Field>
        </Field>
      </Card>
    </SchemaForm>
  )
}
```

还有 JSchema 的使用方式：

```()
import React from 'react'
import { SchemaForm, createVirtualBox } from '@formily/react-schema-renderer'
import { Card } from 'antd'

const Card = createVirtualBox('card', ({ children, ...props }) => {
  return <Card {...props}>{children}</Card>
})

export default () => {
  return (
    <SchemaForm>
      <Card title="This is Card">
        <Field type="array" name="array">
          <Field type="object">
            <Field type="string" name="input" />
          </Field>
        </Field>
      </Card>
    </SchemaForm>
  )
}
```

### 如何实现超复杂自定义组件

可以定义一下，什么才是超复杂自定义组件：

* 组件内部存在大量表单组件，同时内部也存在大量联动关系

* 组件内部存在私有的服务端动态渲染方案

* 组件内部有复杂布局结构

为什么我们通过正常的封装自定义组件的形式不能解决问题呢？其实主要是受限于校验，没法整体校验，所以，我们需要一个能聚合大量字段处理逻辑的能力.

详情可以查看demo中超复杂自定义组件相关内容

## 结语

针对底层代码再次做了下阅读,发现还是有不少东西是很有用的,有些api只有在需要扩展以及需要定制化改造的场景下才会用的到.