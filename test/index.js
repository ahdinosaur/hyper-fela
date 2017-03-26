const test = require('tape')

const hyperFela = require('../')

test('hyper-fela', function (t) {
  t.ok(hyperFela, 'module is require-able')
  t.end()
})

test('basic', function (t) {
  const ELEMENT = {}
  const testProps = { isAwesome: true }
  const testRule = ({ isAwesome }) => ({
    color: isAwesome ? 'green' : 'red'
  })
  function h (tag, props, childs) {
    t.equal(tag, 'div')
    t.deepEqual(props, testProps)
    t.equal(childs, 'test')
    return ELEMENT
  }
  function renderRule (rule, props) {
    t.equal(rule, testRule)
    t.equal(props, testProps)
    t.deepEqual(rule(testProps), { color: 'green' })
  }
  const Element = hyperFela({ h, renderRule })
  const Test = Element('div', testRule)
  const element = Test(testProps, 'test')
  t.equal(element, ELEMENT)
  t.end()
})

test('no type', function (t) {
  const testProps = {}
  const testRule = () => {}
  function h (tag, props, childs) {
    t.equal(tag, 'div')
  }
  function renderRule (rule, props) {
    t.ok(true)
  }
  const Element = hyperFela({ h, renderRule })
  const Test = Element(testRule)
  Test(testProps, 'test')
  t.end()
})

test('object rule', function (t) {
  const testProps = {}
  function h (tag, props, childs) {
    t.ok(true)
  }
  function renderRule (rule, props) {
    t.equal(rule(), testProps)
  }
  const Element = hyperFela({ h, renderRule })
  const Test = Element('div', testProps)
  Test(testProps, 'test')
  t.end()
})

test('function type', function (t) {
  const ELEMENT = {}
  const testProps = {}
  function h (tag, props, childs) {
    t.notOk(true)
  }
  function renderRule (rule, props) {
    t.ok(true)
  }
  const Element = hyperFela({ h, renderRule })
  const TestElement = (props, childs) => {
    t.equal(props, testProps)
    t.equal(childs, 'test')
    return ELEMENT
  }
  const Test = Element(TestElement, testProps)
  const element = Test(testProps, 'test')
  t.equal(element, ELEMENT)
  t.end()
})

test('object rule', function (t) {
  t.end()
})

test('no props and yes childs to h', function (t) {
  t.end()
})

test('no props and no childs to h', function (t) {
  t.end()
})
