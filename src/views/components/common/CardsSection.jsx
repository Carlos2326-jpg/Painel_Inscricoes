import React from 'react';
import '../../_shared/style/components/common/CardsSection.css';

import minicursosIcon from '../../assets/imgMinicursos.png';
import networkingIcon from '../../assets/imgNetworking.png';
import palestrasIcon from '../../assets/imgPalestras-conversas.png';
import desafioIcon from '../../assets/imgPalestras-conversas.png';

const cardsData = [
    {
        icon: minicursosIcon,   
        title: 'Minicursos',
        description: 'Aprenda novas ferramentas inovadoras e desenvolva habilidades para o mercado de trabalho com atividades práticas.'
    },
    {
        icon: networkingIcon,
        title: 'Networking',
        description: 'Conheça colegas estudantes, profissionais e pessoas que compartilham dos mesmos interesses e visão de futuro que você.'
    },
    {
        icon: palestrasIcon,
        title: 'Palestras e conversas',
        description: 'Descubra as perspectivas e conheça experiências de ex-estudantes da FATEC, que hoje em dia estão atuando no mercado.'
    },
    {
        icon: desafioIcon,
        title: 'Desafio tecnológico',
        description: 'Coloque suas habilidades à prova e concorra a prêmios ao transformar ideias em soluções no campeonato de tecnologia.'
    }
];

export default function CardsSection() {
    return (
        <section className="cards-grid">
            {cardsData.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-header">
                        {typeof card.icon === 'string' && card.icon.startsWith('/') || card.icon?.src ? (
                            <img
                                src={card.icon}
                                alt=""
                                className="card-icon-img"
                                aria-hidden="true"
                            />
                        ) : (
                            <span className="card-icon">{card.icon}</span>
                        )}
                        <h3 className="card-title">{card.title}</h3>
                    </div>
                    <p className="card-description">{card.description}</p>
                </div>
            ))}
        </section>
    );
}