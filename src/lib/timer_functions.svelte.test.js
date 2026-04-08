import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { floor, msToHr, msToMin, msToSec, toggle} from './timer_functions.svelte.js';


// 3 tests per function is fine for like 3 timer_functions
// 5 functions is fine for 2 tests per function
// doing both is too time consuming for an assignment

// floor will never be negative in timers
test('Floor Main', () => {
	let number = 1.5
  let floored = floor(number)

    expect(floored).toEqual(1)
});

test('Floor Edge', () => {
	let number = 1
  let floored = floor(number)

    expect(floored).toEqual(1)
});

// this case is necessary now
test('Floor Error', () => {
	let number = '-1.5'
  let floored = floor(number)

    expect(floored).toEqual(-1)
});



test('msToHr Main', () => {
  let timer = 152452000
  let hours = msToHr(timer) 

  expect(hours).toEqual(42)
});

test('msToHr Edge', () => {
  let timer = 3600000
  let hours = msToHr(timer) 

  expect(hours).toEqual(1)
});

// test for negative timer (unrealisitc)
test('msToHr Error', () => {
  let timer = -3600000
  let hours = msToHr(timer) 

  expect(hours).toEqual(-1)
});



test('msToMin Main', () => {
  let timer = 152452000
  let mins = msToMin(timer) 

  expect(mins).toEqual(20)
});

// test for negative timer (unrealisitc)
test('msToMin Edge', () => {
  let timer = 60000
  let mins = msToMin(timer) 

  expect(mins).toEqual("01")
});

// test for negative timer (unrealisitc)
test('msToMin Error', () => {
  let timer = -3600000
  let mins = msToMin(timer) 

  expect(mins).toEqual('00')
});



test('msToSec Main', () => {
  let timer = 152452000
  let secs = msToMin(timer) 

  expect(secs).toEqual(20)
});

test('msToSec Edge', () => {
  let timer = 1000
  let secs = msToSec(timer) 

  expect(secs).toEqual("01")
});

// test for negative timer (unrealisitc)
test('msToSec Error', () => {
  let timer = -3600000
  let secs = msToSec(timer) 

  expect(secs).toEqual(-1)
});

// removed toggle with toggle tests, was not function worthy
