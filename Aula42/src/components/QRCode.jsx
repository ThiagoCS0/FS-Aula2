import { useState } from 'react'
import styled from 'styled-components'
import QR from 'qrcode.react'

const Container = styled.div`user-select:none; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height:100%; color:#CCC; gap: 20px;`,
	Title = styled.h2`text-align: center; color: #AAA; margin:10px; &::first-letter{color: #FA0;}`,
	Imput = styled.input`background-color: #222; text-align: center; font-size: large; outline: none; padding: 10px; color: #FFF; border: none; width:50%;`;

export default function QRCode() {
	const [texto, defTexto] = useState('')
	return (
		<Container>
			<Title>T QRCode</Title>
			<Imput value={texto} onChange={(e) => { defTexto(e.target.value) }} placeholder='Texto para QRCode....'></Imput>
			{texto && <QR value={texto} renderAs="svg" bgColor="#FA0" fgColor="#000" size='256' />}
		</Container>
	)
}