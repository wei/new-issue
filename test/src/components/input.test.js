/* eslint-env node, jest */

import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Input from '../../../src/components/input'

describe('Input - bad input type', () => {
  it('should render empty div if type is unrecognized', () => {
    [
      undefined,
      null,
      {},
      { type: '' },
      { type: 'unrecognized' },
      { not_type: 'variable' },
    ].forEach(config => {
      const context = shallow(<Input config={config} />)
      const wrapper = context.find('.ni-wrapper')

      expect(wrapper.length).toBe(1)
      expect(wrapper.text()).toBe('')
      expect(context).toMatchSnapshot()
    })
  })
});

[
  'text',
  'number',
  'password',
  'email',
  'month',
  'date',
  'datetime-local',
  'hidden',
].forEach(type => {
  describe(`Input - input type: ${type}`, () => {
    [
      { type: type },
      { type: type, label: 'Label Here:' },
      { type: type, label: 'Label Here:', 'outputLabel.md': '*Same-line Label:* ', disabled: true, value: 'Prefilled default text' },
      { type: type, name: 'input-name', id: 'input-id', class: 'input-class', title: 'Enter here', placeholder: 'Enter here', required: true, pattern: '.+', maxlength: 15, 'outputLabel.md': '*Same-line Label:* ' },
    ].forEach(config => {
      it(`should render with parameters [${Object.keys(config).join(', ')}]`, () => {
        const component = <Input config={config} />
        const context = shallow(component)
        const wrapper = context.find('.ni-wrapper')

        const label = wrapper.find('label')
        expect(label.length).toBe(1)
        if (config.label) {
          expect(label.attr('class')).toContain('ni-label')
          expect(label).toEqual(wrapper.childAt(0))
          expect(label.text()).toBe(config.label)
        } else {
          expect(label.attr('class')).toContain('ni-label')
          expect(label.attr('class')).toContain('ni-empty-label')
          expect(label).toEqual(wrapper.childAt(0))
          expect(label.text()).toBe('')
        }

        const input = wrapper.find('input')
        expect(input.length).toBe(1)
        expect(input.attr('type')).toBe(config.type)
        expect(input.attr('name')).toBe(config.name)
        expect(input.attr('id')).toBe(config.id)
        expect(wrapper.attr('id')).toBe(config.id ? `${config.id}-wrapper` : undefined)
        expect(input.attr('class')).toContain(`ni-input ni-${config.type}`)
        if (config.class) {
          expect(input.attr('class')).toContain(config.class)
          expect(wrapper.attr('class')).toContain(`${config.class}-wrapper`)
        }
        expect(input.attr('title')).toBe(config.title)
        expect(input.attr('placeholder')).toBe(config.placeholder)
        expect(input.attr('maxlength')).toBe(config.maxlength)
        if (config.required) {
          expect(input.attr('required')).toBeTruthy()
        } else {
          expect(input.attr('required')).toBeFalsy()
        }
        if (config.disabled) {
          expect(input.attr('disabled')).toBeTruthy()
        } else {
          expect(input.attr('disabled')).toBeFalsy()
        }
        expect(input.attr('pattern')).toBe(config.pattern)
        expect(context).toMatchSnapshot()
      })

      it(`should function with parameters [${Object.keys(config).join(', ')}]`, () => {
        const component = <Input config={config} />
        const context = shallow(component)

        const getInput = () => context.find('.ni-wrapper').find('input');
        [
          null, '12345', 'I have a question.',
        ].forEach(i => {
          if (i) {
            // TODO Better input simulation
            getInput().simulate('input', i)
          }
          expect(context.state('userInput')).toEqual(i || config.value || '')
          expect(context.component().output())
            .toEqual({
              label: config['outputLabel.md'] || (config.label && `**${config.label}:**\n`) || null,
              value: i || config.value || '',
            })
        })
      })
    })
  })
})

