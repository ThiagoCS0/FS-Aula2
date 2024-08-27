import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';

const Container = styled.div`user-select:none; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height:100%; color:#CCC;`,
	Div1 = styled(Container)`flex-direction:row; height:fit-content; width: 70vw; @media only screen and (max-width: 500px){flex-direction:column;width: 100%;};`,
	Div2 = styled.div`border:1px solid #222; &>div{padding:20px;}`,
	Title = styled.h2`text-align: center; color: #AAA; margin:10px; &::first-letter{color: #FA0;}`,
	Imput = styled.input`background-color: #222; text-align: center; font-size: large; outline: none; padding: 10px; color: #FFF; border: none; width:50%;`,
	Button = styled.button`background-color: #000; padding: 10px 20px; font-size: large; cursor: pointer; color: #FA0; border:0; @media only screen and (max-width: 500px){width:100%;}`,
	Button2 = styled(Button)`width:100%; background-color: #222;`,
	Span = styled.span`color:#FA0;`;

export default function IPInfo() {
	const [IP, defIP] = useState('')
	const [saida, defSaida] = useState('')
	const Limpar = () => { defSaida(''); }
	const Busca = async () => {
		try {
			const resp = await axios.get(`https://ipinfo.io/${IP}/json?token=${import.meta.env.VITE_K_IPINFO}`)
			defSaida(resp.data);
		} catch (error) { Limpar(); }
	}
	// ipInfor.lookupASN("AS7922").then((resp) => { defSaida(resp); })
	return (
		<Container>
			<Title>T Busca IP</Title>
			<Div1>
				<Imput value={IP} onChange={(e) => { defIP(e.target.value) }} placeholder='IP....' onKeyDown={(e) => { if (e.key == "Enter") { Busca(); } }}></Imput>
				<Button onClick={Busca}>Pesquisar</Button>
			</Div1>
			<p style={{ margin: '10px 0', fontSize: 'medium', padding: '4px' }} > faça a busca <span style={{ borderBottom: '1px solid #FA0' }}>vazia</span> para retornar <Span>seu</Span> ip</p>
			{
				saida && <Div2>
					<div>
						<p>IP: <Span>{saida.ip}</Span></p>
						<p>Pais: <Span>{saida.country}</Span></p>
						<p>Região: <Span>{saida.region}</Span></p>
						<p>Cidade: <Span>{saida.city}</Span></p>
						<p>Nome do Host: <Span>{saida.hostname}</Span></p>
						<p>Localização: <Span>{saida.loc}</Span></p>
						<p>Fuso horário: <Span>{saida.timezone}</Span></p>
						<p>Org.: <Span>{saida.org}</Span></p>
						<p>Postal: <Span>{saida.postal}</Span></p>
					</div>
					<Button2 onClick={Limpar}>Limpar</Button2>
				</Div2>
			}
		</Container >
	)
}