jest.mock('../../api/api.js')

import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises'
import { fetchListData } from '../../api/api'

describe('ItemList.vue', () => {
  test('renders an Item with data for each item in window.items', async() => {
    expect.assertions(4)

    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{id: 1}, {id: 2}, {id: 3}]
    fetchListData.mockResolvedValueOnce(items)

    const wrapper = shallowMount(ItemList, { mocks: {$bar}})

    await flushPromises()

    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallowMount(ItemList, {mocks: { $bar }})
    expect($bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load in successful', async() => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    shallowMount(ItemList, {mocks: {$bar}})
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()
  })

  test('calls $bar.fails when load is unsuccessful', async() => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    fetchListData.mockRejectedValueOnce()
    shallowMount(ItemList, {mocks: {$bar}})
    await flushPromises()
    expect($bar.fail).toHaveBeenCalled()

  })
})
