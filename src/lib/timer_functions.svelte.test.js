import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { floor, msToSec, msToMin, msToHr, msToDays, msToWeeks, msToYears} from './timer_functions.svelte.js';

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

// floor will never be negative in timers
// the msTo functions have special cases to prevent it
// this case is necessary now
test('Floor Error', () => {
	let number = '-1.5'
  let floored = floor(number)

    expect(floored).toEqual(-1)
});


test('msToSec Main', () => {
  let timer = 152452000
  let secs = msToMin(timer) 

  expect(secs).toEqual(20)
});

test('msToSec Edge', () => {
  let timer = 1000
  let secs1 = msToSec(timer)
  let secs2 = msToSec(timer - 1) 
  
  expect(secs1).toEqual('01')
  expect(secs2).toEqual('00')
});

// test for negative timer
test('msToSec Error', () => {
  let timer = -1
  let secs = msToSec(timer) 

  expect(secs).toEqual(-1)
});


test('msToMin Main', () => {
  let timer = 152452000
  let mins = msToMin(timer) 

  expect(mins).toEqual(20)
});

// test for negative timer
test('msToMin Edge', () => {
  let timer = 60000
  let mins1 = msToMin(timer) 
  let mins2 = msToMin(timer - 1) 

  expect(mins1).toEqual('01')
  expect(mins2).toEqual('00')
});

// test for negative timer
test('msToMin Error', () => {
  let timer = -1
  let mins = msToMin(timer) 

  expect(mins).toEqual('00')
});


test('msToHr Main', () => {
  let timer = 152452000
  let hours = msToHr(timer) 

  expect(hours).toEqual(18) // changes with the addition of unit days 
});

test('msToHr Edge', () => {
  let timer = 3600000
  let hours1 = msToHr(timer) 
  let hours2 = msToHr(timer - 1) 

  expect(hours1).toEqual('01')
  expect(hours2).toEqual('00')
});

// test for negative timer
test('msToHr Error', () => {
  let timer = -1
  let hours = msToHr(timer) 

  expect(hours).toEqual('00')
});


// note that days only has a single digit, and testing must use a single digit
test('msToDays Main', () => {
  let timer = 71902780000
  let days = msToDays(timer)

  expect(days).toEqual(6)
});

test('msToDays Edge', () => {
  let timer = 86400000
  let days1 = msToDays(timer)
  let days2 = msToDays(timer - 1)

  expect(days1).toEqual(1)
  expect(days2).toEqual(0)
});

// test for negative timer
test('msToDays Error', () => {
  let timer = -1
  let days = msToDays(timer)

  expect(days).toEqual('0')
});


test('msToWeeks Main', () => {
  let timer = 71902780000
  let weeks = msToWeeks(timer)

  expect(weeks).toEqual(14)
});

test('msToWeeks Edge', () => {
  let timer = 604800000
  let weeks1 = msToWeeks(timer)
  let weeks2 = msToWeeks(timer - 1)

  expect(weeks1).toEqual('01')
  expect(weeks2).toEqual('00')
});

// test for negative timer
test('msToWeeks Error', () => {
  let timer = -1
  let weeks = msToWeeks(timer)

  expect(weeks).toEqual('00')
});


// note that year is the colloquial unit of 365 days exactly and will not account for leap years
test('msToYears Main', () => {
  let timer = 71902780000
  let years = msToYears(timer)

  expect(years).toEqual(2)
});

test('msToYears Edge', () => {
  let timer = 31449600000
  let years1 = msToYears(timer)
  let years2 = msToYears(timer - 1)

  expect(years1).toEqual(1)
  expect(years2).toEqual(0)
});

// test for negative timer
test('msToYears Error', () => {
  let timer = -1
  let years = msToYears(timer)

  expect(years).toEqual('0')
});
