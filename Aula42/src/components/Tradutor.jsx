import axios from 'axios'
import { useState } from "react";
import styled from 'styled-components'

const Container = styled.div`display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height:100%; color:#CCC;`;
const Div = styled.div`display: flex; flex-direction: row; gap:10px; align-items: center; justify-content: center; margin: 4px 0;  width: 100%; @media only screen and (max-width: 500px){flex-direction: column;}`;
const Div1 = styled(Div)`justify-content: center; width:fit-content;`;
const Div2 = styled(Div)`flex-direction:column;`;
const Div3 = styled(Div)`gap: 0; max-width: 800px; @media only screen and (max-width: 500px) {flex-direction:column; }`;
const Title = styled.h2`text-align: center; color: #AAA; margin:10px; &::first-letter{color: #FA0;}`;
const Select = styled.select`color: #FA0; background-color: #333; border:0; text-align:center; font-size: large; outline:none; `;
const TextoSaida = styled.p`color: #CCC; font-size: large; outline:none; border: 0; padding: 4px;`;
const Input = styled.input`background-color: #222; font-size: large; outline: none; padding: 10px; color: #FFF; border: none; width:100%;`
const Button = styled.button`background-color: #000; padding: 10px 20px; font-size: large; cursor: pointer; color: #FA0; border:0; @media only screen and (max-width: 500px){width:100%;}`
const Button1 = styled.button`font-size: large;background-color: #333; border:0; border-bottom: 1px solid #FA0; color: #CCC; cursor: pointer;`
export default function Tradutor() {

	const [texto, defTexto] = useState(''); const [textoSaida, defSaida] = useState('');
	const [lingOrigem, defLingOrigem] = useState('en'); const [lingSaida, defLingSaida] = useState('pt');

	const Traduzir = async () => {
		try {
			// const resp = await axios.get(`https://api.mymemory.translated.net/get?q=${Hello%20World}!&langpair=${en}|${it}`)
			const resp = await axios.get(`https://api.mymemory.translated.net/get`, { params: { q: texto, langpair: `${lingOrigem}|${lingSaida}` } }); /*Tudo bem*/
			defSaida(resp.data.responseData.translatedText);
		} catch (error) { defSaida(`Erro ao traduzir: "${error}"`); }
	}
	const MudarLinguagem = () => {
		const lingS = lingSaida;
		defLingSaida(lingOrigem)
		defLingOrigem(lingS);
	}
	return (
		<Container>
			<Title>Tradutor</Title>
			<Div>
				<Div1>
					Do <Select value={lingOrigem} onChange={(e) => { defLingOrigem(e.target.value) }}>
						<option value="en">English</option><option value="es">Spanish</option>
						<option value="fr">French</option><option value="de">German</option>
						<option value="it">Italiano</option><option value="pt">Português</option>
					</Select>
				</Div1>
				<Div1>
					<Button1 onClick={MudarLinguagem}>&#8596; para &#8596;</Button1>
					<Select value={lingSaida} onChange={(e) => { defLingSaida(e.target.value) }}>
						<option value="en">English</option><option value="es">Spanish</option>
						<option value="fr">French</option><option value="de">German</option>
						<option value="it">Italiano</option><option value="pt">Português</option>
					</Select>
				</Div1>
			</Div>
			<Div>
				<Div2>
					<Div3>
						<Input value={texto} onChange={(e) => { defTexto(e.target.value) }} onKeyDown={(e) => { if (e.key == "Enter") { Traduzir(); } }} type="text" placeholder='Texto a ser traduzido...' />
						<Button onClick={Traduzir}>Tradutor</Button>
					</Div3>
					{textoSaida && <TextoSaida>{textoSaida}</TextoSaida>}
				</Div2>
			</Div>
		</Container >
	)
}