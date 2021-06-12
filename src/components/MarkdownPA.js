//INFO: usar markdown con nuestros componentes

import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown'

import {Link as RouterLink} from "react-router-dom"; //U: seguir navegando la SPA

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const ParrafoPA= (props) => {
	const [quiereVerControles, setQuiereVerControles]= useState(false);
	//IDEA: puedo responder, guardar, etc. parrafo por parrafo
	//TODO: recibir props de el que pone la etiqueta MarkdownPA
	return (<div>
		<p onClick={() => setQuiereVerControles( !quiereVerControles)}>{props.children}</p>
		<div style={{display: quiereVerControles ? 'block' : 'none'}}>
			{props.controles && props.controles()}
			<button onClick={() => setQuiereVerControles(false)}>Cerrar</button>
		</div>
	</div>)
}


const ComponentesPA = (ctxt) => ({
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

	p({node, inline, className, children, ...props}) {
		return (<ParrafoPA {...ctxt} {...props}>{children}</ParrafoPA>)
	},

	a(props) {
		const esAbsoulta= (props.href.match(/^[a-z]+:/)!=null); //A: ej. https: mailto:
		if (esAbsoulta) {
			return (<a {...props}>{props.children}</a>);
		}
		else {
			return (<RouterLink {...props} to={props.href}>{props.children}</RouterLink>);
		}
	},

});

export default function MarkdownPA(props) {
	return (<ReactMarkdown components={ComponentesPA(props)} {...props}>{props.children}</ReactMarkdown>);
}
