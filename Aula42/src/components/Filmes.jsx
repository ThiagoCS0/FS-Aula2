import axios from "axios"
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`user-select:none; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height:100%; color:#CCC;`,
	Div1 = styled(Container)`flex-direction:row; height:fit-content; width: 70vw; @media only screen and (max-width: 500px){flex-direction:column;width: 100%;};`,
	Title = styled.h2`text-align: center; color: #AAA; margin:10px; &::first-letter{color: #FA0;}`,
	Input = styled.input`background-color: #222; text-align: center; font-size: large; outline: none; padding: 10px; color: #FFF; border: none; width:100%;`,
	Button = styled.button`background-color: #000; padding: 10px 20px; font-size: large; cursor: pointer; color: #FA0; border:0; @media only screen and (max-width: 500px){width:100%;}`,
	ContainerFilmes = styled(Container)`flex-direction: column; flex-wrap: wrap; gap:10px; max-height: 500px; padding: 10px; overflow-y:auto;`,
	ContainerFilme = styled.div`width: 150px; padding: 10px; margin: 10px; text-align: center; overflow:hidden; box-shadow: 0 0 10px #000; transition: scale 0.5s; &:hover{scale:1.05; cursor: pointer;}`,
	Img = styled.img`width:100%;`,
	TituloFilme = styled.p`width:100%; font-size: x-large;`,
	AnoFilme = styled.p`width:100%; font-size: large;`;

export default function Filmes() {
	const [filmes, defFilmes] = useState([])
	const [consulta, defConsulta] = useState('')
	const Busca = async () => {
		try {
			const res = await axios.get(`https://www.omdbapi.com/?s=${consulta}&apikey=${import.meta.env.VITE_K_OMDBAPI}`);
			defFilmes(res.data.Search)
		} catch (error) { console.error('Erro', error) }
	}
	return (
		<>
			<Container>
				<Title>Teu Filme</Title>
				<Div1> <Input type="type" value={consulta} onChange={(e) => { defConsulta(e.target.value) }} onKeyDown={(e) => { if (e.key === "Enter") { Busca() } }} /> <Button onClick={Busca}>Pesquisar</Button> </Div1>
				<ContainerFilmes>
					{filmes && filmes.map((filme) => (
						<ContainerFilme>
							<Img src={filme.Poster} />
							<TituloFilme>{filme.Title}</TituloFilme>
							<AnoFilme>{filme.Year}</AnoFilme>
						</ContainerFilme>
					))}
				</ContainerFilmes>
			</Container>
		</>
	)
}