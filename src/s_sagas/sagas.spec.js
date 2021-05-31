import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay } from './sagas'

it('incrementAsync Saga test', () => {
	const gen = incrementAsync()

	expect(	gen.next().value ).toEqual( call(delay, 1000) )
	//		'incrementAsync Saga must call delay(1000)'

	expect(	gen.next().value ).toEqual( put({type: 'INCREMENT'}) )
	//	'incrementAsync Saga must dispatch an INCREMENT action'

	expect( gen.next() ).toEqual( { done: true, value: undefined } )
	// 'incrementAsync Saga must be done'
})
