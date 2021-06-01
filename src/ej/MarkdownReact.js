//INFO: usar markdown con nuestros componentes

import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
/* Use `…/dist/cjs/…` if you’re not in ESM! */
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import {loremIpsum} from 'react-lorem-ipsum'

const MiParrafo= (props) => {
	const [quiereVerControles, setQuiereVerControles]= useState(false);

	return (<div>
		<p onClick={() => setQuiereVerControles(true)}>{String(props.children)}</p>
		<div style={{display: quiereVerControles ? 'block' : 'none'}}>
			<button onClick={() => setQuiereVerControles(false)}>Cerrar</button>
		</div>
	</div>)
}


const components = {
	code({node, inline, className, children, ...props}) {
		const match = /language-(\w+)/.exec(className || '')
		return !inline && match ? (
			<SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
				{String(children).replace(/\n$/, '')} 
			</SyntaxHighlighter>
		) : (
			<code className={className} {...props} />
		)
	},
	//IDEA: puedo responder, guardar, etc. parrafo por parrafo
	p({node, inline, className, children, ...props}) {
		return (<MiParrafo>{String(children)}</MiParrafo>)
	},
}

const markdown = `
Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

`+ Array(5).fill('').map(x => (loremIpsum({random: true})+'\n\n')).join('')

export default function Md() {
	return (<ReactMarkdown components={components} estaProp='llega'>{markdown}</ReactMarkdown>);
}
