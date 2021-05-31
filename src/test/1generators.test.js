//INFO: funciona en tests generator functions?

function* pares(cuantos) {
	for (let i=0;i<cuantos;i++) {
		yield (i+1)*2;
	}
}

test('generador', () => { 
	let gen= pares(3);
	let r= [];
	for (let v of gen) {
		r.push(v);	
	}
	expect( r ).toEqual([2,4,6]);
});