describe(`Input - input type: textarea`, () => {
  const type = 'textarea';
  [
    { type: type, label: 'Label Here:' },
    { type: type, label: 'Label Here:', 'outputLabel.md': '*Same-line Label:* ', disabled: true, value: 'Prefilled default text' },
    { type: type, name: 'input-name', id: 'input-id', class: 'input-class', title: 'Enter here', placeholder: 'Enter here', required: true, rows: 10, maxlength: 15, 'outputLabel.md': '*Same-line Label:* ' },
  ].forEach(config => {
    it(`should render with parameters [[${Object.keys(config).join(', ')}]]`, () => {
      const context = shallow(<Input config={config} />)
      const wrapper = context.find('.ni-wrapper')

      const label = wrapper.find('label')
      expect(label.length).toBe(1)
      if (config.label) {
        expect(label.attr('class')).toContain('ni-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe(config.label)
      } else {
        expect(label.attr('class')).toContain('ni-label')
        expect(label.attr('class')).toContain('ni-empty-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe('')
      }

      const input = wrapper.find('textarea')
      expect(input.length).toBe(1)
      expect(input.attr('name')).toBe(config.name)
      expect(input.attr('id')).toBe(config.id)
      expect(wrapper.attr('id')).toBe(config.id ? `${config.id}-wrapper` : undefined)
      expect(input.attr('class')).toContain(`ni-input ni-${config.type}`)
      if (config.class) {
        expect(input.attr('class')).toContain(config.class)
        expect(wrapper.attr('class')).toContain(`${config.class}-wrapper`)
      }
      expect(input.attr('title')).toBe(config.title)
      expect(input.attr('placeholder')).toBe(config.placeholder)
      expect(input.attr('rows')).toBe(config.rows || 4)
      expect(input.attr('maxlength')).toBe(config.maxlength)
      if (config.required) {
        expect(input.attr('required')).toBeTruthy()
      } else {
        expect(input.attr('required')).toBeFalsy()
      }
      if (config.disabled) {
        expect(input.attr('disabled')).toBeTruthy()
      } else {
        expect(input.attr('disabled')).toBeFalsy()
      }
      expect(input.attr('value')).toBe(config.value || '')
      expect(context).toMatchSnapshot()
    })

    it(`should function with parameters [${Object.keys(config).join(', ')}]`, () => {
      const component = <Input config={config} />
      const context = shallow(component)

      const getInput = () => context.find('.ni-wrapper').find('textarea');
      [
        null, '12345', 'I have a question.',
      ].forEach(i => {
        if (i) {
          // TODO Better input simulation
          getInput().simulate('input', i)
        }
        expect(context.state('userInput')).toEqual(i || config.value || '')
        expect(context.component().output())
          .toEqual({
            label: config['outputLabel.md'] || (config.label && `**${config.label}:**\n`) || null,
            value: i || config.value || '',
          })
      })
    })
  })
})

describe(`Input - input type: select`, () => {
  const type = 'select';
  [
    { type: type },
    { type: type,
      options: [
        'Bug Report',
      ] },
    { type: type,
      label: 'Label Here:',
      value: 'Bug Report',
      placeholder: '-- Issue Type --',
      options: [
        'Bug Report',
      ] },
    { type: type,
      label: 'Label Here:',
      'outputLabel.md': '**Same-line Label:** ',
      value: 'Question',
      disabled: true,
      options: [
        'Bug Report',
        'Feature Request',
        'Question',
      ] },
    { type: type,
      name: 'input-name',
      id: 'input-id',
      class: 'input-class',
      title: 'Enter here',
      required: true,
      placeholder: '-- Issue Type --',
      'outputLabel.md': '*Same-line Label:* ',
      options: [
        'Bug Report',
        'Feature Request',
        'Question',
      ] },
  ].forEach(config => {
    it(`should render with parameters [${Object.keys(config).join(', ')}]`, () => {
      const component = <Input config={config} />
      const context = shallow(component)
      const wrapper = context.find('.ni-wrapper')

      const label = wrapper.find('label')
      expect(label.length).toBe(1)
      if (config.label) {
        expect(label.attr('class')).toContain('ni-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe(config.label)
      } else {
        expect(label.attr('class')).toContain('ni-label')
        expect(label.attr('class')).toContain('ni-empty-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe('')
      }

      const select = wrapper.find('select')
      expect(select.length).toBe(1)
      expect(select.attr('name')).toBe(config.name)
      expect(select.attr('id')).toBe(config.id)
      expect(wrapper.attr('id')).toBe(config.id ? `${config.id}-wrapper` : undefined)
      expect(select.attr('class')).toContain(`ni-input ni-${config.type}`)
      if (config.class) {
        expect(select.attr('class')).toContain(config.class)
        expect(wrapper.attr('class')).toContain(`${config.class}-wrapper`)
      }
      expect(select.attr('title')).toBe(config.title)
      if (config.required) {
        expect(select.attr('required')).toBeTruthy()
      } else {
        expect(select.attr('required')).toBeFalsy()
      }
      if (config.disabled) {
        expect(select.attr('disabled')).toBeTruthy()
      } else {
        expect(select.attr('disabled')).toBeFalsy()
      }

      // If !value, Prepend with an <option value="">{placeholder || ''}</option>
      const hasPlaceholder = !config.value
      expect(select.find('option').length).toBe((config.options || []).length + hasPlaceholder)
      if (hasPlaceholder) {
        const option = select.find('option').at(0)
        expect(option.length).toBe(1)
        expect(option.text()).toBe(config.placeholder || '')
        expect(option.attr('value')).toBe('')
        expect(option.attr('selected')).toBe(true)
      }
      (config.options || []).forEach((o, idx) => {
        idx += hasPlaceholder
        const option = select.find('option').at(idx)
        expect(option.length).toBe(1)
        expect(option.text()).toBe(o)
        expect(option.attr('value')).toBe(o)
        expect(option.attr('selected')).toBe(o === (config.value || ''))
      })
      expect(context).toMatchSnapshot()
    })

    it(`should function with parameters [${Object.keys(config).join(', ')}]`, () => {
      const component = <Input config={config} />
      const context = shallow(component)

      const getSelect = () => context.find('.ni-wrapper').find('select')

      let selectedValue = 'bug'
      // TODO Better input simulation
      getSelect().simulate('input', selectedValue)
      expect(context.state('userInput')).toEqual(selectedValue)
      expect(context.component().output())
        .toEqual({
          label: config['outputLabel.md'] || (config.label && `**${config.label}:**\n`) || null,
          value: selectedValue,
        })
    })
  })
})

describe(`Input - input type: submit`, () => {
  const type = 'submit';
  [
    { type: type },
    { type: type, submit: '', label: 'Some Label' },
    { type: type, submit: 'Test String', 'outputLabel.md': '*Same-line Label:* ', value: 'Some Value', disabled: true },
  ].forEach(config => {
    it(`should render with parameters [[${Object.keys(config).join(', ')}]]`, () => {
      const context = shallow(<Input config={config} />)
      const wrapper = context.find('.ni-wrapper')

      const label = wrapper.find('label')
      expect(label.length).toBe(1)
      if (config.label) {
        expect(label.attr('class')).toContain('ni-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe(config.label)
      } else {
        expect(label.attr('class')).toContain('ni-label')
        expect(label.attr('class')).toContain('ni-empty-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe('')
      }

      const buttonField = wrapper.find('button')
      expect(buttonField.length).toBe(1)
      expect(buttonField.attr('id')).toBe(config.id)
      expect(wrapper.attr('id')).toBe(config.id ? `${config.id}-wrapper` : undefined)
      expect(buttonField.attr('class')).toContain(`ni-input ni-${type}`)
      if (config.class) {
        expect(buttonField.attr('class')).toContain(config.class)
        expect(wrapper.attr('class')).toContain(`${config.class}-wrapper`)
      }
      expect(buttonField.attr('title')).toBe(config.title)
      if (config.disabled) {
        expect(buttonField.attr('disabled')).toBeTruthy()
      } else {
        expect(buttonField.attr('disabled')).toBeFalsy()
      }
      // TODO Test html after rendering
      expect(buttonField.attr('dangerouslySetInnerHTML')).toEqual({__html: config.submit || 'Submit'})
      expect(context).toMatchSnapshot()
      expect(context.component().output())
        .toEqual({
          label: config['outputLabel.md'] || (config.label && `**${config.label}:**\n`) || null,
          value: config.value || '',
        })
    })
  })
})

describe(`Input - input type: html`, () => {
  const type = 'html';
  [
    { type: type },
    { type: type, html: '' },
    { type: type, html: 'Test String', label: 'Some Label' },
    { type: type, html: '<h1>Test String</h1>', 'outputLabel.md': '*Same-line Label:* ', value: 'Some Value' },
  ].forEach(config => {
    it(`should render with parameters [[${Object.keys(config).join(', ')}]]`, () => {
      const context = shallow(<Input config={config} />)
      const wrapper = context.find('.ni-wrapper')

      const label = wrapper.find('label')
      expect(label.length).toBe(1)
      if (config.label) {
        expect(label.attr('class')).toContain('ni-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe(config.label)
      } else {
        expect(label.attr('class')).toContain('ni-label')
        expect(label.attr('class')).toContain('ni-empty-label')
        expect(label).toEqual(wrapper.childAt(0))
        expect(label.text()).toBe('')
      }

      const htmlField = wrapper.find('div')
      expect(htmlField.length).toBe(1)
      expect(htmlField.attr('id')).toBe(config.id)
      expect(wrapper.attr('id')).toBe(config.id ? `${config.id}-wrapper` : undefined)
      expect(htmlField.attr('class')).toContain(`ni-input ni-${type}`)
      if (config.class) {
        expect(htmlField.attr('class')).toContain(config.class)
        expect(wrapper.attr('class')).toContain(`${config.class}-wrapper`)
      }
      expect(htmlField.attr('title')).toBe(config.title)
      // TODO Test html after rendering
      expect(htmlField.attr('dangerouslySetInnerHTML')).toEqual({__html: config.html})
      expect(context).toMatchSnapshot()
      expect(context.component().output())
        .toEqual({
          label: config['outputLabel.md'] || (config.label && `**${config.label}:**\n`) || null,
          value: config.value || '',
        })
    })
  })
})
